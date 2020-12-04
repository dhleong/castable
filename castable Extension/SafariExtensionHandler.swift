//
//  SafariExtensionHandler.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/2/20.
//

import SafariServices

enum Message: String {
    case contentLoaded = "content-loaded"
    case requestSession = "request-session"
    case ipc = "castable-extension->browser"
}

class SafariExtensionHandler: SFSafariExtensionHandler {
    let cast = CastDiscovery()

    // override init() {
    //     cast.discover()
    // }

    // deinit {
    //     cast.stop()
    // }

    override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]?) {
        // This method will be called when a content script provided by your extension calls safari.extension.dispatchMessage("message").
        NSLog("castable: Received (\(messageName)) with userInfo (\(userInfo ?? [:]))")

        page.getPropertiesWithCompletionHandler { properties in
            NSLog("castable: The extension received a message (\(messageName)) from a script injected into (\(String(describing: properties?.url))) with userInfo (\(userInfo ?? [:]))")
        }

        let message = Message(rawValue: messageName)

        // TODO: probably, register these as handlers
        switch message {
        case .contentLoaded:
            page.dispatchMessageToScript(withName: "register-cast")

        case .requestSession:
            NSLog("castable: responding to sessionRequest: \(userInfo ?? [:])")
            page.dispatch(Message.ipc, withArgs: [
                "received": userInfo ?? [:]
            ])

        case .ipc:
            // TODO dispatch
            NSLog("castable: responding to IPC: \(userInfo ?? [:])")
            page.dispatch(Message.ipc)

        case .none:
            NSLog("castable: Unexpected message: \(messageName)")
        }
    }

    override func toolbarItemClicked(in window: SFSafariWindow) {
        // This method will be called when your toolbar item is clicked.
        NSLog("The extension's toolbar item was clicked")
    }
    
    override func validateToolbarItem(in window: SFSafariWindow, validationHandler: @escaping ((Bool, String) -> Void)) {
        // This is called when Safari's state changed in some way that would require the extension's toolbar item to be validated again.
        validationHandler(true, "")
    }
    
    override func popoverViewController() -> SFSafariExtensionViewController {
        return SafariExtensionViewController.shared
    }

}

extension SFSafariPage {
    func dispatch(_ message: Message, withArgs: [String : Any]? = nil) {
        self.dispatchMessageToScript(withName: message.rawValue, userInfo: withArgs)
    }
}
