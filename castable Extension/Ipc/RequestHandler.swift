//
//  RequestHandler.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/4/20.
//

import Foundation
import SwiftCoroutine

enum RequestError : Error {
    case decoding(raw: [String : Any]?)
}

protocol RequestHandler {
    func handle(request: [String : Any]?) throws -> CoFuture<[String : Any]?>
}

let dictionaryDecoder = JSONDecoder()

extension Optional where Wrapped == [String : Any] {
    func parse<T : Decodable>() throws -> T? {
        if let self = self {
            return try self.parse()
        }
        return nil
    }
}

extension Dictionary where Key == String {
    func parse<T : Decodable>() throws -> T {
        guard let jsonData = try? JSONSerialization.data(withJSONObject: self, options: []) else {
            throw RequestError.decoding(raw: self)
        }

        let decoded = try? dictionaryDecoder.decode(T.self, from: jsonData)
        if let decoded = decoded {
            return decoded
        }

        throw RequestError.decoding(raw: self)
    }
}
