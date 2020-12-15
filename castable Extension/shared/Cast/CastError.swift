//
//  CastError.swift
//  castable
//
//  Created by Daniel Leong on 12/5/20.
//

import Foundation

enum CastError: Error {
    case eof
    case noResponse
    case notAvailable
    case notConnected
    case timeout
    case unableToEncode(message: [String : Any], cause: Error)
    case unableToParse(bytesCount: Int, hex: String)
    case unexpectedResponse(response: Any?)
}
