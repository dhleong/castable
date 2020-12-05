// DO NOT EDIT.
// swift-format-ignore-file
//
// Generated by the Swift generator plugin for the protocol buffer compiler.
// Source: cast_channel.proto
//
// For information on using the generated types, please see the documentation:
//   https://github.com/apple/swift-protobuf/

// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import Foundation
import SwiftProtobuf

// If the compiler emits an error on this type, it is because this file
// was generated by a version of the `protoc` Swift plug-in that is
// incompatible with the version of SwiftProtobuf to which you are linking.
// Please ensure that you are building against the same version of the API
// that was used to generate this file.
fileprivate struct _GeneratedWithProtocGenSwiftVersion: SwiftProtobuf.ProtobufAPIVersionCheck {
  struct _2: SwiftProtobuf.ProtobufAPIVersion_2 {}
  typealias Version = _2
}

enum CastChannel_SignatureAlgorithm: SwiftProtobuf.Enum {
  typealias RawValue = Int
  case unspecified // = 0
  case rsassaPkcs1V15 // = 1
  case rsassaPss // = 2

  init() {
    self = .unspecified
  }

  init?(rawValue: Int) {
    switch rawValue {
    case 0: self = .unspecified
    case 1: self = .rsassaPkcs1V15
    case 2: self = .rsassaPss
    default: return nil
    }
  }

  var rawValue: Int {
    switch self {
    case .unspecified: return 0
    case .rsassaPkcs1V15: return 1
    case .rsassaPss: return 2
    }
  }

}

#if swift(>=4.2)

extension CastChannel_SignatureAlgorithm: CaseIterable {
  // Support synthesized by the compiler.
}

#endif  // swift(>=4.2)

enum CastChannel_HashAlgorithm: SwiftProtobuf.Enum {
  typealias RawValue = Int
  case sha1 // = 0
  case sha256 // = 1

  init() {
    self = .sha1
  }

  init?(rawValue: Int) {
    switch rawValue {
    case 0: self = .sha1
    case 1: self = .sha256
    default: return nil
    }
  }

  var rawValue: Int {
    switch self {
    case .sha1: return 0
    case .sha256: return 1
    }
  }

}

#if swift(>=4.2)

extension CastChannel_HashAlgorithm: CaseIterable {
  // Support synthesized by the compiler.
}

#endif  // swift(>=4.2)

struct CastChannel_CastMessage {
  // SwiftProtobuf.Message conformance is added in an extension below. See the
  // `Message` and `Message+*Additions` files in the SwiftProtobuf library for
  // methods supported on all messages.

  var protocolVersion: CastChannel_CastMessage.ProtocolVersion {
    get {return _protocolVersion ?? .castv210}
    set {_protocolVersion = newValue}
  }
  /// Returns true if `protocolVersion` has been explicitly set.
  var hasProtocolVersion: Bool {return self._protocolVersion != nil}
  /// Clears the value of `protocolVersion`. Subsequent reads from it will return its default value.
  mutating func clearProtocolVersion() {self._protocolVersion = nil}

  /// source and destination ids identify the origin and destination of the
  /// message.  They are used to route messages between endpoints that share a
  /// device-to-device channel.
  ///
  /// For messages between applications:
  ///   - The sender application id is a unique identifier generated on behalf of
  ///     the sender application.
  ///   - The receiver id is always the the session id for the application.
  ///
  /// For messages to or from the sender or receiver platform, the special ids
  /// 'sender-0' and 'receiver-0' can be used.
  ///
  /// For messages intended for all endpoints using a given channel, the
  /// wildcard destination_id '*' can be used.
  var sourceID: String {
    get {return _sourceID ?? String()}
    set {_sourceID = newValue}
  }
  /// Returns true if `sourceID` has been explicitly set.
  var hasSourceID: Bool {return self._sourceID != nil}
  /// Clears the value of `sourceID`. Subsequent reads from it will return its default value.
  mutating func clearSourceID() {self._sourceID = nil}

