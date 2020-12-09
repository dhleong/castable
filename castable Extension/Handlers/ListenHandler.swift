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

    func handle(request: [String : Any]?) throws -> [String : Any]? {
        let (event, handler) = try request.unpackEventHandler()

        events.register(spec: event, handler: handler)
        subscriptions.subscribe(to: event)

        return [:]
    }
}

extension Optional where Wrapped == Dictionary<String, Any> {
    func unpackEventHandler() throws -> (EventSpec, EventHandler) {
        let req: ListenHandler.Request = try self.parseRequest()
        guard let page = self?[REQUEST_PAGE_KEY] as? SFSafariPage else {
            throw GenericError.invalidRequest
        }
        return (req.event, EventHandler(page: page, listenerId: req.listenerId))
    }
}
