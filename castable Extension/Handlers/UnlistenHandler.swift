//
//  UnlistenHandler.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/9/20.
//

import Foundation

struct UnlistenHandler: RequestHandler {
    let events: RemoteEventEmitter
    let subscriptions: EventSubscriptionRegistry

    func handle(request: [String : Any]?) throws -> [String : Any]? {
        let (event, handler) = try request.unpackEventHandler()

        events.unregister(spec: event, handler: handler)
        subscriptions.cancel(spec: event)

        return [:]
    }
}