  var destinationID: String {
    get {return _destinationID ?? String()}
    set {_destinationID = newValue}
  }
  /// Returns true if `destinationID` has been explicitly set.
  var hasDestinationID: Bool {return self._destinationID != nil}
  /// Clears the value of `destinationID`. Subsequent reads from it will return its default value.
  mutating func clearDestinationID() {self._destinationID = nil}

  /// This is the core multiplexing key.  All messages are sent on a namespace
  /// and endpoints sharing a channel listen on one or more namespaces.  The
  /// namespace defines the protocol and semantics of the message.
  var namespace: String {
    get {return _namespace ?? String()}
    set {_namespace = newValue}
  }
  /// Returns true if `namespace` has been explicitly set.
  var hasNamespace: Bool {return self._namespace != nil}
  /// Clears the value of `namespace`. Subsequent reads from it will return its default value.
  mutating func clearNamespace() {self._namespace = nil}

  var payloadType: CastChannel_CastMessage.PayloadType {
    get {return _payloadType ?? .string}
    set {_payloadType = newValue}
  }
  /// Returns true if `payloadType` has been explicitly set.
  var hasPayloadType: Bool {return self._payloadType != nil}
  /// Clears the value of `payloadType`. Subsequent reads from it will return its default value.
  mutating func clearPayloadType() {self._payloadType = nil}

  /// Depending on payload_type, exactly one of the following optional fields
  /// will always be set.
  var payloadUtf8: String {
    get {return _payloadUtf8 ?? String()}
    set {_payloadUtf8 = newValue}
  }
  /// Returns true if `payloadUtf8` has been explicitly set.
  var hasPayloadUtf8: Bool {return self._payloadUtf8 != nil}
  /// Clears the value of `payloadUtf8`. Subsequent reads from it will return its default value.
  mutating func clearPayloadUtf8() {self._payloadUtf8 = nil}

  var payloadBinary: Data {
    get {return _payloadBinary ?? Data()}
    set {_payloadBinary = newValue}
  }
  /// Returns true if `payloadBinary` has been explicitly set.
  var hasPayloadBinary: Bool {return self._payloadBinary != nil}
  /// Clears the value of `payloadBinary`. Subsequent reads from it will return its default value.
  mutating func clearPayloadBinary() {self._payloadBinary = nil}

  var unknownFields = SwiftProtobuf.UnknownStorage()

  /// Always pass a version of the protocol for future compatibility
  /// requirements.
  enum ProtocolVersion: SwiftProtobuf.Enum {
    typealias RawValue = Int
    case castv210 // = 0

    init() {
      self = .castv210
    }

    init?(rawValue: Int) {
      switch rawValue {
      case 0: self = .castv210
      default: return nil
      }
    }

    var rawValue: Int {
      switch self {
      case .castv210: return 0
      }
    }

  }

  /// What type of data do we have in this message.
  enum PayloadType: SwiftProtobuf.Enum {
    typealias RawValue = Int
    case string // = 0
    case binary // = 1

    init() {
      self = .string
    }

    init?(rawValue: Int) {
      switch rawValue {
      case 0: self = .string
      case 1: self = .binary
      default: return nil
      }
    }

    var rawValue: Int {
      switch self {
      case .string: return 0
      case .binary: return 1
      }
    }

  }

  init() {}

  fileprivate var _protocolVersion: CastChannel_CastMessage.ProtocolVersion? = nil
  fileprivate var _sourceID: String? = nil
  fileprivate var _destinationID: String? = nil
  fileprivate var _namespace: String? = nil
  fileprivate var _payloadType: CastChannel_CastMessage.PayloadType? = nil
  fileprivate var _payloadUtf8: String? = nil
  fileprivate var _payloadBinary: Data? = nil
}

#if swift(>=4.2)

