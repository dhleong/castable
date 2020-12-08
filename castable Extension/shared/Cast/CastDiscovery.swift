import Foundation
import Network
import SafariServices
import SwiftCoroutine

@available(OSX 10.15, *)
class CastDiscovery {

    private var browser: NWBrowser? = nil

    private var receivers: [CoChannel<Set<CastServiceDescriptor>>] = []
    private var lastDevices: Set<CastServiceDescriptor> = []

    func discover() {
        if browser != nil {
            NSLog("castable: WARNING: duplicate discover() without stop()")
            return
        }

        let b = NWBrowser(for: .bonjourWithTXTRecord(type: "_googlecast._tcp.", domain: nil), using: NWParameters.tcp)
        browser = b

        b.browseResultsChangedHandler = { results, _ in
            let descriptors = Set(results.compactMap { result in
                CastServiceDescriptor(from: result)
            })
            NSLog("castable: results = \(descriptors)")

            self.lastDevices = descriptors
            for ch in self.receivers {
                do {
                    try ch.awaitSend(descriptors)
                } catch {
                    NSLog("castable: failed to forward descriptor: \(error)")
                }
            }
        }

        b.start(queue: DispatchQueue.main)

        NSLog("castable: Scheduled service browser")
    }

    func receive() -> CoChannel<Set<CastServiceDescriptor>> {
        let ch = CoChannel<Set<CastServiceDescriptor>>(capacity: 1)
        receivers.append(ch)

        DispatchQueue.main.startCoroutine {
            try ch.awaitSend(self.lastDevices)
        }

        return ch
    }

    func stop() {
        NSLog("castable: Mdns STOP")

        if let browser = browser {
            NSLog("castable: close browser")
            browser.cancel()
        }

        browser = nil
    }
}

@available(OSX 10.15, *)
extension CastServiceDescriptor {
    init?(from: NWBrowser.Result) {
        if case let .bonjour(text) = from.metadata {
            if let id = text["id"] {
                self.id = id
            } else {
                NSLog("castable: No ID in \(text)")
                return nil
            }

            if let name = text["fn"] {
                self.name = name
            } else {
                NSLog("castable: No name in \(text)")
                return nil
            }

            if let model = text["md"] {
                self.model = model
            } else {
                NSLog("castable: No model in \(text)")
                return nil
            }

        } else {
            NSLog("castable: Unexpected result type: \(from.metadata) of \(from)")
            return nil
        }

        self.address = from.endpoint
    }
}
