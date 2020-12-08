//
//  Coroutine+Extensions.swift
//  castable
//
//  Created by Daniel Leong on 12/8/20.
//

import Foundation
import SwiftCoroutine

extension CoFuture {
    /// Drop-in replacement for await() when the result is void or you
    /// explicitly know you don't need it. This is syntactic sugar to
    /// replace `let _ = try await()`
    func awaitComplete() throws {
        let _ = try await()
    }
}