extension CastChannel_CastMessage.ProtocolVersion: CaseIterable {
  // Support synthesized by the compiler.
}

extension CastChannel_CastMessage.PayloadType: CaseIterable {
  // Support synthesized by the compiler.
}

#endif  // swift(>=4.2)

/// Messages for authentication protocol between a sender and a receiver.
struct CastChannel_AuthChallenge {
  // SwiftProtobuf.Message conformance is added in an extension below. See the
  // `Message` and `Message+*Additions` files in the SwiftProtobuf library for
  // methods supported on all messages.

  var signatureAlgorithm: CastChannel_SignatureAlgorithm {
    get {return _signatureAlgorithm ?? .rsassaPkcs1V15}
    set {_signatureAlgorithm = newValue}
  }
  /// Returns true if `signatureAlgorithm` has been explicitly set.
  var hasSignatureAlgorithm: Bool {return self._signatureAlgorithm != nil}
  /// Clears the value of `signatureAlgorithm`. Subsequent reads from it will return its default value.
  mutating func clearSignatureAlgorithm() {self._signatureAlgorithm = nil}

  var senderNonce: Data {
    get {return _senderNonce ?? Data()}
    set {_senderNonce = newValue}
  }
  /// Returns true if `senderNonce` has been explicitly set.
  var hasSenderNonce: Bool {return self._senderNonce != nil}
  /// Clears the value of `senderNonce`. Subsequent reads from it will return its default value.
  mutating func clearSenderNonce() {self._senderNonce = nil}

  var hashAlgorithm: CastChannel_HashAlgorithm {
    get {return _hashAlgorithm ?? .sha1}
    set {_hashAlgorithm = newValue}
  }
  /// Returns true if `hashAlgorithm` has been explicitly set.
  var hasHashAlgorithm: Bool {return self._hashAlgorithm != nil}
  /// Clears the value of `hashAlgorithm`. Subsequent reads from it will return its default value.
  mutating func clearHashAlgorithm() {self._hashAlgorithm = nil}

  var unknownFields = SwiftProtobuf.UnknownStorage()

  init() {}

  fileprivate var _signatureAlgorithm: CastChannel_SignatureAlgorithm? = nil
  fileprivate var _senderNonce: Data? = nil
  fileprivate var _hashAlgorithm: CastChannel_HashAlgorithm? = nil
}

struct CastChannel_AuthResponse {
  // SwiftProtobuf.Message conformance is added in an extension below. See the
  // `Message` and `Message+*Additions` files in the SwiftProtobuf library for
  // methods supported on all messages.

  var signature: Data {
    get {return _signature ?? Data()}
    set {_signature = newValue}
  }
  /// Returns true if `signature` has been explicitly set.
  var hasSignature: Bool {return self._signature != nil}
  /// Clears the value of `signature`. Subsequent reads from it will return its default value.
  mutating func clearSignature() {self._signature = nil}

  var clientAuthCertificate: Data {
    get {return _clientAuthCertificate ?? Data()}
    set {_clientAuthCertificate = newValue}
  }
  /// Returns true if `clientAuthCertificate` has been explicitly set.
  var hasClientAuthCertificate: Bool {return self._clientAuthCertificate != nil}
  /// Clears the value of `clientAuthCertificate`. Subsequent reads from it will return its default value.
  mutating func clearClientAuthCertificate() {self._clientAuthCertificate = nil}

  var intermediateCertificate: [Data] = []

  var signatureAlgorithm: CastChannel_SignatureAlgorithm {
    get {return _signatureAlgorithm ?? .rsassaPkcs1V15}
    set {_signatureAlgorithm = newValue}
  }
  /// Returns true if `signatureAlgorithm` has been explicitly set.
  var hasSignatureAlgorithm: Bool {return self._signatureAlgorithm != nil}
  /// Clears the value of `signatureAlgorithm`. Subsequent reads from it will return its default value.
  mutating func clearSignatureAlgorithm() {self._signatureAlgorithm = nil}

