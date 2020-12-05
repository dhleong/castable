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

    func deviceSelected() -> CoFuture<CastDevice> {
        let promise = CoPromise<CastDevice>()
        selectionPromises.append(promise)
        return promise
    }
}
