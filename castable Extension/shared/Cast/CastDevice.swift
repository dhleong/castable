//
//  CastDevice.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/4/20.
//

import Foundation

class CastDevice: Identifiable {
    typealias ID = String

    let name: String
    var descriptor: CastServiceDescriptor? = nil

    var id: String {
        descriptor?.id ?? name
    }

    init(withName name: String) {
        self.name = name
    }

    init(withDescriptor desc: CastServiceDescriptor) {
        self.name = desc.name
        self.descriptor = desc
    }
}
