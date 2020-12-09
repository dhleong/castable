//
//  AppState.swift
//  castable
//
//  Created by Daniel Leong on 12/5/20.
//

import Foundation
import SwiftCoroutine

@available(OSX 10.15, *)
class AppState: ObservableObject {
    static let instance = AppState()

    var events = RemoteEventEmitter()

    @Published var devices: [CastDevice]
    @Published var activeDevice: CastDevice? = nil
    @Published var activeApp: CastApp? = nil

    private var selectionPromises: [CoPromise<CastDevice>] = []

    init(withDevices devices: [CastDevice] = []) {
        self.devices = devices
    }

    func notifyDeviceSelected(device: CastDevice) {
        for promise in selectionPromises {
            promise.success(device)
        }
        selectionPromises = []
    }

    func notifyPopoverDismissed() {
        for promise in selectionPromises {
            promise.fail(GenericError.cancelled)
        }
        selectionPromises = []
    }

    func deviceSelected() -> CoFuture<CastDevice> {
        let promise = CoPromise<CastDevice>()
        selectionPromises.append(promise)
        return promise
    }
}
