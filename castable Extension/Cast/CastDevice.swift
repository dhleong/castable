//
//  CastDevice.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/4/20.
//

import Foundation

class CastDevice {
    let name: String
    var descriptor: CastServiceDescriptor? = nil

    init(withName name: String) {
        self.name = name
    }
}
