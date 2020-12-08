//
//  CastDevice.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/4/20.
//

import Foundation
import SwiftCoroutine

class CastDevice: CustomStringConvertible, Identifiable {
    typealias ID = String

    let name: String
    var descriptor: CastServiceDescriptor? = nil

    private var socket: CastSocket? = nil

    var description: String {
        "CastDevice(name: \(name))"
    }

    var id: String {
        descriptor?.id ?? name
    }

    init(withName name: String) {
        self.name = name
    }

    init(withDescriptor desc: CastServiceDescriptor) {
        self.name = desc.name
        self.descriptor = desc
    }

    func app(withId id: String) -> CoFuture<CastApp> {
        return DispatchQueue.main.coroutineFuture {
            let availability = try self.appAvailability(ofIds: [id]).await()
            if availability[id] != .available {
                throw CastError.notAvailable
            }

            return CastApp(withId: id, status: self.status, openChannel: self.channel)
        }
    }

    func appAvailability(ofIds appIds: [String]) -> CoFuture<[String : CastApp.Availability]> {
        return DispatchQueue.main.coroutineFuture {
            let receiver = try self.channel(withNamespace: Namespaces.receiver).await()

            NSLog("castable: request app availability...")
            let response = try receiver.send(data: [
                "type": "GET_APP_AVAILABILITY",
                "appId": appIds,
            ]).await()

            NSLog("castable: app availability response: \(response)")
            if let map = response["availability"] as? [String : String] {
                return map.reduce(into: [:]) { result, kv in
                    result[kv.key] = CastApp.Availability(rawValue: kv.value)
                }
            } else {
                return [:]
            }
        }
    }

    func channel(withNamespace namespace: String, withOptions opts: CastChannel.Options = CastChannel.Options()) -> CoFuture<CastChannel> {
        return DispatchQueue.main.coroutineFuture {
            let socket = self.ensureConnected()
            return CastChannel(on: socket, withNamespace: namespace, withOptions: opts)
        }
    }

    func status() -> CoFuture<ReceiverStatus> {
        return DispatchQueue.main.coroutineFuture {
            let receiver = try self.channel(withNamespace: Namespaces.receiver).await()
            let response = try receiver.send(data: ["type": "GET_STATUS"]).await()
            return try response.parse(key: "status")
        }
    }

    func close() {
        socket?.close()
        socket = nil
    }

    private func ensureConnected() -> CastSocket {
        if let socket = socket, socket.isConnected {
            return socket
        }

        guard let descriptor = descriptor else {
            // TODO
            fatalError("No descriptor")
        }

        let newSocket = CastSocket(withAddress: descriptor.address)
        newSocket.open()
        self.socket = newSocket

        prepare(connection: newSocket)

        return newSocket
    }

    private func prepare(connection: CastSocket) {
        // CONNECT to the device
        let receiver = CastChannel(on: connection, withNamespace: Namespaces.connection);
        receiver.write(payload: .json(value: ["type": "CONNECT"]))

        // TODO heartbeat
    }
}
