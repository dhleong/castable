//
//  CastServiceDescriptor.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/4/20.
//

import Foundation
import Network

struct CastServiceDescriptor: Hashable, Identifiable {
    enum Capability: String, Codable {
        case audioOut = "audio_out"
        case videoOut = "video_out"
        case audioIn = "audio_in"
    }

    typealias ID = String

    let id: String
    let name: String
    let address: NWEndpoint
    let model: String
    var capabilities: [Capability] = []
}
