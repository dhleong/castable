//
//  ListenHandler.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/9/20.
//

import Foundation
import SafariServices

struct ListenHandler: RequestHandler {
    struct Request: Codable {
        let event: EventSpec
        let listenerId: String
    }

    let events: RemoteEventEmitter
    let subscriptions: EventSubscriptionRegistry

    func handle(context: RequestContext, request: [String : Any]?) throws -> [String : Any]? {
        let (event, handler) = try context.unpackEventHandler(request: request)

        events.register(spec: event, handler: handler)
        subscriptions.subscribe(to: event)

        return [:]
    }
}

extension RequestContext {
    func unpackEventHandler(request: [String : Any]?) throws -> (EventSpec, EventHandler) {
        let req: ListenHandler.Request = try request.parseRequest()
        return (req.event, EventHandler(page: page, listenerId: req.listenerId))
    }
}
