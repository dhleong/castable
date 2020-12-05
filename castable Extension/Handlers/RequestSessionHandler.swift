//
//  RequestSessionHandler.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/4/20.
//

import Foundation
import SafariServices
import SwiftCoroutine

struct RequestSessionHandler : RequestHandler {
    struct Request : Codable {
        let receiverApplicationId: String
        let autoJoinPolicy: Int
    }

    func handle(request: [String : Any]?) throws -> CoFuture<[String : Any]?> {
        guard let req: Request = try request.parse() else {
            NSLog("codable: No request provided")
            return CoFuture(result: .success(nil))
        }

        return DispatchQueue.main.coroutineFuture {
            NSLog("TODO: requestSession \(req)")

            let toolbar = try SFSafariApplication.toolbarItem().await()
            toolbar?.showPopover()

            let device = try AppState.instance.deviceSelected().await()

            SafariExtensionViewController.shared.dismissPopover()

            return ["created": true, "appId": req.receiverApplicationId, "device": device.name]
        }
    }
}
