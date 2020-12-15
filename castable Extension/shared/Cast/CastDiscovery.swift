import Foundation
import Network
import SafariServices
import SwiftCoroutine

@available(OSX 10.15, *)
class CastDiscovery {

    private var browser: NWBrowser? = nil

    private var receivers: [CoChannel<Set<CastServiceDescriptor>>] = []
    private var lastDevices: Set<CastServiceDescriptor>? = nil

    func discover() {
        if browser != nil {
            return
        }

        let b = NWBrowser(for: .bonjourWithTXTRecord(type: "_googlecast._tcp.", domain: nil), using: NWParameters.tcp)
        browser = b

        b.browseResultsChangedHandler = { results, _ in
            let descriptors = Set(results.compactMap { result in
                CastServiceDescriptor(from: result)
            })

            if descriptors == self.lastDevices {
                // no change
                return
            }

            self.lastDevices = descriptors

            DispatchQueue.main.startCoroutine {
                for ch in self.receivers {
                    do {
                        try ch.awaitSend(descriptors)
                    } catch {
                        NSLog("castable: failed to forward descriptor: \(error)")
                    }
                }
            }
        }

        b.start(queue: DispatchQueue.main)
    }

    func receive() -> CoChannel<Set<CastServiceDescriptor>> {
        let ch = CoChannel<Set<CastServiceDescriptor>>(capacity: 1)
        receivers.append(ch)

        if let lastDevices = self.lastDevices {
            DispatchQueue.main.startCoroutine {
                try ch.awaitSend(lastDevices)
            }
        }

        return ch
    }

    func stop() {
        if let browser = browser {
            browser.cancel()
        }

        browser = nil
    }
}

fileprivate enum CapabilitiesMask: Int, CaseIterable {
    // these are guesses, based on this empirical data:
    // Chromecast:  4101:   0x01005
    // Ultra:       200709: 0x31005
    // Nest Mini:   198660: 0x30804
    // Home Mini:   198660: 0x30804
    // Google Home: 198660: 0x30804
    // Audio Group: 198692: 0x30824
    case videoOut = 0x00001
    case audioOut = 0x00004
    case audioIn =  0x00800
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

            if let caValue = text["ca"], let capabilityMask = Int(caValue) {
                // I'm *assuming* this is a "capabilities" bit mask,
                // but I could totally be wrong...
                for key in CapabilitiesMask.allCases {
                    if capabilityMask & key.rawValue != 0 {
                        capabilities.append(Capability(from: key))
                    }
                }
            }

        } else {
            NSLog("castable: Unexpected result type: \(from.metadata) of \(from)")
            return nil
        }

        self.address = from.endpoint
    }
}

fileprivate extension CastServiceDescriptor.Capability {
    init(from: CapabilitiesMask) {
        switch from {
        case .audioIn: self = .audioIn
        case .audioOut: self = .audioOut
        case .videoOut: self = .videoOut
        }
    }
}
