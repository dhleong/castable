//
//  SafariExtensionHandler.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/2/20.
//

import SafariServices

class SafariExtensionHandler: SFSafariExtensionHandler {
    let cast = CastDiscovery()
    let handlers: RequestHandlerRegistry = {
        let r = RequestHandlerRegistry()

        r.on(.requestSession, perform: RequestSessionHandler())

        return r
    }()

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
        switch message {
        case .contentLoaded:
            page.dispatchMessageToScript(withName: "register-cast")

        case .some(let message):
            let response = handlers.dispatch(message: message, withData: userInfo)
            NSLog("castable: responding to sessionRequest: \(userInfo ?? [:])")

            var fullResponse = response ?? [:]
            if let userInfo = userInfo, let requestId = userInfo["requestId"] {
                fullResponse["requestId"] = requestId
            }

            if response != nil || fullResponse["requestId"] != nil {
                page.dispatch(.ipcOutgoing, withArgs: fullResponse)
            }

        default:
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
