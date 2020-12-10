//
//  castableTests.swift
//  castableTests
//
//  Created by Daniel Leong on 12/2/20.
//

import XCTest
@testable import castable

class castableTests: XCTestCase {

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testDictionaryToStruct() throws {
        struct SecretCargo {}
        struct PublicCargo: Codable { let name: String }
        let dict: [String : Any] = [
            "smuggled": SecretCargo(),
            "cargo": ["name": "wobbly-headed-geisha-dolls"],
            "name": "serenity",
            "gas": 42,
        ]

        struct Ship: Codable {
            let cargo: PublicCargo
            let name: String
            let gas: Int
        }

        let ship: Ship = try dict.parse()
        XCTAssert(ship.cargo.name == "wobbly-headed-geisha-dolls", "Safely skip non-codable values")
        XCTAssert(ship.name == "serenity")
        XCTAssert(ship.gas == 42)

    }

    func testPerformanceExample() throws {
        // This is an example of a performance test case.
        self.measure {
            // Put the code you want to measure the time of here.
        }
    }

}
