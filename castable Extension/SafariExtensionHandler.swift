//
//  SafariExtensionHandler.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/2/20.
//

import SafariServices
import SwiftCoroutine

class SafariExtensionHandler: SFSafariExtensionHandler {
    static let cast = CastDiscovery()

    static let events = RemoteEventEmitter()
    static let allSubscribers = [
        SessionMessageSubscriber(events: events),
    ]
    static let subsRegistry: EventSubscriptionRegistry = {
        let subscribers = allSubscribers.reduce(into: [:]) { m, s in
            m[s.event] = s
        }
        return EventSubscriptionRegistry(subscribers: subscribers)
    }()

    let handlers: RequestHandlerRegistry = {
        let r = RequestHandlerRegistry()

        r.on(.endCurrentSession, perform: EndCurrentSessionHandler())
        r.on(.loadMedia, perform: LoadMediaHandler())
        r.on(.requestSession, perform: RequestSessionHandler())
        r.on(.sendMediaCommand, perform: SendMediaCommandHandler())

        r.on(.listen, perform: ListenHandler(events: events, subscriptions: subsRegistry))
        r.on(.unlisten, perform: UnlistenHandler(events: events, subscriptions: subsRegistry))

        r.on(.sessionSendMessage, perform: SessionSendHandler())
        return r
    }()

    let scope = CoScope()
    let deviceManager = DeviceManager(
        discovery: SafariExtensionHandler.cast,
        initialDevices: AppState.instance.devices
    )

    override init() {
        super.init()

        deviceManager.startManaging(in: scope)
    }

    deinit {
        scope.cancel()
    }

    override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]?) {
        NSLog("castable: Received (\(messageName)) with userInfo (\(userInfo ?? [:]))")

        page.getPropertiesWithCompletionHandler { properties in
            NSLog("castable: The extension received a message (\(messageName)) from a script injected into (\(String(describing: properties?.url))) with userInfo (\(userInfo ?? [:]))")
        }

        let message = Message(rawValue: messageName)
        switch message {
        case .some(let message):
            dispatchMessage(message, with: userInfo, forPage: page)

        default:
            NSLog("castable: Unexpected message: \(messageName)")

            if let requestId = userInfo?["castableRequestId"] {
                page.dispatch(.ipcOutgoing, withArgs: [
                    "castableRequestId": requestId,
                    "error": "Unknown message: \(messageName)",
                ])
            }
        }
    }

    override func toolbarItemClicked(in window: SFSafariWindow) {
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

    private func dispatchMessage(_ message: Message, with userInfo: [String : Any]?, forPage page: SFSafariPage) {
        DispatchQueue.main.startCoroutine { [self] in
            var response: [String : Any]?
            if let userInfo = userInfo, let requestId = userInfo["castableRequestId"] {
                response = ["castableRequestId": requestId]
            } else {
                response = nil
            }

            let context = RequestContext(page: page)

            do {
                let fromHandler = try handlers.dispatch(
                    context: context,
                    message: message,
                    withData: userInfo
                )
                NSLog("castable: responding to sessionRequest: \(userInfo ?? [:])")

                if let fromHandler = fromHandler, response != nil {
                    response!.merge(fromHandler) { (original, _) in original }
                }

            } catch (GenericError.cancelled) {
                response?["error"] = ["id": "cancelled"]
                response?["cancelled"] = true
            } catch {
                NSLog("castable: Error handling \(message): \(error)")
                response?["error"] = String(describing: error)
            }

            if let response = response {
                NSLog("castable: sending response: \(response)")
                page.dispatch(.ipcOutgoing, withArgs: response)
            } else {
                NSLog("castable: no response generated to \(message): \(String(describing: userInfo))")
            }
        }
    }

}

extension SFSafariPage {
    func dispatch(_ message: Message, withArgs: [String : Any]? = nil) {
        self.dispatchMessageToScript(withName: message.rawValue, userInfo: withArgs)
    }
}
