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
        let dict: [String : Any] = [
            "smuggled": SecretCargo(),
            "cargo": "wobbly-headed-geisha-dolls",
            "gas": 42,
        ]

        struct Ship: Codable {
            let cargo: String
            let gas: Int
        }

        let ship: Ship = try dict.parse()
        XCTAssert(ship.cargo == "wobbly-headed-geisha-dolls", "Safely skip non-codable values")
        XCTAssert(ship.gas == 42, "Safely skip non-codable values")

    }

    func testPerformanceExample() throws {
        // This is an example of a performance test case.
        self.measure {
            // Put the code you want to measure the time of here.
        }
    }

}
