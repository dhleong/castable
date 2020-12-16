//
//  DeviceManager.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/16/20.
//

import Foundation
import SwiftCoroutine

class DeviceManager {
    private let discovery: CastDiscovery

    private var managedSet: [String : CastDevice] = [:]
    private var initialDevices: [CastDevice]? = nil

    init(discovery: CastDiscovery, initialDevices: [CastDevice]) {
        self.discovery = discovery
        self.initialDevices = initialDevices
    }

    func startManaging(in scope: CoScope) {
        discovery.discover()

        scope.whenComplete {
            for device in self.managedSet.values {
                self.stopManaging(device: device)
            }
        }

        if let initialDevices = self.initialDevices {
            self.initialDevices = nil
            for device in initialDevices {
                self.manage(device: device, in: scope)
            }
        }

        DispatchQueue.main.startCoroutine(in: scope) {
            defer {
                NSLog("castable: end discover handling")
                self.discovery.stop()
            }

            let ch = self.discovery.receive()
            for descriptors in ch.makeIterator() {
                let anyNew = descriptors.any { self.managedSet[$0.id] == nil }
                if !anyNew && descriptors.count == self.managedSet.count {
                    // no change
                    continue
                }

                self.handleNewDescriptors(descriptors, in: scope)
            }
        }
    }

    private func handleNewDescriptors(
        _ descriptors: Set<CastServiceDescriptor>,
        in scope: CoScope
    ) {
        var newDevicesSet = Set<CastDevice>()
        for desc in descriptors {
            if let existing = managedSet[desc.id] {
                newDevicesSet.insert(existing)
            } else {
                let new = CastDevice(withDescriptor: desc)
                newDevicesSet.insert(new)
                manage(device: new, in: scope)
            }
        }

        for device in managedSet.values {
            if !newDevicesSet.contains(device) {
                stopManaging(device: device)
            }
        }

        let newDevices = newDevicesSet.sorted { $0.name < $1.name }
        AppState.instance.devices = newDevices
        NSLog("castable: got new devices set: \(newDevices)")
    }

    private func manage(device: CastDevice, in scope: CoScope) {
        NSLog("castable: managing new device: \(device)")
        self.managedSet[device.id] = device

        DispatchQueue.global(qos: .background).startCoroutine(in: scope) {
            let wasConnected = device.isConnected
            defer {
                if !wasConnected {
                    // don't leave a connection dangling
                    device.close()
                }
            }

            let status = try device.status().await()
            let anyAppsRunning = status.applications.any { !$0.isIdleScreen }
            if anyAppsRunning {
                NSLog("castable: \(device) is active: \(status)")
                AppState.instance.activeDevice = device
            }
        }
    }

    private func stopManaging(device: CastDevice) {
        NSLog("castable: stopManaging old device: \(device)")
        self.managedSet.removeValue(forKey: device.id)

        // NOTE: nothing to do here, currently; we don't want to close()
        // the device because it could be in use by the user, and we might
        // "stop managing" because our scope is closing
    }
}
