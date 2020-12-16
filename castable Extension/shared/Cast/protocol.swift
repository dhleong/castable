//
//  CastApp.swift
//  castable
//
//  Created by Daniel Leong on 12/5/20.
//

struct Namespaces {
    static let connection = "urn:x-cast:com.google.cast.tp.connection"
    static let heartbeat = "urn:x-cast:com.google.cast.tp.heartbeat"
    static let media = "urn:x-cast:com.google.cast.media"
    static let receiver = "urn:x-cast:com.google.cast.receiver"
}

struct Named: Codable {
    let name: String
}

struct ReceiverApp: Codable {
    let appId: String
    let displayName: String
    let iconUrl: String
    let isIdleScreen: Bool
    let launchedFromCloud: Bool
    let namespaces: [Named]
    let sessionId: String
    let statusText: String
    let transportId: String
}

struct ReceiverVolume: Codable {
    let controlType: String
    let level: Double
    let muted: Bool
    let stepInterval: Double
}

struct ReceiverStatus: Codable {
    let applications: [ReceiverApp]
    // let userEq: unknown,
    let volume: ReceiverVolume
}
