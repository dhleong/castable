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
    @State var count = 0

    var body: some View {
        VStack(alignment: .leading) {
            Button(action: {
                NSLog("castable: ui test")
                count += 1
            }) {
                Text("test \(count)").font(.title)
            }
        }
        .padding()
    }
}

@available(OSX 10.15, *)
struct PopoverView_Previews: PreviewProvider {
    static var previews: some View {
        PopoverView()
    }
}
