//
//  RequestSessionHandler.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/4/20.
//

import Foundation
import SafariServices
import SwiftCoroutine

struct RequestSessionHandler: RequestHandler {
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

        let toolbar = try SFSafariApplication.toolbarItem().await()
        toolbar?.showPopover()

        let device = try AppState.instance.deviceSelected().await()

        // TODO notify popover UI of launching:
        let app = try device.app(withId: req.receiverApplicationId).await()
        let _ = try app.launch().await()
        NSLog("launched app: \(app)")

        // TODO cleanup popover:
        SafariExtensionViewController.shared.dismissPopover()

        return ["created": true, "appId": req.receiverApplicationId, "device": device.name]
    }

}