  var senderNonce: Data {
    get {return _senderNonce ?? Data()}
    set {_senderNonce = newValue}
  }
  /// Returns true if `senderNonce` has been explicitly set.
  var hasSenderNonce: Bool {return self._senderNonce != nil}
  /// Clears the value of `senderNonce`. Subsequent reads from it will return its default value.
  mutating func clearSenderNonce() {self._senderNonce = nil}

  var hashAlgorithm: CastChannel_HashAlgorithm {
    get {return _hashAlgorithm ?? .sha1}
    set {_hashAlgorithm = newValue}
  }
  /// Returns true if `hashAlgorithm` has been explicitly set.
  var hasHashAlgorithm: Bool {return self._hashAlgorithm != nil}
  /// Clears the value of `hashAlgorithm`. Subsequent reads from it will return its default value.
  mutating func clearHashAlgorithm() {self._hashAlgorithm = nil}

  var crl: Data {
    get {return _crl ?? Data()}
    set {_crl = newValue}
  }
  /// Returns true if `crl` has been explicitly set.
  var hasCrl: Bool {return self._crl != nil}
  /// Clears the value of `crl`. Subsequent reads from it will return its default value.
  mutating func clearCrl() {self._crl = nil}

  var unknownFields = SwiftProtobuf.UnknownStorage()

  init() {}

  fileprivate var _signature: Data? = nil
  fileprivate var _clientAuthCertificate: Data? = nil
  fileprivate var _signatureAlgorithm: CastChannel_SignatureAlgorithm? = nil
  fileprivate var _senderNonce: Data? = nil
  fileprivate var _hashAlgorithm: CastChannel_HashAlgorithm? = nil
  fileprivate var _crl: Data? = nil
}

struct CastChannel_AuthError {
  // SwiftProtobuf.Message conformance is added in an extension below. See the
  // `Message` and `Message+*Additions` files in the SwiftProtobuf library for
  // methods supported on all messages.

  var errorType: CastChannel_AuthError.ErrorType {
    get {return _errorType ?? .internalError}
    set {_errorType = newValue}
  }
  /// Returns true if `errorType` has been explicitly set.
  var hasErrorType: Bool {return self._errorType != nil}
  /// Clears the value of `errorType`. Subsequent reads from it will return its default value.
  mutating func clearErrorType() {self._errorType = nil}

  var unknownFields = SwiftProtobuf.UnknownStorage()

  enum ErrorType: SwiftProtobuf.Enum {
    typealias RawValue = Int
    case internalError // = 0

    /// The underlying connection is not TLS
    case noTls // = 1
    case signatureAlgorithmUnavailable // = 2

    init() {
      self = .internalError
    }

    init?(rawValue: Int) {
      switch rawValue {
      case 0: self = .internalError
      case 1: self = .noTls
      case 2: self = .signatureAlgorithmUnavailable
      default: return nil
      }
    }

    var rawValue: Int {
      switch self {
      case .internalError: return 0
      case .noTls: return 1
      case .signatureAlgorithmUnavailable: return 2
      }
    }

  }

  init() {}

  fileprivate var _errorType: CastChannel_AuthError.ErrorType? = nil
}

#if swift(>=4.2)

extension CastChannel_AuthError.ErrorType: CaseIterable {
  // Support synthesized by the compiler.
}

#endif  // swift(>=4.2)

struct CastChannel_DeviceAuthMessage {
  // SwiftProtobuf.Message conformance is added in an extension below. See the
  // `Message` and `Message+*Additions` files in the SwiftProtobuf library for
  // methods supported on all messages.

