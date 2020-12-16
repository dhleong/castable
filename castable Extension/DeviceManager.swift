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

    init(discovery: CastDiscovery, initialDevices: [CastDevice]) {
        self.discovery = discovery

        for device in initialDevices {
            managedSet[device.id] = device
        }
    }

    func startManaging(in scope: CoScope) {
        discovery.discover()

        scope.whenComplete {
            for device in self.managedSet.values {
                self.stopManaging(device: device)
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

                self.onNewDescriptors(descriptors)
            }
        }
    }

    private func onNewDescriptors(_ descriptors: Set<CastServiceDescriptor>) {
        var newDevicesSet = Set<CastDevice>()
        for desc in descriptors {
            if let existing = managedSet[desc.id] {
                newDevicesSet.insert(existing)
            } else {
                let new = CastDevice(withDescriptor: desc)
                newDevicesSet.insert(new)
                manage(device: new)
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

    private func manage(device: CastDevice) {
        NSLog("castable: managing new device: \(device)")
        self.managedSet[device.id] = device
    }

    private func stopManaging(device: CastDevice) {
        NSLog("castable: stopManaging old device: \(device)")
        self.managedSet.removeValue(forKey: device.id)
    }
}
