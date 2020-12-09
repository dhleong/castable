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
        let scope = CoScope()
        return DispatchQueue.main.coroutineFuture {
            guard let app = AppState.instance.activeApp else {
                NSLog("castable: no app running")
                throw GenericError.invalidRequest
            }

            guard let ns = spec.param else {
                NSLog("castable: no namespace provided")
                throw GenericError.invalidRequest
            }

            let ch = try app.channel(withNamespace: ns).await()
            for message in ch.receive(in: scope).makeIterator() {
                switch message {
                case .binary:
                    NSLog("castable: received binary message in \(ns)")

                case .string(let value):
                    events.dispatch(spec: spec, params: [value])

                case .json(let value):
                    if let data = try? JSONSerialization.data(withJSONObject: value) {
                        let encoded = String(data: data, encoding: .utf8)
                        events.dispatch(spec: spec, params: [encoded])
                    } else {
                        NSLog("castable: Failed to serialize message: \(value)")
                    }
                }
            }
        }
    }
}