  /// Request fields
  var challenge: CastChannel_AuthChallenge {
    get {return _challenge ?? CastChannel_AuthChallenge()}
    set {_challenge = newValue}
  }
  /// Returns true if `challenge` has been explicitly set.
  var hasChallenge: Bool {return self._challenge != nil}
  /// Clears the value of `challenge`. Subsequent reads from it will return its default value.
  mutating func clearChallenge() {self._challenge = nil}

  /// Response fields
  var response: CastChannel_AuthResponse {
    get {return _response ?? CastChannel_AuthResponse()}
    set {_response = newValue}
  }
  /// Returns true if `response` has been explicitly set.
  var hasResponse: Bool {return self._response != nil}
  /// Clears the value of `response`. Subsequent reads from it will return its default value.
  mutating func clearResponse() {self._response = nil}

  var error: CastChannel_AuthError {
    get {return _error ?? CastChannel_AuthError()}
    set {_error = newValue}
  }
  /// Returns true if `error` has been explicitly set.
  var hasError: Bool {return self._error != nil}
  /// Clears the value of `error`. Subsequent reads from it will return its default value.
  mutating func clearError() {self._error = nil}

  var unknownFields = SwiftProtobuf.UnknownStorage()

  init() {}

  fileprivate var _challenge: CastChannel_AuthChallenge? = nil
  fileprivate var _response: CastChannel_AuthResponse? = nil
  fileprivate var _error: CastChannel_AuthError? = nil
}

// MARK: - Code below here is support for the SwiftProtobuf runtime.

fileprivate let _protobuf_package = "cast_channel"

extension CastChannel_SignatureAlgorithm: SwiftProtobuf._ProtoNameProviding {
  static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    0: .same(proto: "UNSPECIFIED"),
    1: .same(proto: "RSASSA_PKCS1v15"),
    2: .same(proto: "RSASSA_PSS"),
  ]
}

extension CastChannel_HashAlgorithm: SwiftProtobuf._ProtoNameProviding {
  static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    0: .same(proto: "SHA1"),
    1: .same(proto: "SHA256"),
  ]
}

extension CastChannel_CastMessage: SwiftProtobuf.Message, SwiftProtobuf._MessageImplementationBase, SwiftProtobuf._ProtoNameProviding {
  static let protoMessageName: String = _protobuf_package + ".CastMessage"
  static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    1: .standard(proto: "protocol_version"),
    2: .standard(proto: "source_id"),
    3: .standard(proto: "destination_id"),
    4: .same(proto: "namespace"),
    5: .standard(proto: "payload_type"),
    6: .standard(proto: "payload_utf8"),
    7: .standard(proto: "payload_binary"),
  ]

  public var isInitialized: Bool {
    if self._protocolVersion == nil {return false}
    if self._sourceID == nil {return false}
    if self._destinationID == nil {return false}
    if self._namespace == nil {return false}
    if self._payloadType == nil {return false}
    return true
  }

  mutating func decodeMessage<D: SwiftProtobuf.Decoder>(decoder: inout D) throws {
    while let fieldNumber = try decoder.nextFieldNumber() {
      // The use of inline closures is to circumvent an issue where the compiler
      // allocates stack space for every case branch when no optimizations are
      // enabled. https://github.com/apple/swift-protobuf/issues/1034
      switch fieldNumber {
      case 1: try { try decoder.decodeSingularEnumField(value: &self._protocolVersion) }()
      case 2: try { try decoder.decodeSingularStringField(value: &self._sourceID) }()
      case 3: try { try decoder.decodeSingularStringField(value: &self._destinationID) }()
      case 4: try { try decoder.decodeSingularStringField(value: &self._namespace) }()
      case 5: try { try decoder.decodeSingularEnumField(value: &self._payloadType) }()
      case 6: try { try decoder.decodeSingularStringField(value: &self._payloadUtf8) }()
      case 7: try { try decoder.decodeSingularBytesField(value: &self._payloadBinary) }()
      default: break
      }
    }
  }

  func traverse<V: SwiftProtobuf.Visitor>(visitor: inout V) throws {
    if let v = self._protocolVersion {
      try visitor.visitSingularEnumField(value: v, fieldNumber: 1)
    }
    if let v = self._sourceID {
      try visitor.visitSingularStringField(value: v, fieldNumber: 2)
    }
    if let v = self._destinationID {
      try visitor.visitSingularStringField(value: v, fieldNumber: 3)
    }
    if let v = self._namespace {
      try visitor.visitSingularStringField(value: v, fieldNumber: 4)
    }
    if let v = self._payloadType {
      try visitor.visitSingularEnumField(value: v, fieldNumber: 5)
    }
    if let v = self._payloadUtf8 {
      try visitor.visitSingularStringField(value: v, fieldNumber: 6)
    }
    if let v = self._payloadBinary {
      try visitor.visitSingularBytesField(value: v, fieldNumber: 7)
    }
    try unknownFields.traverse(visitor: &visitor)
  }

  static func ==(lhs: CastChannel_CastMessage, rhs: CastChannel_CastMessage) -> Bool {
    if lhs._protocolVersion != rhs._protocolVersion {return false}
    if lhs._sourceID != rhs._sourceID {return false}
    if lhs._destinationID != rhs._destinationID {return false}
    if lhs._namespace != rhs._namespace {return false}
    if lhs._payloadType != rhs._payloadType {return false}
    if lhs._payloadUtf8 != rhs._payloadUtf8 {return false}
    if lhs._payloadBinary != rhs._payloadBinary {return false}
    if lhs.unknownFields != rhs.unknownFields {return false}
    return true
  }
}

