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
    struct Request: Codable {
        let receiverApplicationId: String
        let autoJoinPolicy: Int
    }

    struct Response: Codable {
        struct Device: Codable {
            let id: String
            let name: String
            let model: String

            init(from: CastServiceDescriptor) {
                id = from.id
                name = from.name
                model = from.model
            }
        }

        let app: ReceiverApp
        let sessionId: String
        let device: Device
    }

    func handle(request: [String : Any]?) throws -> [String : Any]? {
        let req: Request = try request.parseRequest()
        NSLog("requestSession \(req)")

        let toolbar = try SFSafariApplication.toolbarItem().await()
        toolbar?.showPopover()

        let device = try AppState.instance.deviceSelected().await()
        AppState.instance.activeDevice = device

        // TODO notify popover UI of launching:
        let app = try device.app(withId: req.receiverApplicationId).await()
        let ch = try app.channel(withNamespace: Namespaces.media).await()

        guard let receiver = app.receiverApp else {
            throw GenericError.invalidRequest
        }

        AppState.instance.activeApp = app
        let sessionId = ch.destination ?? receiver.sessionId
        NSLog("launched app: \(app): dest=\(String(describing: ch.destination)); sess=\(sessionId)")

        // TODO cleanup popover:
        SafariExtensionViewController.shared.dismissPopover()

        // TODO could we return an Encodable directly in the protocol?
        return try Response(
            app: receiver,
            sessionId: ch.destination ?? receiver.sessionId,
            device: Response.Device(from: device.descriptor!)
        ).toDictionary()
    }

}
