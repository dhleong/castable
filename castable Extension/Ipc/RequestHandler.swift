//
//  RequestHandler.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/4/20.
//

import Foundation
import SwiftCoroutine
import SafariServices

struct RequestContext {
    let page: SFSafariPage
}

protocol RequestHandler {
    /// Handle the provided request; this will be called in a Coroutine, so
    /// so `await()` etc may be used. By default, simply calls through
    /// to the overload with a `context`
    func handle(context: RequestContext, request: [String : Any]?) throws -> [String : Any]?

    /// See the other handle() method; by default this just throws an
    /// exception; one or the other of these methods MUST be implemented,
    /// but not both
    func handle(request: [String : Any]?) throws -> [String : Any]?
}

extension RequestHandler {
    func handle(context: RequestContext, request: [String : Any]?) throws -> [String : Any]? {
        return try self.handle(request: request)
    }

    func handle(request: [String : Any]?) throws -> [String : Any]? {
        throw GenericError.cancelled
    }
}

extension Optional where Wrapped == [String : Any] {
    func parse<T : Decodable>() throws -> T? {
        if let self = self {
            return try self.parse()
        }
        return nil
    }

    func parseRequest<T : Decodable>() throws -> T {
        if let self = self {
            return try self.parse()
        }
        throw GenericError.invalidRequest
    }
}

extension Encodable {
    func toDictionary() throws -> [String : Any] {
        let data = try JSONEncoder().encode(self)
        guard let dict = try JSONSerialization.jsonObject(with: data) as? [String : Any] else {
            throw GenericError.invalidRequest
        }
        return dict
    }
}
