//
//  SessionMessageSubscriber.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/9/20.
//

import Foundation
import SwiftCoroutine

struct SessionMessageSubscriber: EventSubscriber {
    let events: RemoteEventEmitter

    var event = EventSpec.Identifier.sessionMessage

    func subscribe(spec: EventSpec) -> CoFuture<Void> {
        func dispatch(ns: String, message: String) {
            events.dispatch(spec: spec, params: [ns, message])
        }

        return DispatchQueue.main.scopedFuture { scope in
            guard let app = AppState.instance.activeApp else {
                NSLog("castable: no app running")
                throw GenericError.invalidRequest
            }

            guard let ns = spec.param else {
                NSLog("castable: no namespace provided")
                throw GenericError.invalidRequest
            }

            NSLog("castable:session: opening \(ns)")
            let ch = try app.channel(withNamespace: ns).await()

            NSLog("castable:session: listening on \(ns)")
            for message in ch.receive(in: scope).makeIterator() {
                switch message {
                case .binary:
                    NSLog("castable: received binary message in \(ns)")

                case .string(let value):
                    NSLog("castable:session:\(ns): dispatch: \(value)")
                    dispatch(ns: ns, message: value)

                case .json(let value):
                    NSLog("castable:session:\(ns): dispatch:json:\(value)")
                    if let data = try? JSONSerialization.data(withJSONObject: value),
                        let encoded = String(data: data, encoding: .utf8)
                    {
                        dispatch(ns: ns, message: encoded)
                    } else {
                        NSLog("castable: Failed to serialize message: \(value)")
                    }
                }
            }
        }
    }
}
