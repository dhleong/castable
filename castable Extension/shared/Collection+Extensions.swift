//
//  Collection+Extensions.swift
//  castable
//
//  Created by Daniel Leong on 12/14/20.
//

extension Collection {
    /// Returns True if any element in this Array matches the predicate
    func any(_ predicate: (Element) -> Bool) -> Bool {
        self.firstIndex(where: predicate) != nil
    }

    /// Returns a Dictionary whose values are all the elements of this
    /// Array, associated with a key selected from the element itself.
    func associateBy<Key : Hashable>(_ selectKey: (Element) -> Key) -> [Key : Element] {
        self.reduce(into: [:]) { m, item in
            m[selectKey(item)] = item
        }
    }
}
