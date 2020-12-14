//
//  CastError.swift
//  castable
//
//  Created by Daniel Leong on 12/5/20.
//

import Foundation

enum CastError: Error {
    case noResponse
    case notAvailable
    case timeout
    case unexpectedResponse(response: Any?)
}
