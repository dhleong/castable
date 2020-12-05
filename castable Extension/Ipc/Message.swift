//
//  Message.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/4/20.
//

import Foundation

enum Message: String {
    case contentLoaded = "content-loaded"
    case ipcOutgoing = "castable-extension->browser"

    case requestSession
}