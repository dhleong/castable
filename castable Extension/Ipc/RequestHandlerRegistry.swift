//
//  RequestHandlerRegistry.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/4/20.
//

import Foundation
import SwiftCoroutine

enum ReqestHandlerError: Error {
    case noRegisteredHandler
}

class RequestHandlerRegistry {
    private var handlers: [Message: RequestHandler] = [:]

    private let decoder = JSONDecoder()

    func on<THandler : RequestHandler>(_ message: Message, perform handler: THandler) {
        handlers[message] = handler
    }

    func dispatch(context: RequestContext, message: Message, withData data: [String : Any]? = nil) throws -> [String : Any]? {
        guard let handler = handlers[message] else {
            NSLog("castable: No handler registered for \(message)")
            throw ReqestHandlerError.noRegisteredHandler
        }

        // it would be nice to have type safe handlers, but
        // there doesn't seem to be a way to cast to a protocol that
        // has an associated type :\

        // guard let jsonData = try? JSONSerialization.data(withJSONObject: data ?? [:], options: []) else {
        //     handler.handle(request: nil)
        //     return
        // }
        //
        // let decoded = try? decoder.decode(handler.dataType, from: jsonData)

        return try handler.handle(context: context, request: data)
    }
}
