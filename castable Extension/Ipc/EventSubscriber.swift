//
//  EventSubscriber.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/9/20.
//

import Foundation
import SwiftCoroutine

protocol EventSubscriber {
    var event: EventSpec.Identifier { get }
    func subscribe(spec: EventSpec) -> CoFuture<Void>
}
