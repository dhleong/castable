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

    /// Stop any running instance of this app
    func stop() -> CoFuture<Bool> {
        return DispatchQueue.main.coroutineFuture {
            self.receiverApp = nil

            // NOTE: we always fetch the session ID fresh, in case the app closed
            // out from under us
            if let sessionId = try self.findRunningInstance()?.sessionId {
                let receiver = try self.openChannel(Namespaces.receiver, CastChannel.Options()).await()
                try receiver.send(data: [
                    "type": "STOP",
                    "sessionId": sessionId,
                ]).awaitComplete()
                return true
            }

            // app was not running
            return false
        }
    }

    func channel(withNamespace namespace: String) -> CoFuture<CastChannel> {
        return DispatchQueue.main.coroutineFuture {
            // figure out if we need to join or start the session
            if let running = try self.findRunningInstance() {
                // easy case; just join
                NSLog("castable: app \(self.id) already running")
                return try self.channelFromApp(running, withNamespace: namespace).await()
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
            if let app = afterLaunch.find(app: self) {
                NSLog("castable: app launched!");
                return try self.channelFromApp(app, withNamespace: namespace).await()
            }

            NSLog("castable: app didn't get launched")
            throw CastError.notAvailable
        }
    }

    /// MUST Be called from within a coroutine
    private func findRunningInstance() throws -> ReceiverApp? {
        let status = try self.status().await()
        return status.find(app: self)
    }

    private func channelFromApp(_ app: ReceiverApp, withNamespace namespace: String) -> CoFuture<CastChannel> {
        let opts = CastChannel.Options(destination: app.transportId)
        receiverApp = app
        return openChannel(namespace, opts)
    }
}

fileprivate extension ReceiverStatus {
    func find(app castApp: CastApp) -> ReceiverApp? {
        guard let applications = self.applications else {
            return nil
        }

        for app in applications {
            if app.appId == castApp.id {
                return app
            }
        }
        return nil
    }
}
