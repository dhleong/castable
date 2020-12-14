//
//  HeartbeatRunner.swift
//  castable
//
//  Created by Daniel Leong on 12/14/20.
//

import Foundation
import SwiftCoroutine

class HeartbeatRunner {
    private let socket: CastSocket
    private let channel: CastChannel
    private let interval: TimeInterval
    private let timeout: TimeInterval

    private lazy var timer: DispatchSourceTimer = {
        let t = DispatchSource.makeTimerSource()
        t.schedule(deadline: .now() + interval, repeating: interval)
        t.setEventHandler { [weak self] in
            self?.performHeartbeat()
        }
        return t
    }()
    private var scope = CoScope()

    init(on socket: CastSocket, withInterval interval: TimeInterval = 30.0, timeout: TimeInterval = 5.0) {
        self.socket = socket
        self.channel = CastChannel(on: socket, withNamespace: Namespaces.connection)
        self.interval = interval
        self.timeout = timeout
        self.timer.resume()
    }

    deinit {
        close()
    }

    func close() {
        if (timer.isCancelled) {
            NSLog("castable: WARN: duplicate HeartbeatRunner.close()")
            return
        }

        scope.cancel()
        timer.cancel()
    }

    private func performHeartbeat() {
        DispatchQueue.global(qos: .background).startCoroutine(in: scope) {
            do {
                let _ = try self.channel.send(data: [ "type": "PING" ])
                    .await(timeout: .milliseconds(Int(1000 * self.timeout)))
            } catch (CoFutureError.timeout) {
                NSLog("castable: WARN: failed to receive heartbeat within deadline")
            }
        }
    }
}
