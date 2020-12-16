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

    func handle(context: RequestContext, request: [String : Any]?) throws -> [String : Any]? {
        let (event, handler) = try context.unpackEventHandler(request: request)

        events.unregister(spec: event, handler: handler)
        subscriptions.cancel(spec: event)

        return [:]
    }
}
