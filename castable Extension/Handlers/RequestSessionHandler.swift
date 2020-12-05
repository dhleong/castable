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

            SFSafariApplication.getActiveWindow { win in
                win?.getToolbarItem { toolbar in
                    toolbar?.showPopover()
                }
            }

            try Coroutine.delay(.seconds(1))

            return ["created": true, "appId": req.receiverApplicationId]
        }
    }
}
