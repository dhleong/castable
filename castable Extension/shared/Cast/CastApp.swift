//
//  CastApp.swift
//  castable
//
//  Created by Daniel Leong on 12/5/20.
//

import Foundation
import SwiftCoroutine

class CastApp {
    enum Availability: String {
        case available = "APP_AVAILABLE"
        case unavailable = "APP_UNAVAILABLE"
    }

    public let id: String
    public var receiverApp: ReceiverApp? = nil

    private let status: () -> CoFuture<ReceiverStatus>
    private let openChannel: (String, CastChannel.Options) -> CoFuture<CastChannel>

    init(
        withId id: String,
        status: @escaping () -> CoFuture<ReceiverStatus>,
        openChannel: @escaping (String, CastChannel.Options) -> CoFuture<CastChannel>
    ) {
        self.id = id
        self.status = status
        self.openChannel = openChannel
    }

    func launch() -> CoFuture<Bool> {
        return self.channel(withNamespace: "").map { _ in true }
    }

    func channel(withNamespace namespace: String) -> CoFuture<CastChannel> {
        return DispatchQueue.main.coroutineFuture {
            // figure out if we need to join or start the session
            let status = try self.status().await()
            for app in status.applications {
                if app.appId == self.id {
                    NSLog("castable: app \(self.id) already running")
                    return try self.channelFromApp(app, withNamespace: namespace).await()
                }
            }

            NSLog("castable: launching app: \(self.id)")
            let receiver = try self.openChannel(Namespaces.receiver, CastChannel.Options()).await()
            let response = try receiver.send(data: [
                "type": "LAUNCH",
                "appId": self.id,
            ]).await()

            if response["type"] as? String != "RECEIVER_STATUS" {
                throw CastError.unexpectedResponse(response: response)
            }

            let afterLaunch: ReceiverStatus = try response.parse(key: "status")

            for app in afterLaunch.applications {
                if app.appId == self.id {
                    NSLog("castable: app launched!");
                    return try self.channelFromApp(app, withNamespace: namespace).await()
                }
            }

            NSLog("castable: app didn't get launched")
            throw CastError.notAvailable
        }
    }

    private func channelFromApp(_ app: ReceiverApp, withNamespace namespace: String) -> CoFuture<CastChannel> {
        let opts = CastChannel.Options(destination: app.transportId)
        receiverApp = app
        return openChannel(namespace, opts)
    }

}
