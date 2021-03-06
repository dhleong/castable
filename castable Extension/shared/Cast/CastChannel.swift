//
//  CastChannel.swift
//  castable
//
//  Created by Daniel Leong on 12/5/20.
//

import Foundation
import SwiftCoroutine

class CastChannel {
    struct Options {
        let destination: String?
    }

    public let namespace: String
    private let socket: CastSocket
    private let options: Options

    private var hasConnected = false

    init(on socket: CastSocket, withNamespace ns: String, withOptions options: Options = Options()) {
        self.namespace = ns
        self.socket = socket
        self.options = options
    }

    /// The app session (`transportId`) this Channel is targetting, if
    /// any. Guaranteed not-nil when created via [CastApp.channel]
    var destination: String? {
        options.destination
    }

    /// Listen to all messages received on this channel
    func receive(in scope: CoScope? = nil) -> CoChannel<CastMessage.Payload> {
        let ch = CoChannel<CastMessage.Payload>(capacity: 1)
        let myScope = CoScope()

        if let parent = scope {
            myScope.added(to: parent)
        }

        ch.whenCanceled {
            myScope.cancel()
        }

        DispatchQueue.main.startCoroutine(in: myScope) {
            let incoming = self.socket.receive(in: myScope)
            incoming.whenCanceled {
                ch.cancel()
            }

            do {
                for message in incoming.makeIterator() {
                    if message.ns != self.namespace {
                        continue
                    }
                    if let dest = self.destination, message.source != dest {
                        continue
                    }

                    try ch.awaitSend(message.data)
                }
            } catch {
                NSLog("castable:Channel error in receive: \(error)")
                ch.cancel()
            }
        }

        return ch
    }

    /// Send a JSON-style message object and await the response
    /// (expecting a parsed JSON object)
    func send(data: [String : Any]) -> CoFuture<[String : Any]> {
        let id = socket.nextId()
        return DispatchQueue.main.coroutineFuture {
            try self.write(payload: .json(value: data.merging([ "requestId": id ]) { $1 }))

            let sentPing = data["type"] as? String == "PING"


            let ch = self.receive()
            defer { ch.cancel() }

            for message in ch.makeIterator() {
                guard case let .json(incoming) = message else {
                    continue
                }

                // special case
                if sentPing && incoming["type"] as? String == "PONG" {
                    return incoming
                }

                // otherwise...
                if let incomingId = incoming["requestId"] as? Int, incomingId == id {
                    return incoming
                }
            }

            throw CastError.noResponse
        }
    }

    /// Write any sort of data message to this channel.
    func write(payload: CastMessage.Payload) throws {
        if let destination = destination, !hasConnected {
            // ensure we've "CONNECT"'d to the destination, if provided
            hasConnected = true
            try socket.write(message: CastMessage(
                ns: Namespaces.connection,
                data: .json(value: [
                    "type": "CONNECT",
                    "origin": [:],
                ]),
                destination: destination))
        }

        try socket.write(message: CastMessage(
            ns: namespace,
            data: payload,
            destination: destination))
    }
}

extension CastChannel.Options {
    init() {
        self.init(destination: nil)
    }
}
