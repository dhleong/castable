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
        let safe: [String : Any] = self.reduce(into: [:]) { m, el in
            switch el.value {
            case is Decodable, is String, is Int, is Double, is Float, is Dictionary, is Bool:
                m[el.key] = el.value

            default:
                NSLog("castable: parse: \(el.value) is not Decodable")
            }
        }

        NSLog("castable: parse: \(self) -> \(safe)")
        guard let jsonData = try? JSONSerialization.data(withJSONObject: safe, options: []) else {
            throw ParseError.decoding(raw: self)
        }

        return try dictionaryDecoder.decode(T.self, from: jsonData)
    }
}
