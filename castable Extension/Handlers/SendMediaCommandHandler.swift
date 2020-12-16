//
//  SendMediaCommandHandler.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/15/20.
//

import Foundation

struct SendMediaCommandHandler: RequestHandler {
    func handle(request: [String : Any]?) throws -> [String : Any]? {
        guard let request = request else {
            throw GenericError.invalidRequest
        }

        NSLog("castable: sendMediaCommand: \(request)")

        guard let app = AppState.instance.activeApp else {
            NSLog("castable: sendMediaCommand without app")
            throw GenericError.invalidRequest
        }

        let ch = try app.channel(withNamespace: Namespaces.media).await()
        try ch.send(data: request).awaitComplete()

        return [:]
    }
}
