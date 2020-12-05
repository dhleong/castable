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
                Button(action: {
                   NSLog("castable: select \(device.id)")
                }) {
                    Text(device.name)
                }
            }
        }
        .padding()
    }
}

@available(OSX 10.15, *)
struct PopoverView_Previews: PreviewProvider {
    static var previews: some View {
        PopoverView().environmentObject(
            AppState(withDevices: [
                CastDevice(withName: "Family Room TV")
            ]))
    }
}
