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

    @Published var devices: [CastDevice]
    @Published var connectingDevice: CastDevice? = nil
    @Published var activeDevice: CastDevice? = nil
    @Published var activeApp: CastApp? = nil

    private var selectionPromises: [CoPromise<CastDevice>] = []

    init(withDevices devices: [CastDevice] = [], withActive device: CastDevice? = nil) {
        self.devices = devices
        self.activeDevice = device
    }

    func notifyDeviceStop(device: CastDevice) {
        NSLog("Stopping device")
        DispatchQueue.main.startCoroutine {
            try self.activeApp?.stop().awaitComplete()
            self.activeApp = nil

            self.activeDevice?.close()
            self.activeDevice = nil
        }
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
