//
//  EndCurrentSessionHandler.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/6/20.
//

import Foundation

struct EndCurrentSessionHandler: RequestHandler {
    struct Request: Codable {
        let stopCasting: Bool
    }

    func handle(request: [String : Any]?) throws -> [String : Any]? {
        let req: Request = try request.parseRequest()
        NSLog("castable: endCurrentSession: \(req)")

        let state = AppState.instance
        if req.stopCasting, let app = state.activeApp {
            NSLog("castable: TODO stop \(app)")
        }

        state.activeDevice?.close()
        state.activeDevice = nil
        state.activeApp = nil

        return [:]
    }
}
