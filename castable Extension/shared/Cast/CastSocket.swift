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

    private var scope = CoScope()
    private var connection: NWConnection? = nil
    private var receivers: [CoChannel<CastMessage>] = []
    private var myNextId = 1

    init(withAddress address: NWEndpoint, withSenderID senderId: String? = nil) {
        self.address = address
        self.senderId = senderId
    }

    var isConnected: Bool {
        connection != nil
    }

    func nextId() -> Int {
        let id = myNextId
        myNextId += 1
        return id
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
                try? self.write(message: CastMessage(
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

    func receive(in scope: CoScope? = nil) -> CoChannel<CastMessage> {
        let ch = CoChannel<CastMessage>(capacity: 1)

        if let scope = scope {
            ch.added(to: scope)
        }

        ch.whenCanceled {
            if let index = self.receivers.firstIndex(where: { $0 === ch }) {
                self.receivers.remove(at: index)
            }
        }

        receivers.append(ch)
        return ch
    }

    func write(message: CastMessage) throws {
        guard let conn = connection else {
            NSLog("castable: ERROR: attempting to write \(message) when disconnected")
            throw CastError.notConnected
        }

        let message = try CastChannel_CastMessage.with {
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
                do {
                    let data = try JSONSerialization.data(withJSONObject: value)
                    if let json = String(data: data, encoding: .utf8) {
                        $0.payloadType = .string
                        $0.payloadUtf8 = json
                    } else {
                        fatalError("Unable to UTF-8 encode: \(value)")
                    }
                } catch {
                    throw CastError.unableToEncode(message: value, cause: error)
                }
            }
        }

        let data = try message.serializedData()
        let length = data.count
        let header = withUnsafeBytes(of: UInt32(length).bigEndian) { bytes in
            Data(bytes)
        }

        var withHeader = Data.init(capacity: length + 4)
        withHeader.append(header)
        withHeader.append(data)
        NSLog("castable: sending \(message) as: \(withHeader.hexEncodedString())")

        conn.send(content: withHeader, completion: .idempotent)
    }

    func close() {
        connection?.cancel()
        connection = nil

        scope.cancel()

        for receiver in receivers {
            receiver.cancel()
        }
        receivers = []
    }

    private func startReading(from conn: NWConnection) {
        DispatchQueue.global().startCoroutine(in: scope) {
            do {
                try self.readAndDispatchPackets(from: conn)
            } catch {
                NSLog("castable: ERROR in socket read loop: \(error) (\(self.receivers.count) receivers)")
                self.close()
            }
        }
    }

    private func readAndDispatchPackets(from conn: NWConnection) throws {
        while conn === self.connection {
            let packetLength = try self.readHeader(from: conn)
            let message = try self.readMessage(from: conn, withLength: packetLength)



            for receiver in self.receivers {
                try receiver.awaitSend(message)
            }
        }
    }

    private func readHeader(from conn: NWConnection) throws -> Int {
        let data = try conn.receiveCompletely(length: 4).await()
        let length = UInt32(bigEndian: data.withUnsafeBytes { $0.load(as: UInt32.self) })
        return Int(length)
    }

    private func readMessage(from conn: NWConnection, withLength length: Int) throws -> CastMessage {
        let data = try conn.receiveCompletely(length: length).await()
        guard let parsed = try? CastChannel_CastMessage(serializedData: data) else {
            NSLog("castable: ERROR: failed to parse: \(data.hexEncodedString()) (\(data.count) bytes)")
            throw CastError.unableToParse(bytesCount: data.count, hex: data.hexEncodedString())
        }

        let message = CastMessage(from: parsed)
        NSLog("castable: received \(parsed) -> \(message)")
        return message
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
    func receiveCompletely(length: Int) -> CoFuture<Data> {
        let promise = CoPromise<Data>()

        receiveCompletely(
            length: length,
            completion: { data in promise.success(data) },
            onError: { error in promise.fail(error) }
        )

        return promise
    }

    func receiveCompletely(
        length: Int,
        completion: @escaping (Data) -> (),
        onError: @escaping (Error) -> () = { e in
            NSLog("castable:receiveCompletely ERROR: \(e)")
        }
    ) {
        self.receive(
            minimumIncompleteLength: length,
            maximumLength: length
        ) { data, context, isComplete, error in
            if let data = data {
                completion(data)
                return
            }

            if let error = error {
                onError(error)
                return
            }

            if isComplete {
                onError(CastError.eof)
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
