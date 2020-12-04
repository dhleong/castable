// swift-tools-version:5.3
// The swift-tools-version declares the minimum version of Swift required to build this package.

/*
 This source file is part of the Swift.org open source project
 Copyright 2015 Apple Inc. and the Swift project authors
 Licensed under Apache License v2.0 with Runtime Library Exception
 See http://swift.org/LICENSE.txt for license information
 See http://swift.org/CONTRIBUTORS.txt for Swift project authors
*/

import PackageDescription

let package = Package(
    name: "castable Extension",
    defaultLocalization: LanguageTag("en-US"),
    products: [
        .library(name: "castable Extension", targets: ["castable Extension"]),
    ],
    targets: [
        .target(
            name: "castable Extension",
            path: "castable Extension/",
            exclude: [
                "*.ts",
                "*.pdf",
                "*.entitlements",
            ]),
    ]
)
