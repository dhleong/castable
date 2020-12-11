//
//  PopoverView.swift
//  castable Extension
//
//  Created by Daniel Leong on 12/4/20.
//

import Foundation
import SwiftUI

@available(OSX 10.15, *)
struct PopoverView: View {
    @EnvironmentObject var appState: AppState

    var body: some View {
        VStack(alignment: .leading) {
            List(appState.devices) { device in
                DeviceRowView(device: device, state: computeState(of: device))
            }
        }
    }

    private func computeState(of device: CastDevice) -> DeviceRowView.State {
        // ought to be a cleaner way...
        if appState.connectingDevice === device {
            return .connecting
        } else if appState.activeDevice === device {
            return .active
        } else {
            return .none
        }
    }
}

@available(OSX 10.15, *)
struct PopoverView_Previews: PreviewProvider {
    static var previews: some View {
        PopoverView().environmentObject(
            AppState(withDevices: [
                CastDevice(withName: "Captain's TV"),
                CastDevice(withName: "Mess Hall TV"),
            ]))
    }
}
