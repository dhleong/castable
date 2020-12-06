//
//  Dictionary+Parse.swift
//  castable
//
//  Created by Daniel Leong on 12/5/20.
//

import Foundation

enum ParseError: Error {
    case decoding(raw: [String : Any])
}

let dictionaryDecoder = JSONDecoder()

extension Dictionary where Key == String {
    func parse<T : Decodable>(key: String) throws -> T {
        if let value = self[key] as? [String : Any] {
            return try value.parse()
        } else {
            throw ParseError.decoding(raw: self)
        }
    }

    func parse<T : Decodable>() throws -> T {
        guard let jsonData = try? JSONSerialization.data(withJSONObject: self, options: []) else {
            throw ParseError.decoding(raw: self)
        }

        let decoded = try? dictionaryDecoder.decode(T.self, from: jsonData)
        if let decoded = decoded {
            return decoded
        }

        throw ParseError.decoding(raw: self)
    }
}
