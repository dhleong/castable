//
//  RequestSessionHandler.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/4/20.
//

import Foundation

struct RequestSessionHandler : RequestHandler {
    struct Request : Codable {
        let receiverApplicationId: String
        let autoJoinPolicy: Int
    }

    func handle(request: [String : Any]?) throws -> [String : Any]? {
        guard let req: Request = try request.parse() else {
            NSLog("codable: No request provided")
            return nil
        }

        NSLog("TODO: requestSession \(req)")
        return ["created": true, "appId": req.receiverApplicationId]
    }
}
