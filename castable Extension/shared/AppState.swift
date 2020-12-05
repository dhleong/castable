//
//  AppState.swift
//  castable
//
//  Created by Daniel Leong on 12/5/20.
//

import Foundation

@available(OSX 10.15, *)
class AppState: ObservableObject {
    static let instance = AppState()

    @Published var devices: [CastDevice]

    init(withDevices devices: [CastDevice] = []) {
        self.devices = devices
    }
}
