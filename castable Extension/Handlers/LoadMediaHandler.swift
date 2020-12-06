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

        NSLog("castable: forwarding \(request!) to \(app.id)")
        let ch = try app.channel(withNamespace: Namespaces.media).await()

        // TODO: I *think* it's possible that not all players actually
        // respond correctly to this, so we should *probably* not
        // use send, but for now...
        let response = try ch.send(data: request!).await()

        // TODO check for error?
        NSLog("castable: loadMedia response: \(response)")

        return response
    }

}
