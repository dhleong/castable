//
//  RemoteEventEmitter.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/9/20.
//

import Foundation
import SafariServices

struct EventHandler: Hashable {
    let page: SFSafariPage
    let listenerId: String
}

struct EventSpec: Codable, Hashable {
    enum Identifier: String, Codable {
        case sessionMessage
    }

    let id: Identifier
    let param: String?
}

/// Tracks registered remote events
class RemoteEventEmitter {
    private var listeners: [EventSpec : [EventHandler]] = [:]

    func register(spec: EventSpec, handler: EventHandler) {
        var list: [EventHandler]
        if let specListeners = listeners[spec] {
            list = specListeners
        } else {
            list = []
        }

        list.append(handler)
        listeners[spec] = list
    }

    func unregister(spec: EventSpec, handler: EventHandler) {
        if var specListeners = listeners[spec],
            let index = specListeners.firstIndex(of: handler)
        {
            specListeners.remove(at: index)
            listeners[spec] = specListeners
        }
    }

    func dispatch(spec: EventSpec, params: [Encodable]) {
        if let receivers = listeners[spec] {
            for receiver in receivers {
                receiver.page.dispatch(.ipcOutgoing, withArgs: [
                    "listenerId": receiver.listenerId,
                    "params": params,
                ])
            }
        }
    }
}
