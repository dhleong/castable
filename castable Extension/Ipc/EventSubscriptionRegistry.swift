//
//  EventSubscriptionRegistry.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/9/20.
//

import Foundation
import SwiftCoroutine

class EventSubscriptionRegistry {
    private let subscribers: [EventSpec.Identifier : EventSubscriber]
    private var subscriptions: [EventSpec : CoFuture<Void>] = [:]

    init(subscribers: [EventSpec.Identifier : EventSubscriber]) {
        self.subscribers = subscribers
    }

    func subscribe(to event: EventSpec) {
        if let subscriber = subscribers[event.id] {
            subscriptions[event] = subscriber.subscribe(spec: event)
        }
    }

    func cancel(spec event: EventSpec) {
        if let spec = subscriptions.removeValue(forKey: event) {
            spec.cancel()
        }
    }
}
