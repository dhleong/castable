//
//  CastMessage.swift
//  castable
//
//  Created by Daniel Leong on 12/5/20.
//

import Foundation

struct CastMessage {
    enum Payload {
        case string(value: String)
        case binary(value: Data)
        case json(value: [String : Any])
    }

    let ns: String;
    let data: Payload;
    var source: String? = nil;
    var destination: String? = nil;
}
