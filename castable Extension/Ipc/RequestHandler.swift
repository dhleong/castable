//
//  RequestHandler.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/4/20.
//

import Foundation

protocol RequestHandler {
    func handle(request: [String : Any]?) -> [String : Any]?
}