extension CastChannel_CastMessage.ProtocolVersion: SwiftProtobuf._ProtoNameProviding {
  static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    0: .same(proto: "CASTV2_1_0"),
  ]
}

extension CastChannel_CastMessage.PayloadType: SwiftProtobuf._ProtoNameProviding {
  static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    0: .same(proto: "STRING"),
    1: .same(proto: "BINARY"),
  ]
}

extension CastChannel_AuthChallenge: SwiftProtobuf.Message, SwiftProtobuf._MessageImplementationBase, SwiftProtobuf._ProtoNameProviding {
  static let protoMessageName: String = _protobuf_package + ".AuthChallenge"
  static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    1: .standard(proto: "signature_algorithm"),
    2: .standard(proto: "sender_nonce"),
    3: .standard(proto: "hash_algorithm"),
  ]

  mutating func decodeMessage<D: SwiftProtobuf.Decoder>(decoder: inout D) throws {
    while let fieldNumber = try decoder.nextFieldNumber() {
      // The use of inline closures is to circumvent an issue where the compiler
      // allocates stack space for every case branch when no optimizations are
      // enabled. https://github.com/apple/swift-protobuf/issues/1034
      switch fieldNumber {
      case 1: try { try decoder.decodeSingularEnumField(value: &self._signatureAlgorithm) }()
      case 2: try { try decoder.decodeSingularBytesField(value: &self._senderNonce) }()
      case 3: try { try decoder.decodeSingularEnumField(value: &self._hashAlgorithm) }()
      default: break
      }
    }
  }

  func traverse<V: SwiftProtobuf.Visitor>(visitor: inout V) throws {
    if let v = self._signatureAlgorithm {
      try visitor.visitSingularEnumField(value: v, fieldNumber: 1)
    }
    if let v = self._senderNonce {
      try visitor.visitSingularBytesField(value: v, fieldNumber: 2)
    }
    if let v = self._hashAlgorithm {
      try visitor.visitSingularEnumField(value: v, fieldNumber: 3)
    }
    try unknownFields.traverse(visitor: &visitor)
  }

  static func ==(lhs: CastChannel_AuthChallenge, rhs: CastChannel_AuthChallenge) -> Bool {
    if lhs._signatureAlgorithm != rhs._signatureAlgorithm {return false}
    if lhs._senderNonce != rhs._senderNonce {return false}
    if lhs._hashAlgorithm != rhs._hashAlgorithm {return false}
    if lhs.unknownFields != rhs.unknownFields {return false}
    return true
  }
}

