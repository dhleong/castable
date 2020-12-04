import Foundation
import SafariServices

class CastDiscovery {
    private class BrowserDelegate : NSObject, NetServiceBrowserDelegate, NetServiceDelegate {

        private var resolving: [NetService] = []

        func netServiceBrowser(
            _ browser: NetServiceBrowser,
            didFind service: NetService,
            moreComing: Bool
        ) {
            // start trying to resolve, because somehow we don't
            // have the remote address yet (?!)
            resolving.append(service)
            NSLog("castable: BONJOUR didFind (more=\(moreComing)) \(service) -> \(resolving.count)")

            service.delegate = self
            service.resolve(withTimeout: 5)
        }

        func netServiceDidResolveAddress(_ sender: NetService) {
            let service = sender

            guard let addresses = service.addresses, !addresses.isEmpty else {
                NSLog("castable: no addresses")
                return
            }

            guard let data = service.txtRecordData() else {
                NSLog("castable: no text")
                return
            }
            let txt = NetService.dictionary(fromTXTRecord: data)

            guard let nameData = txt["fn"] else {
                NSLog("castable: no name")
                return
            }

            guard let modelData = txt["md"] else {
                NSLog("castable: no model")
                return
            }

            service.remove(from: RunLoop.main, forMode: .common)
            service.stop()

            if let index = resolving.firstIndex(of: service) {
                resolving.remove(at: index)
            }

            // TODO provide this... somewhere
            let desc = CastServiceDescriptor(
                name: String(decoding: nameData, as: UTF8.self),
                address: addresses[0],
                model: String(decoding: modelData, as: UTF8.self)
            )
            NSLog("castable: RESOLVED \(desc)")
        }

    }

    private let browserDelegate = BrowserDelegate()

    private var browser: NetServiceBrowser? = nil

    func discover() {
        if browser != nil {
            NSLog("castable: WARNING: duplicate discover() without stop()")
            return
        }

        let b = NetServiceBrowser()
        browser = b

        b.delegate = browserDelegate
        b.searchForServices(ofType: "_googlecast._tcp.", inDomain: "")

        NSLog("castable: Scheduled service browser")
    }

    func stop() {
        NSLog("castable: Mdns STOP")

        if let browser = browser {
            NSLog("castable: close browser")
            browser.stop()
        }

        browser = nil
    }
}
