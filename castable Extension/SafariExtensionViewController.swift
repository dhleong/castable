//
//  SafariExtensionViewController.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/2/20.
//

import SafariServices
import SwiftUI

class SafariExtensionViewController: SFSafariExtensionViewController {

    static let shared: SafariExtensionViewController = {
        let shared = SafariExtensionViewController()
        shared.view = NSHostingView(rootView: PopoverView().environmentObject(AppState.instance))
        shared.preferredContentSize = NSSize(width: 320, height: 240)
        return shared
    }()

}