extension CastChannel_AuthResponse: SwiftProtobuf.Message, SwiftProtobuf._MessageImplementationBase, SwiftProtobuf._ProtoNameProviding {
  static let protoMessageName: String = _protobuf_package + ".AuthResponse"
  static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    1: .same(proto: "signature"),
    2: .standard(proto: "client_auth_certificate"),
    3: .standard(proto: "intermediate_certificate"),
    4: .standard(proto: "signature_algorithm"),
    5: .standard(proto: "sender_nonce"),
    6: .standard(proto: "hash_algorithm"),
    7: .same(proto: "crl"),
  ]

  public var isInitialized: Bool {
    if self._signature == nil {return false}
    if self._clientAuthCertificate == nil {return false}
    return true
  }

  mutating func decodeMessage<D: SwiftProtobuf.Decoder>(decoder: inout D) throws {
    while let fieldNumber = try decoder.nextFieldNumber() {
      // The use of inline closures is to circumvent an issue where the compiler
      // allocates stack space for every case branch when no optimizations are
      // enabled. https://github.com/apple/swift-protobuf/issues/1034
      switch fieldNumber {
      case 1: try { try decoder.decodeSingularBytesField(value: &self._signature) }()
      case 2: try { try decoder.decodeSingularBytesField(value: &self._clientAuthCertificate) }()
      case 3: try { try decoder.decodeRepeatedBytesField(value: &self.intermediateCertificate) }()
      case 4: try { try decoder.decodeSingularEnumField(value: &self._signatureAlgorithm) }()
      case 5: try { try decoder.decodeSingularBytesField(value: &self._senderNonce) }()
      case 6: try { try decoder.decodeSingularEnumField(value: &self._hashAlgorithm) }()
      case 7: try { try decoder.decodeSingularBytesField(value: &self._crl) }()
      default: break
      }
    }
  }

  func traverse<V: SwiftProtobuf.Visitor>(visitor: inout V) throws {
    if let v = self._signature {
      try visitor.visitSingularBytesField(value: v, fieldNumber: 1)
    }
    if let v = self._clientAuthCertificate {
      try visitor.visitSingularBytesField(value: v, fieldNumber: 2)
    }
    if !self.intermediateCertificate.isEmpty {
      try visitor.visitRepeatedBytesField(value: self.intermediateCertificate, fieldNumber: 3)
    }
    if let v = self._signatureAlgorithm {
      try visitor.visitSingularEnumField(value: v, fieldNumber: 4)
    }
    if let v = self._senderNonce {
      try visitor.visitSingularBytesField(value: v, fieldNumber: 5)
    }
    if let v = self._hashAlgorithm {
      try visitor.visitSingularEnumField(value: v, fieldNumber: 6)
    }
    if let v = self._crl {
      try visitor.visitSingularBytesField(value: v, fieldNumber: 7)
    }
    try unknownFields.traverse(visitor: &visitor)
  }

  static func ==(lhs: CastChannel_AuthResponse, rhs: CastChannel_AuthResponse) -> Bool {
    if lhs._signature != rhs._signature {return false}
    if lhs._clientAuthCertificate != rhs._clientAuthCertificate {return false}
    if lhs.intermediateCertificate != rhs.intermediateCertificate {return false}
    if lhs._signatureAlgorithm != rhs._signatureAlgorithm {return false}
    if lhs._senderNonce != rhs._senderNonce {return false}
    if lhs._hashAlgorithm != rhs._hashAlgorithm {return false}
    if lhs._crl != rhs._crl {return false}
    if lhs.unknownFields != rhs.unknownFields {return false}
    return true
  }
}

