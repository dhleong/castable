//
//  CastSocket.swift
//  castable
//
//  Created by Daniel Leong on 12/5/20.
//

import Foundation
import Network

/// Low-level communication with a Chromecast device
class CastSocket {

    private var address: NWEndpoint

    private var connection: NWConnection? = nil

    init(withAddress address: NWEndpoint) {
        self.address = address
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
                self.close()

            case .failed(let error):
                NSLog("castable: connection(\(address)) FAILED: \(error)")
                self.close()
                break

            default:
                break // nop
            }
        }

        NSLog("castable: connected")
    }

    func close() {
        connection?.cancel()
        connection = nil
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
