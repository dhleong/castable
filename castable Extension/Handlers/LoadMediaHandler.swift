//
//  LoadMediaHandler.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/6/20.
//

import Foundation

struct LoadMediaHandler: RequestHandler {
    enum Errors: Error {
        case appNotStarted
        case requestError(reason: String)
    }

    struct Request: Codable {
        let autoplay: Bool?
        let currentTime: Double?

        // NOTE: swift doesn't like this... we can just pull it
        // out of the original dict, I guess
        // let customData: [String : Codable]?

        // NOTE: we *could* do this, but we basically just want to
        // forward it along, so not a whole lot of point in decoding
        // let media: MediaInfo
    }

    func handle(request: [String : Any]?) throws -> [String : Any]? {
        let _: Request = try request.parseRequest()

        guard let app = AppState.instance.activeApp else {
            throw Errors.appNotStarted
        }

        NSLog("castable: opened channel: \(Namespaces.media) on app \(app.id)")
        let ch = try app.channel(withNamespace: Namespaces.media).await()
        NSLog("castable: opened channel: \(ch)")

        // TODO: I *think* it's possible that not all players actually
        // respond correctly to this, so we should *probably* not
        // use send, but for now...
        NSLog("castable: forwarding \(request!) to \(app.id)")
        let response = try ch.send(data: request!).await()
        if let reason = response["reason"] as? String {
            NSLog("castable: loadMedia ERROR response: \(response)")
            throw Errors.requestError(reason: reason)
        }

        NSLog("castable: loadMedia response: \(response)")
        return response
    }

}
