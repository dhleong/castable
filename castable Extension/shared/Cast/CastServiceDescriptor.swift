//
//  CastServiceDescriptor.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/4/20.
//

import Foundation
import Network

struct CastServiceDescriptor : Identifiable {
    typealias ID = String

    let id: String
    let name: String
    let address: NWEndpoint
    let model: String
}
