import Foundation
import Network
import SafariServices

@available(OSX 10.15, *)
class CastDiscovery {

    private var browser: NWBrowser? = nil

    func discover() {
        if browser != nil {
            NSLog("castable: WARNING: duplicate discover() without stop()")
            return
        }

        let b = NWBrowser(for: .bonjourWithTXTRecord(type: "_googlecast._tcp.", domain: nil), using: NWParameters.tcp)
        browser = b

        b.browseResultsChangedHandler = { results, _ in
            let descriptors = results.compactMap { result in
                CastServiceDescriptor(from: result)
            }
            NSLog("castable: results = \(descriptors)")

            // TODO emit on channel or something

            // FIXME this is gross; some sort of observer should
            // be responsible for this, perhaps over a coroutine channel?
            let state = AppState.instance
            state.devices = descriptors.map { CastDevice(withDescriptor: $0) }

            // FIXME STOPSHIP testing only:
            if let desc = descriptors.first {
                NSLog("castable: open socket")
                let socket = CastSocket(withAddress: desc.address)
                socket.open()
            }
        }

        b.start(queue: DispatchQueue.main)

        NSLog("castable: Scheduled service browser")
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
