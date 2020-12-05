//
//  RequestSessionHandler.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/4/20.
//

import Foundation

struct RequestSessionHandler : RequestHandler {
    func handle(request: [String : Any]?) -> [String : Any]? {
        guard let request = request else {
            NSLog("codable: No request provided")
            return nil
        }

        NSLog("TODO: requestSession \(request)")
        return ["created": true]
    }
}
