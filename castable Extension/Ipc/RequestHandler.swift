//
//  RequestHandler.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/4/20.
//

import Foundation
import SwiftCoroutine

protocol RequestHandler {
    /// Handle the provided request; this will be called in a Coroutine, so
    /// `await()` etc may be used
    func handle(request: [String : Any]?) throws -> [String : Any]?
}

extension Optional where Wrapped == [String : Any] {
    func parse<T : Decodable>() throws -> T? {
        if let self = self {
            return try self.parse()
        }
        return nil
    }
}
