//
//  DeviceRowView.swift
//  castable
//
//  Created by Daniel Leong on 12/11/20.
//

import Foundation
import SwiftUI

@available(OSX 10.15, *)
struct DeviceRowView: View {
    enum State {
        case none, connecting, active
    }
    var device: CastDevice
    var state: State

    var body: some View {
        HStack {
            Button(device.name) {
               NSLog("castable: select \(device.id)")
                AppState.instance.notifyDeviceSelected(device: device)
            }.padding(4)

            switch state {
            case .active:
                Button(action: {

                }, label: {
                    if #available(OSX 11.0, *) {
                        Image(systemName: "stop.circle")
                    } else {
                        // TODO ?
                    }
                })

            case .connecting:
                if #available(OSX 11.0, *) {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle())
                        .scaleEffect(0.5, anchor: .center)

                } else {
                    // Fallback on earlier versions
                }

            case .none:
                Text(verbatim: "") // cannot have "break" so...
            }
        }
    }
    
}

@available(OSX 10.15, *)
struct DeviceRowView_Previews: PreviewProvider {
    static var previews: some View {
        VStack(alignment: .leading) {
            DeviceRowView(device: CastDevice(withName: "Captain's TV"), state: .none)
            DeviceRowView(device: CastDevice(withName: "Jayne's Brain"), state: .connecting)
            DeviceRowView(device: CastDevice(withName: "Mess Hall TV"), state: .active)
        }
    }
}
