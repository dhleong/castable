import Foundation
import SafariServices

class Mdns {
    private class Delegate : NSObject, NetServiceBrowserDelegate {
        func netServiceBrowser(
            _ browser: NetServiceBrowser,
            didFind service: NetService,
            moreComing: Bool
        ) {
            NSLog("castable: BONJOUR Did find \(service)")
        }
    }

    private let delegate = Delegate()

    private var browser: NetServiceBrowser? = nil

    func discover() {
        if browser != nil {
            NSLog("castable: WARNING: duplicate discover() without stop()")
            return
        }

        let b = NetServiceBrowser()
        browser = b

        b.delegate = delegate
        b.searchForServices(ofType: "_googlecast._tcp.", inDomain: "")
        b.schedule(in: RunLoop.main, forMode: .common)

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