extension CastChannel_AuthError: SwiftProtobuf.Message, SwiftProtobuf._MessageImplementationBase, SwiftProtobuf._ProtoNameProviding {
  static let protoMessageName: String = _protobuf_package + ".AuthError"
  static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    1: .standard(proto: "error_type"),
  ]

  public var isInitialized: Bool {
    if self._errorType == nil {return false}
    return true
  }

  mutating func decodeMessage<D: SwiftProtobuf.Decoder>(decoder: inout D) throws {
    while let fieldNumber = try decoder.nextFieldNumber() {
      // The use of inline closures is to circumvent an issue where the compiler
      // allocates stack space for every case branch when no optimizations are
      // enabled. https://github.com/apple/swift-protobuf/issues/1034
      switch fieldNumber {
      case 1: try { try decoder.decodeSingularEnumField(value: &self._errorType) }()
      default: break
      }
    }
  }

  func traverse<V: SwiftProtobuf.Visitor>(visitor: inout V) throws {
    if let v = self._errorType {
      try visitor.visitSingularEnumField(value: v, fieldNumber: 1)
    }
    try unknownFields.traverse(visitor: &visitor)
  }

  static func ==(lhs: CastChannel_AuthError, rhs: CastChannel_AuthError) -> Bool {
    if lhs._errorType != rhs._errorType {return false}
    if lhs.unknownFields != rhs.unknownFields {return false}
    return true
  }
}

extension CastChannel_AuthError.ErrorType: SwiftProtobuf._ProtoNameProviding {
  static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    0: .same(proto: "INTERNAL_ERROR"),
    1: .same(proto: "NO_TLS"),
    2: .same(proto: "SIGNATURE_ALGORITHM_UNAVAILABLE"),
  ]
}

extension CastChannel_DeviceAuthMessage: SwiftProtobuf.Message, SwiftProtobuf._MessageImplementationBase, SwiftProtobuf._ProtoNameProviding {
  static let protoMessageName: String = _protobuf_package + ".DeviceAuthMessage"
  static let _protobuf_nameMap: SwiftProtobuf._NameMap = [
    1: .same(proto: "challenge"),
    2: .same(proto: "response"),
    3: .same(proto: "error"),
  ]

  public var isInitialized: Bool {
    if let v = self._response, !v.isInitialized {return false}
    if let v = self._error, !v.isInitialized {return false}
    return true
  }

  mutating func decodeMessage<D: SwiftProtobuf.Decoder>(decoder: inout D) throws {
    while let fieldNumber = try decoder.nextFieldNumber() {
      // The use of inline closures is to circumvent an issue where the compiler
      // allocates stack space for every case branch when no optimizations are
      // enabled. https://github.com/apple/swift-protobuf/issues/1034
      switch fieldNumber {
      case 1: try { try decoder.decodeSingularMessageField(value: &self._challenge) }()
      case 2: try { try decoder.decodeSingularMessageField(value: &self._response) }()
      case 3: try { try decoder.decodeSingularMessageField(value: &self._error) }()
      default: break
      }
    }
  }

  func traverse<V: SwiftProtobuf.Visitor>(visitor: inout V) throws {
    if let v = self._challenge {
      try visitor.visitSingularMessageField(value: v, fieldNumber: 1)
    }
    if let v = self._response {
      try visitor.visitSingularMessageField(value: v, fieldNumber: 2)
    }
    if let v = self._error {
      try visitor.visitSingularMessageField(value: v, fieldNumber: 3)
    }
    try unknownFields.traverse(visitor: &visitor)
  }

  static func ==(lhs: CastChannel_DeviceAuthMessage, rhs: CastChannel_DeviceAuthMessage) -> Bool {
    if lhs._challenge != rhs._challenge {return false}
    if lhs._response != rhs._response {return false}
    if lhs._error != rhs._error {return false}
    if lhs.unknownFields != rhs.unknownFields {return false}
    return true
  }
}
