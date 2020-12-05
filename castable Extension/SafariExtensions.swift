//
//  SafariExtensions.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/5/20.
//

import SafariServices
import SwiftCoroutine

public extension SFSafariApplication {
    static func activeWindow() -> CoFuture<SFSafariWindow?> {
        let promise = CoPromise<SFSafariWindow?>()
        getActiveWindow { win in
            promise.success(win)
        }
        return promise
    }

    static func toolbarItem() -> CoFuture<SFSafariToolbarItem?> {
        return activeWindow().flatMap { win in
            win?.toolbarItem() ?? CoFuture(result: .success(nil))
        }
    }
}

public extension SFSafariWindow {
    func toolbarItem() -> CoFuture<SFSafariToolbarItem?> {
        let promise = CoPromise<SFSafariToolbarItem?>()
        getToolbarItem { toolbar in
            promise.success(toolbar)
        }
        return promise
    }
}
