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

extension DispatchQueue {
    /// Drop-in replacement for coroutineFuture that provides a `scope` the `task` can use.
    /// If the returned `CoFuture` is ever canceled, that scope will also be canceled.
    func scopedFuture<T>(_ task: @escaping (_ scope: CoScope) throws -> T) -> CoFuture<T> {
        let scope = CoScope()
        let future = coroutineFuture {
            try task(scope)
        }

        future.whenCanceled {
            scope.cancel()
        }

        return future
    }
}
