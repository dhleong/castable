//
//  SafariExtensionHandler.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/2/20.
//

import SafariServices
import SwiftCoroutine

class SafariExtensionHandler: SFSafariExtensionHandler {
    let cast = CastDiscovery()
    let handlers: RequestHandlerRegistry = {
        let r = RequestHandlerRegistry()

        r.on(.requestSession, perform: RequestSessionHandler())

        return r
    }()

    override init() {
        cast.discover()
    }

    deinit {
        cast.stop()
    }

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
            dispatchMessage(message, with: userInfo, forPage: page)

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

    override func popoverDidClose(in window: SFSafariWindow) {
        AppState.instance.notifyPopoverDismissed()
    }

    private func dispatchMessage(_ message: (Message), with userInfo: [String : Any]?, forPage page: SFSafariPage) {
        DispatchQueue.main.startCoroutine { [self] in
            var response: [String : Any]?
            if let userInfo = userInfo, let requestId = userInfo["requestId"] {
                response = ["requestId": requestId]
            } else {
                response = nil
            }

            do {
                let fromHandler = try handlers.dispatch(message: message, withData: userInfo)
                NSLog("castable: responding to sessionRequest: \(userInfo ?? [:])")

                if let fromHandler = fromHandler, response != nil {
                    response!.merge(fromHandler) { (original, _) in original }
                }

            } catch (GenericError.cancelled) {
                response?["error"] = ["id": "cancelled"]
                response?["cancelled"] = true
            } catch {
                NSLog("castable: Error handling \(message): \(error)")
                response?["error"] = error
            }

            if let response = response {
                page.dispatch(.ipcOutgoing, withArgs: response)
            }
        }
    }

}

extension SFSafariPage {
    func dispatch(_ message: Message, withArgs: [String : Any]? = nil) {
        self.dispatchMessageToScript(withName: message.rawValue, userInfo: withArgs)
    }
}
