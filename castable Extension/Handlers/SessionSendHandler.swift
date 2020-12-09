//
//  SessionSendHandler.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/9/20.
//

import Foundation

struct SessionSendHandler: RequestHandler {
    struct Request: Codable {
        let namespace: String
        let stringMessage: String?
    }

    func handle(request: [String : Any]?) throws -> [String : Any]? {
        let req: Request = try request.parseRequest()
        NSLog("castable: session.send \(req)")

        guard let app = AppState.instance.activeApp else {
            NSLog("castable: session.send without app")
            throw GenericError.invalidRequest
        }

        let ch = try app.channel(withNamespace: req.namespace).await()
        if let message = req.stringMessage {
            ch.write(payload: .string(value: message))
        } else if let dictMessage = request?["dictMessage"] as? [String : Any] {
            ch.write(payload: .json(value: dictMessage))
        }

        return [:]
    }
}
