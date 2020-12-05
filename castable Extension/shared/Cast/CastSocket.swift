//
//  CastSocket.swift
//  castable
//
//  Created by Daniel Leong on 12/5/20.
//

import Foundation
import Network
import SwiftCoroutine
import SwiftProtobuf

fileprivate let DEFAULT_SOURCE = "source-0";
fileprivate let DEFAULT_DESTINATION = "receiver-0";

/// Low-level communication with a Chromecast device
class CastSocket {

    private var address: NWEndpoint
    private let senderId: String?

    private var connection: NWConnection? = nil
    private var receivers: [CoChannel<CastMessage>] = []

    init(withAddress address: NWEndpoint, withSenderID senderId: String? = nil) {
        self.address = address
        self.senderId = senderId
    }

    func open() {
        NSLog("castable: open()")
        if let old = connection {
            NSLog("castable: WARN: duplicate open()")
            old.cancel()
        }

        let address = self.address
        let conn = NWConnection(to: address, using: insecureTLSParameters())
        connection = conn

        conn.start(queue: DispatchQueue.main)
        conn.stateUpdateHandler = { state in
            NSLog("castable: connection(\(address)) state <- \(state)")
            switch state {
            case .ready:
                NSLog("castable: connection(\(address)) READY")
                self.startReading(from: conn)

                // TODO this probably belongs elsewhere...
                self.write(message: CastMessage(
                    ns: "urn:x-cast:com.google.cast.tp.heartbeat",
                    data: .json(value: [ "type": "PING" ])))

            case .failed(let error):
                NSLog("castable: connection(\(address)) FAILED: \(error)")
                self.close()

            default:
                break // nop
            }
        }

        NSLog("castable: connected")
    }

    func receive() -> CoChannel<CastMessage> {
        let ch = CoChannel<CastMessage>(capacity: 1)
        receivers.append(ch)
        return ch
    }

    func write(message: CastMessage) {
        guard let conn = connection else {
            NSLog("castable: ERROR: not connected")
            return
        }

        let message = CastChannel_CastMessage.with {
            $0.sourceID = message.source ?? senderId ?? DEFAULT_SOURCE
            $0.destinationID = message.destination ?? DEFAULT_DESTINATION
            $0.namespace = message.ns
            $0.protocolVersion = .castv210;

            switch message.data {
            case .binary(let value):
                $0.payloadType = .binary
                $0.payloadBinary = value

            case .string(let value):
                $0.payloadType = .string
                $0.payloadUtf8 = value

            case .json(let value):
                if let data = try? JSONSerialization.data(withJSONObject: value),
                    let json = String(data: data, encoding: .utf8)
                {
                    $0.payloadType = .string
                    $0.payloadUtf8 = json
                } else {
                    fatalError("Unable to encode: \(value)")
                }
            }
        }

        if let data = try? message.serializedData() {
            let length = data.count
            let header = withUnsafeBytes(of: UInt32(length).bigEndian) { bytes in
                Data(bytes)
            }

            var withHeader = Data.init(capacity: length + 4)
            withHeader.append(header)
            withHeader.append(data)
            NSLog("castable: sending \(message) as: \(withHeader.hexEncodedString())")

            conn.send(content: withHeader, completion: .idempotent)
        } else {
            NSLog("castable: ERROR: Failed to encode \(message)")
        }
    }

    func close() {
        connection?.cancel()
        connection = nil

        for receiver in receivers {
            receiver.cancel()
        }
        receivers = []
    }

    private func startReading(from conn: NWConnection) {
        self.readHeader(from: conn)
    }

    private func readHeader(from conn: NWConnection) {
        conn.receiveCompletely(length: 4) { data in
            let length = UInt32(bigEndian: data.withUnsafeBytes { $0.load(as: UInt32.self) })
            self.readMessage(from: conn, withLength: Int(length))
        }
    }

    private func readMessage(from conn: NWConnection, withLength length: Int) {
        conn.receiveCompletely(length: length) { data in
            guard let parsed = try? CastChannel_CastMessage(serializedData: data) else {
                NSLog("castable: ERROR: failed to parse: \(data.hexEncodedString()) (\(data.count) bytes)")
                return
            }

            let message = CastMessage(from: parsed)

            NSLog("castable: received \(parsed) -> \(message)")
            for receiver in self.receivers {
                // TODO we should probably send instead of offer
                receiver.offer(message)
            }
        }
    }

    private func insecureTLSParameters() -> NWParameters {
        let opts = NWProtocolTLS.Options()
        let address = self.address

        // borrowed from: https://stackoverflow.com/a/54467228
        sec_protocol_options_set_verify_block(opts.securityProtocolOptions, { (sec_protocol_metadata, sec_trust, sec_protocol_verify_complete) in
            let trust = sec_trust_copy_ref(sec_trust).takeRetainedValue()
            var error: CFError?
            if SecTrustEvaluateWithError(trust, &error) {
                sec_protocol_verify_complete(true)
            } else {
                NSLog("castable: allowing insecure: \(trust) for \(address)")
                sec_protocol_verify_complete(true)
            }
        }, DispatchQueue.main)

        return NWParameters(tls: opts)
    }
}

fileprivate extension NWConnection {
    // TODO coroutine probably?
    func receiveCompletely(length: Int, completion: @escaping (Data) -> ()) {
        self.receive(
            minimumIncompleteLength: length,
            maximumLength: length
        ) { data, context, isComplete, error in
            if let data = data {
                completion(data)
                return
            }

            if let error = error {
                NSLog("castable: ERROR receiving: = \(error)")
                return
            }

            if isComplete {
                NSLog("castable: EOF")
                return
            }

            self.receiveCompletely(length: length, completion: completion)
        }
    }
}

fileprivate extension Data {
    struct HexEncodingOptions: OptionSet {
        let rawValue: Int
        static let upperCase = HexEncodingOptions(rawValue: 1 << 0)
    }

    func hexEncodedString(options: HexEncodingOptions = []) -> String {
        let format = options.contains(.upperCase) ? "%02hhX" : "%02hhx"
        return map { String(format: format, $0) }.joined()
    }
}

fileprivate extension CastMessage {
    init(from: CastChannel_CastMessage) {
        self.ns = from.namespace
        self.source = from.sourceID
        self.destination = from.destinationID

        if from.hasPayloadBinary {
            self.data = .binary(value: from.payloadBinary)
        } else if from.hasPayloadUtf8 {
            if let data = from.payloadUtf8.data(using: .utf8),
                let json = try? JSONSerialization.jsonObject(with: data),
                let dict = json as? [String : Any]
            {
                self.data = .json(value: dict)
            } else {
                self.data = .string(value: from.payloadUtf8)
            }
        } else {
            self.data = .string(value: "")
        }
    }
}
