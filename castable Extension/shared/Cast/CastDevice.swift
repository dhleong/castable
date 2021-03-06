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
    private var heartbeat: HeartbeatRunner? = nil

    var description: String {
        "CastDevice(name: \(name))"
    }

    var id: String {
        // NOTE: it's vanishingly unlikely that a name will conflict
        // with an ID, since IDs are UUIDs
        descriptor?.id ?? name
    }

    var isConnected: Bool {
        socket?.isConnected == true
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
            let socket = try self.ensureConnected()
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

    private func ensureConnected() throws -> CastSocket {
        if let socket = socket, socket.isConnected {
            return socket
        }

        guard let descriptor = descriptor else {
            // NOTE: there's not much reason for us to create a
            // CastDevice by name instead of by descriptor (except as
            // stubs for SwiftUI Previews) so this *shouldn't* happen in
            // normal use. If there ever is, as in my Stratocaster lib,
            // we should try to discover the descriptor here
            fatalError("No descriptor")
        }

        let newSocket = CastSocket(withAddress: descriptor.address)
        newSocket.open()
        self.socket = newSocket

        try prepare(connection: newSocket)

        return newSocket
    }

    private func prepare(connection: CastSocket) throws {
        // CONNECT to the device
        let receiver = CastChannel(on: connection, withNamespace: Namespaces.connection);
        try receiver.write(payload: .json(value: ["type": "CONNECT"]))

        // handle heartbeat
        heartbeat?.close()
        heartbeat = HeartbeatRunner(on: connection)
    }
}

extension CastDevice: Equatable {
    static func ==(lhs: CastDevice, rhs: CastDevice) -> Bool {
        // in general all our CastDevices should have descriptors,
        // but just in case... compare same to same
        if let left = lhs.descriptor, let right = rhs.descriptor {
            return left.id == right.id
        }

        return lhs.name == rhs.name
    }
}

extension CastDevice: Hashable {
    func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }
}
