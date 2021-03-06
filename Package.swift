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
    platforms: [
        .macOS(.v10_15),
    ],
    products: [
        .library(name: "castable Extension", targets: ["castable Extension"]),
    ],

    dependencies: [
        .package(url: "https://github.com/belozierov/SwiftCoroutine", from: "2.1.9"),
        .package(
            name: "SwiftProtobuf",
            url: "https://github.com/apple/swift-protobuf.git",
            from: "1.14.0"
        ),
    ],

    targets: [
        .target(
            name: "castable Extension",
            dependencies: [
                "SwiftCoroutine",
                "SwiftProtobuf",
            ],
            path: "castable Extension/",
            exclude: [
                "ts/"
            ]),
    ]
)
