/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function eventListener() {
      if (errorListener !== undefined) {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };
    var errorListener;

    // Adding an error listener is not optional because
    // if an error is thrown on an event emitter we cannot
    // guarantee that the actual event we are waiting will
    // be fired. The result could be a silent way to create
    // memory or file descriptor leaks, which is something
    // we should avoid.
    if (name !== 'error') {
      errorListener = function errorListener(err) {
        emitter.removeListener(name, eventListener);
        reject(err);
      };

      emitter.once('error', errorListener);
    }

    emitter.once(name, eventListener);
  });
}


/***/ }),

/***/ "./castable Extension/ts/cast.framework/cast-context.ts":
/*!**************************************************************!*\
  !*** ./castable Extension/ts/cast.framework/cast-context.ts ***!
  \**************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:17-21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CastContext = void 0;
const events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
const log_1 = __webpack_require__(/*! ../log */ "./castable Extension/ts/log.ts");
const enums_1 = __webpack_require__(/*! ../chrome.cast/enums */ "./castable Extension/ts/chrome.cast/enums.ts");
const enums_2 = __webpack_require__(/*! ./enums */ "./castable Extension/ts/cast.framework/enums.ts");
class CastContext {
    constructor(io) {
        this.io = io;
        this.events = new events_1.EventEmitter();
        this.castState = enums_2.CastState.NOT_CONNECTED;
        this.sessionState = enums_2.SessionState.NO_SESSION;
    }
    addEventListener(event, handler) {
        log_1.log("CastContext.addEventListener", event, handler);
        this.events.on(event, handler);
    }
    endCurrentSession(stopCasting) {
        return __awaiter(this, void 0, void 0, function* () {
            log_1.log("CastContext.endCurrentSession", stopCasting);
            this.setCastState(enums_2.CastState.NOT_CONNECTED);
            this.setSessionState(enums_2.SessionState.SESSION_ENDING);
            try {
                yield this.io.endCurrentSession({ stopCasting });
            }
            catch (e) {
                log_1.log("CastContext.endCurrentSession ERROR: ", e);
            }
            finally {
                this.setCastState(enums_2.CastState.NOT_CONNECTED);
                this.setSessionState(enums_2.SessionState.SESSION_ENDED);
                this.setSessionState(enums_2.SessionState.NO_SESSION);
            }
        });
    }
    getCastState() {
        log_1.log("CastContext.getCastState <- ", this.castState);
        return this.castState;
    }
    getCurrentSession() {
        log_1.log("CastContext.getCurrentSession");
        // TODO
        return null;
    }
    getSessionState() {
        log_1.log("CastContext.getSessionState <- ", this.sessionState);
        return this.sessionState;
    }
    removeEventListener(event, handler) {
        log_1.log("CastContext.removeEventListener", event, handler);
        this.events.off(event, handler);
    }
    requestSession() {
        return __awaiter(this, void 0, void 0, function* () {
            log_1.log("CastContext.requestSession");
            try {
                this.setCastState(enums_2.CastState.CONNECTING);
                this.setSessionState(enums_2.SessionState.SESSION_STARTING);
                const result = yield this.io.requestSession(this.options);
                log_1.log("requestSession -> ", result);
                this.setCastState(enums_2.CastState.CONNECTED);
                this.setSessionState(enums_2.SessionState.SESSION_STARTED);
                return null;
            }
            catch (e) {
                this.setSessionState(enums_2.SessionState.SESSION_START_FAILED);
                this.setSessionState(enums_2.SessionState.NO_SESSION);
                log_1.log("requestSession ERROR: ", e);
                if (e.id === "cancelled") {
                    this.setCastState(enums_2.CastState.NO_DEVICES_AVAILABLE);
                    return enums_1.ErrorCode.CANCEL;
                }
                this.setCastState(enums_2.CastState.NOT_CONNECTED);
                return enums_1.ErrorCode.SESSION_ERROR;
            }
        });
    }
    setLaunchCredentialsData(data) {
        log_1.log("CastContext.setLaunchCredentialsData", data);
    }
    setOptions(opts) {
        log_1.log("CastContext.setOptions", opts);
        this.options = opts;
    }
    setCastState(newState) {
        if (this.castState !== newState) {
            this.castState = newState;
            this.emit(enums_2.CastContextEventType.CAST_STATE_CHANGED, newState);
        }
    }
    setSessionState(newState) {
        if (this.sessionState !== newState) {
            this.sessionState = newState;
            this.emit(enums_2.CastContextEventType.SESSION_STATE_CHANGED, newState);
        }
    }
    emit(event, ...args) {
        const receivers = this.events.listenerCount(event);
        log_1.log("CastContext.emit (to", receivers, ")", event, ...args);
        this.events.emit(event, ...args);
    }
}
exports.CastContext = CastContext;


/***/ }),

/***/ "./castable Extension/ts/cast.framework/enums.ts":
/*!*******************************************************!*\
  !*** ./castable Extension/ts/cast.framework/enums.ts ***!
  \*******************************************************/
/*! flagged exports */
/*! export CastContextEventType [provided] [no usage info] [missing usage info prevents renaming] */
/*! export CastState [provided] [no usage info] [missing usage info prevents renaming] */
/*! export SessionState [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CastContextEventType = exports.SessionState = exports.CastState = void 0;
var CastState;
(function (CastState) {
    CastState["NO_DEVICES_AVAILABLE"] = "NO_DEVICES_AVAILABLE";
    CastState["NOT_CONNECTED"] = "NOT_CONNECTED";
    CastState["CONNECTING"] = "CONNECTING";
    CastState["CONNECTED"] = "CONNECTED";
})(CastState = exports.CastState || (exports.CastState = {}));
var SessionState;
(function (SessionState) {
    SessionState["NO_SESSION"] = "NO_SESSION";
    SessionState["SESSION_STARTING"] = "SESSION_STARTING";
    SessionState["SESSION_STARTED"] = "SESSION_STARTED";
    SessionState["SESSION_START_FAILED"] = "SESSION_START_FAILED";
    SessionState["SESSION_ENDING"] = "SESSION_ENDING";
    SessionState["SESSION_ENDED"] = "SESSION_ENDED";
    SessionState["SESSION_RESUMED"] = "SESSION_RESUMED";
})(SessionState = exports.SessionState || (exports.SessionState = {}));
var CastContextEventType;
(function (CastContextEventType) {
    CastContextEventType["CAST_STATE_CHANGED"] = "caststatechanged";
    CastContextEventType["SESSION_STATE_CHANGED"] = "sessionstatechanged";
})(CastContextEventType = exports.CastContextEventType || (exports.CastContextEventType = {}));


/***/ }),

/***/ "./castable Extension/ts/cast.ts":
/*!***************************************!*\
  !*** ./castable Extension/ts/cast.ts ***!
  \***************************************/
/*! flagged exports */
/*! export CastStub [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CastStub = void 0;
const cast_context_1 = __webpack_require__(/*! ./cast.framework/cast-context */ "./castable Extension/ts/cast.framework/cast-context.ts");
const enums_1 = __webpack_require__(/*! ./cast.framework/enums */ "./castable Extension/ts/cast.framework/enums.ts");
class StaticClassContext {
    constructor(myInstance) {
        this.myInstance = myInstance;
    }
    getInstance() {
        return this.myInstance;
    }
}
class FrameworkStub {
    constructor(io) {
        this.CastState = enums_1.CastState;
        this.SessionState = enums_1.SessionState;
        this.CastContextEventType = enums_1.CastContextEventType;
        this.CastContext = new StaticClassContext(new cast_context_1.CastContext(io));
    }
}
class CastStub {
    constructor(io) {
        this.framework = new FrameworkStub(io);
    }
}
exports.CastStub = CastStub;


/***/ }),

/***/ "./castable Extension/ts/chrome.cast/enums.ts":
/*!****************************************************!*\
  !*** ./castable Extension/ts/chrome.cast/enums.ts ***!
  \****************************************************/
/*! flagged exports */
/*! export AutoJoinPolicy [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ErrorCode [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorCode = exports.AutoJoinPolicy = void 0;
var AutoJoinPolicy;
(function (AutoJoinPolicy) {
    AutoJoinPolicy[AutoJoinPolicy["TAB_AND_ORIGIN_SCOPED"] = 0] = "TAB_AND_ORIGIN_SCOPED";
    AutoJoinPolicy[AutoJoinPolicy["ORIGIN_SCOPED"] = 1] = "ORIGIN_SCOPED";
    AutoJoinPolicy[AutoJoinPolicy["PAGE_SCOPED"] = 2] = "PAGE_SCOPED";
})(AutoJoinPolicy = exports.AutoJoinPolicy || (exports.AutoJoinPolicy = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["CANCEL"] = 0] = "CANCEL";
    ErrorCode[ErrorCode["TIMEOUT"] = 1] = "TIMEOUT";
    ErrorCode[ErrorCode["API_NOT_INITIALIZED"] = 2] = "API_NOT_INITIALIZED";
    ErrorCode[ErrorCode["INVALID_PARAMETER"] = 3] = "INVALID_PARAMETER";
    ErrorCode[ErrorCode["EXTENSION_NOT_COMPATIBLE"] = 4] = "EXTENSION_NOT_COMPATIBLE";
    ErrorCode[ErrorCode["EXTENSION_MISSING"] = 5] = "EXTENSION_MISSING";
    ErrorCode[ErrorCode["RECEIVER_UNAVAILABLE"] = 6] = "RECEIVER_UNAVAILABLE";
    ErrorCode[ErrorCode["SESSION_ERROR"] = 7] = "SESSION_ERROR";
    ErrorCode[ErrorCode["CHANNEL_ERROR"] = 8] = "CHANNEL_ERROR";
    ErrorCode[ErrorCode["LOAD_MEDIA_FAILED"] = 9] = "LOAD_MEDIA_FAILED";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));


/***/ }),

/***/ "./castable Extension/ts/chrome.cast/media.ts":
/*!****************************************************!*\
  !*** ./castable Extension/ts/chrome.cast/media.ts ***!
  \****************************************************/
/*! flagged exports */
/*! export MediaStub [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediaStub = void 0;
class MediaStub {
    constructor() {
        this.DEFAULT_MEDIA_RECEIVER_APP_ID = "CC1AD845";
    }
}
exports.MediaStub = MediaStub;


/***/ }),

/***/ "./castable Extension/ts/chrome.ts":
/*!*****************************************!*\
  !*** ./castable Extension/ts/chrome.ts ***!
  \*****************************************/
/*! flagged exports */
/*! export ChromeController [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ChromeStub [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChromeController = exports.ChromeStub = void 0;
const media_1 = __webpack_require__(/*! ./chrome.cast/media */ "./castable Extension/ts/chrome.cast/media.ts");
const log_1 = __webpack_require__(/*! ./log */ "./castable Extension/ts/log.ts");
const enums_1 = __webpack_require__(/*! ./chrome.cast/enums */ "./castable Extension/ts/chrome.cast/enums.ts");
class CastError extends Error {
    constructor(code, opt_description, opt_details) {
        super(`chrome.cast.Error: ${code}`);
        this.code = code;
        this.opt_description = opt_description;
        this.opt_details = opt_details;
    }
}
class ChromeCastStub {
    constructor() {
        this.AutoJoinPolicy = enums_1.AutoJoinPolicy;
        this.media = new media_1.MediaStub();
    }
    initialize(apiConfig, onSuccess, onError) {
        log_1.log("INITIALIZE", apiConfig);
    }
}
class ChromeStub {
    constructor() {
        this.castStub = new ChromeCastStub();
    }
    get cast() {
        log_1.log("READ chrome.cast");
        return this.castStub;
    }
}
exports.ChromeStub = ChromeStub;
class ChromeController {
    constructor() {
        this.chrome = new ChromeStub();
        this.onGCastApiAvailable = (isAvailable, err) => {
            log_1.log("received GCast API Availability: ", isAvailable, err);
        };
    }
    setGCastApiAvailableHandler(callback) {
        this.receivedApiAvailableHandler = callback;
    }
    notifyGCastAvailable(isAvailable) {
        if (this.receivedApiAvailableHandler) {
            this.receivedApiAvailableHandler(isAvailable);
        }
    }
}
exports.ChromeController = ChromeController;


/***/ }),

/***/ "./castable Extension/ts/client-io.ts":
/*!********************************************!*\
  !*** ./castable Extension/ts/client-io.ts ***!
  \********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:17-21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientIO = void 0;
const consts_1 = __webpack_require__(/*! ./consts */ "./castable Extension/ts/consts.ts");
const log_1 = __webpack_require__(/*! ./log */ "./castable Extension/ts/log.ts");
class Future {
    constructor(resolve, reject) {
        this.resolve = resolve;
        this.reject = reject;
    }
}
class ClientIO {
    constructor(script) {
        this.script = script;
        this.nextRequestId = 0;
        this.pendingResolves = {};
        this.requestSession = this.createRpc("requestSession");
        this.endCurrentSession = this.createRpc("endCurrentSession");
        script.addEventListener(consts_1.IPC_INCOMING_EVENT, event => {
            const data = event.detail;
            log_1.log("stub received ipc message", data);
            if (data.args && data.args.requestId !== undefined) {
                const future = this.pendingResolves[data.args.requestId];
                if (data.args.error) {
                    future.reject(data.args.error);
                }
                else {
                    future.resolve(data.args);
                }
            }
        });
    }
    /**
     * Dispatch a one-off IPC message to the extension.
     */
    dispatchMessage(name, args) {
        this.script.dispatchEvent(new CustomEvent(consts_1.IPC_OUTGOING_EVENT, {
            detail: {
                name,
                args,
            },
            bubbles: true,
            cancelable: false,
        }));
    }
    request(name, args) {
        const id = this.nextRequestId++;
        return new Promise((resolve, reject) => {
            this.pendingResolves[id] = new Future(resolve, reject);
            this.dispatchMessage(name, Object.assign(Object.assign({}, args), { requestId: id }));
        });
    }
    createRpc(name) {
        return (req) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.request(name, req);
            return response;
        });
    }
}
exports.ClientIO = ClientIO;


/***/ }),

/***/ "./castable Extension/ts/consts.ts":
/*!*****************************************!*\
  !*** ./castable Extension/ts/consts.ts ***!
  \*****************************************/
/*! flagged exports */
/*! export IPC_INCOMING_EVENT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export IPC_OUTGOING_EVENT [provided] [no usage info] [missing usage info prevents renaming] */
/*! export STUB_ELEMENT_ID [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STUB_ELEMENT_ID = exports.IPC_INCOMING_EVENT = exports.IPC_OUTGOING_EVENT = void 0;
exports.IPC_OUTGOING_EVENT = "castable-browser->extension";
exports.IPC_INCOMING_EVENT = "castable-extension->browser";
exports.STUB_ELEMENT_ID = "castable.script";


/***/ }),

/***/ "./castable Extension/ts/extension.ts":
/*!********************************************!*\
  !*** ./castable Extension/ts/extension.ts ***!
  \********************************************/
/*! flagged exports */
/*! export EventRegistrar [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export addEventListener [provided] [no usage info] [missing usage info prevents renaming] */
/*! export dispatchMessage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export removeEventListener [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventRegistrar = exports.removeEventListener = exports.addEventListener = exports.dispatchMessage = void 0;
const log_1 = __webpack_require__(/*! ./log */ "./castable Extension/ts/log.ts");
function dispatchMessage(messageName, content) {
    const e = safari.extension;
    e.dispatchMessage(messageName, content);
}
exports.dispatchMessage = dispatchMessage;
function addEventListener(eventName, handler) {
    const page = safari.self;
    page.addEventListener("message", handler);
}
exports.addEventListener = addEventListener;
function removeEventListener(eventName, handler) {
    const page = safari.self;
    page.removeEventListener("message", handler);
}
exports.removeEventListener = removeEventListener;
class EventRegistrar {
    constructor() {
        this.handlers = {};
        this.boundOnEvent = this.onEvent.bind(this);
    }
    register(message, handler) {
        if (!Object.keys(this.handlers).length) {
            addEventListener("message", this.boundOnEvent);
        }
        this.handlers[message] = handler;
    }
    on(message, handler) {
        this.register(message, handler);
    }
    once(message, handler) {
        this.register(message, (...args) => {
            this.unregister(message);
            handler(...args);
        });
    }
    unregister(message) {
        delete this.handlers[message];
        if (!Object.keys(this.handlers).length) {
            removeEventListener("message", this.boundOnEvent);
        }
    }
    onEvent(event) {
        const handler = this.handlers[event.name];
        if (handler) {
            handler(event);
        }
        else {
            log_1.warn("No handler registered for:", event);
        }
    }
}
exports.EventRegistrar = EventRegistrar;


/***/ }),

/***/ "./castable Extension/ts/index.ts":
/*!****************************************!*\
  !*** ./castable Extension/ts/index.ts ***!
  \****************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const consts_1 = __webpack_require__(/*! ./consts */ "./castable Extension/ts/consts.ts");
const extension_1 = __webpack_require__(/*! ./extension */ "./castable Extension/ts/extension.ts");
const log_1 = __webpack_require__(/*! ./log */ "./castable Extension/ts/log.ts");
const stub_1 = __webpack_require__(/*! ./stub */ "./castable Extension/ts/stub.ts");
function registerCast(registrar) {
    log_1.log("registering cast stub");
    if (!document.head) {
        log_1.log("no document.head");
        return;
    }
    if (!window.safari) {
        throw new Error("registerCast MUST NOT be called from page context");
    }
    // insert script into the page's context so it has access to
    // our chromecast stubs
    const newElement = document.createElement("script");
    newElement.src = safari.extension.baseURI + "castable-script.js";
    newElement.id = consts_1.STUB_ELEMENT_ID;
    newElement.charset = 'utf-8';
    newElement.addEventListener(consts_1.IPC_OUTGOING_EVENT, event => {
        const data = event.detail;
        log_1.log("forwarding message:", data);
        extension_1.dispatchMessage(data.name, data.args);
    });
    registrar.on(consts_1.IPC_INCOMING_EVENT, event => {
        log_1.log("ext received ipc message", event);
        newElement.dispatchEvent(new CustomEvent(consts_1.IPC_INCOMING_EVENT, {
            detail: {
                name: event.name,
                args: event.message,
            },
            bubbles: false,
            cancelable: false,
        }));
    });
    document.head.appendChild(newElement);
}
function initExt() {
    if (window.top !== window) {
        log_1.log("ignoring non-top window:", window);
        return;
    }
    if (document.getElementById(consts_1.STUB_ELEMENT_ID)) {
        log_1.log("castable.script already enqueued");
        return;
    }
    // NOTE: in order for our stub to be loaded into the actual
    // page's context, we have to write a <script> into the DOM
    // with *just* the right timing...
    // Here, we wait until the DOM content has loaded, let the
    // Swift extension know, and wait for it to tell us it's safe
    // to register
    log_1.log("initExt", document.currentScript, safari, window.chrome);
    document.addEventListener("DOMContentLoaded", () => {
        log_1.log("content loaded...");
        const registrar = new extension_1.EventRegistrar();
        registrar.once("register-cast", () => {
            registerCast(registrar);
        });
        extension_1.dispatchMessage("content-loaded");
        log_1.log("dispatched content-loaded!");
    });
}
if (window.safari && window.safari.extension) {
    initExt();
}
else {
    stub_1.init();
}


/***/ }),

/***/ "./castable Extension/ts/log.ts":
/*!**************************************!*\
  !*** ./castable Extension/ts/log.ts ***!
  \**************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export log [provided] [no usage info] [missing usage info prevents renaming] */
/*! export warn [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.warn = exports.log = void 0;
function log(...args) {
    console.log("CASTABLE:", ...args);
}
exports.log = log;
function warn(...args) {
    console.warn("CASTABLE:", ...args);
}
exports.warn = warn;


/***/ }),

/***/ "./castable Extension/ts/stub.ts":
/*!***************************************!*\
  !*** ./castable Extension/ts/stub.ts ***!
  \***************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export init [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init = void 0;
const cast_1 = __webpack_require__(/*! ./cast */ "./castable Extension/ts/cast.ts");
const chrome_1 = __webpack_require__(/*! ./chrome */ "./castable Extension/ts/chrome.ts");
const client_io_1 = __webpack_require__(/*! ./client-io */ "./castable Extension/ts/client-io.ts");
const log_1 = __webpack_require__(/*! ./log */ "./castable Extension/ts/log.ts");
/**
 * Initializes chromecast stubbing
 */
function init() {
    log_1.log("stub.init", safari.extension, document.currentScript, window.safari, window.chrome);
    const script = document.currentScript;
    if (!script || !(script instanceof HTMLScriptElement)) {
        log_1.log("ERROR: Unable to init cast stubs; unexpected currentScript:", script);
        return;
    }
    const controller = new chrome_1.ChromeController();
    const cast = new cast_1.CastStub(new client_io_1.ClientIO(script));
    Object.defineProperties(window, {
        chrome: {
            value: controller.chrome,
        },
        cast: {
            value: cast,
        },
        __onGCastApiAvailable: {
            get() {
                log_1.log("READ onGCastApiAvailable <- ", typeof controller.onGCastApiAvailable);
                return controller.onGCastApiAvailable;
            },
            set(value) {
                log_1.log("set onGCastApiAvailable <- ", value);
                controller.setGCastApiAvailableHandler(value);
            },
        },
    });
    log_1.log("Created chromecast API stub", controller.chrome);
}
exports.init = init;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./castable Extension/ts/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXN0YWJsZS8uL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovL2Nhc3RhYmxlLy4vY2FzdGFibGUgRXh0ZW5zaW9uL3RzL2Nhc3QuZnJhbWV3b3JrL2Nhc3QtY29udGV4dC50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jYXN0LmZyYW1ld29yay9lbnVtcy50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jYXN0LnRzIiwid2VicGFjazovL2Nhc3RhYmxlLy4vY2FzdGFibGUgRXh0ZW5zaW9uL3RzL2Nocm9tZS5jYXN0L2VudW1zLnRzIiwid2VicGFjazovL2Nhc3RhYmxlLy4vY2FzdGFibGUgRXh0ZW5zaW9uL3RzL2Nocm9tZS5jYXN0L21lZGlhLnRzIiwid2VicGFjazovL2Nhc3RhYmxlLy4vY2FzdGFibGUgRXh0ZW5zaW9uL3RzL2Nocm9tZS50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jbGllbnQtaW8udHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvY29uc3RzLnRzIiwid2VicGFjazovL2Nhc3RhYmxlLy4vY2FzdGFibGUgRXh0ZW5zaW9uL3RzL2V4dGVuc2lvbi50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9pbmRleC50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9sb2cudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvc3R1Yi50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jYXN0YWJsZS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7O0FBRW5CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBLGlDQUFpQyxRQUFRO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0Esc0NBQXNDLFFBQVE7QUFDOUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEseUJBQXlCO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7OztBQzNkYTtBQUNiO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxtQkFBbUI7QUFDbkIsaUJBQWlCLG1CQUFPLENBQUMsK0NBQVE7QUFDakMsY0FBYyxtQkFBTyxDQUFDLDhDQUFRO0FBQzlCLGdCQUFnQixtQkFBTyxDQUFDLDBFQUFzQjtBQUM5QyxnQkFBZ0IsbUJBQU8sQ0FBQyxnRUFBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELGNBQWM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEhOO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELDRCQUE0QixHQUFHLG9CQUFvQixHQUFHLGlCQUFpQjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9DQUFvQyxpQkFBaUIsS0FBSztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBDQUEwQyxvQkFBb0IsS0FBSztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMERBQTBELDRCQUE0QixLQUFLOzs7Ozs7Ozs7Ozs7Ozs7O0FDeEIvRTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxnQkFBZ0I7QUFDaEIsdUJBQXVCLG1CQUFPLENBQUMsNkZBQStCO0FBQzlELGdCQUFnQixtQkFBTyxDQUFDLCtFQUF3QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUJIO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGlCQUFpQixHQUFHLHNCQUFzQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw4Q0FBOEMsc0JBQXNCLEtBQUs7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxvQ0FBb0MsaUJBQWlCLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQjlDO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1JKO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELHdCQUF3QixHQUFHLGtCQUFrQjtBQUM3QyxnQkFBZ0IsbUJBQU8sQ0FBQyx5RUFBcUI7QUFDN0MsY0FBYyxtQkFBTyxDQUFDLDZDQUFPO0FBQzdCLGdCQUFnQixtQkFBTyxDQUFDLHlFQUFxQjtBQUM3QztBQUNBO0FBQ0Esb0NBQW9DLEtBQUs7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qjs7Ozs7Ozs7Ozs7Ozs7QUNqRFg7QUFDYjtBQUNBLDJCQUEyQiwrREFBK0QsZ0JBQWdCLEVBQUUsRUFBRTtBQUM5RztBQUNBLG1DQUFtQyxNQUFNLDZCQUE2QixFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ2pHLGtDQUFrQyxNQUFNLGlDQUFpQyxFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ3BHLCtCQUErQixxRkFBcUY7QUFDcEg7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsZ0JBQWdCO0FBQ2hCLGlCQUFpQixtQkFBTyxDQUFDLG1EQUFVO0FBQ25DLGNBQWMsbUJBQU8sQ0FBQyw2Q0FBTztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFLFVBQVUsZ0JBQWdCO0FBQy9GLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxnQkFBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BFSDtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCx1QkFBdUIsR0FBRywwQkFBMEIsR0FBRywwQkFBMEI7QUFDakYsMEJBQTBCO0FBQzFCLDBCQUEwQjtBQUMxQix1QkFBdUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMVjtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxzQkFBc0IsR0FBRywyQkFBMkIsR0FBRyx3QkFBd0IsR0FBRyx1QkFBdUI7QUFDekcsY0FBYyxtQkFBTyxDQUFDLDZDQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCOzs7Ozs7Ozs7Ozs7Ozs7QUN2RFQ7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsaUJBQWlCLG1CQUFPLENBQUMsbURBQVU7QUFDbkMsb0JBQW9CLG1CQUFPLENBQUMseURBQWE7QUFDekMsY0FBYyxtQkFBTyxDQUFDLDZDQUFPO0FBQzdCLGVBQWUsbUJBQU8sQ0FBQywrQ0FBUTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RFYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxZQUFZLEdBQUcsV0FBVztBQUMxQjtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsWUFBWTs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZDO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELFlBQVk7QUFDWixlQUFlLG1CQUFPLENBQUMsK0NBQVE7QUFDL0IsaUJBQWlCLG1CQUFPLENBQUMsbURBQVU7QUFDbkMsb0JBQW9CLG1CQUFPLENBQUMseURBQWE7QUFDekMsY0FBYyxtQkFBTyxDQUFDLDZDQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7Ozs7Ozs7VUN2Q1o7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJjYXN0YWJsZS1zY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xubW9kdWxlLmV4cG9ydHMub25jZSA9IG9uY2U7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBvbmNlKGVtaXR0ZXIsIG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmdW5jdGlvbiBldmVudExpc3RlbmVyKCkge1xuICAgICAgaWYgKGVycm9yTGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGVycm9yTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG4gICAgdmFyIGVycm9yTGlzdGVuZXI7XG5cbiAgICAvLyBBZGRpbmcgYW4gZXJyb3IgbGlzdGVuZXIgaXMgbm90IG9wdGlvbmFsIGJlY2F1c2VcbiAgICAvLyBpZiBhbiBlcnJvciBpcyB0aHJvd24gb24gYW4gZXZlbnQgZW1pdHRlciB3ZSBjYW5ub3RcbiAgICAvLyBndWFyYW50ZWUgdGhhdCB0aGUgYWN0dWFsIGV2ZW50IHdlIGFyZSB3YWl0aW5nIHdpbGxcbiAgICAvLyBiZSBmaXJlZC4gVGhlIHJlc3VsdCBjb3VsZCBiZSBhIHNpbGVudCB3YXkgdG8gY3JlYXRlXG4gICAgLy8gbWVtb3J5IG9yIGZpbGUgZGVzY3JpcHRvciBsZWFrcywgd2hpY2ggaXMgc29tZXRoaW5nXG4gICAgLy8gd2Ugc2hvdWxkIGF2b2lkLlxuICAgIGlmIChuYW1lICE9PSAnZXJyb3InKSB7XG4gICAgICBlcnJvckxpc3RlbmVyID0gZnVuY3Rpb24gZXJyb3JMaXN0ZW5lcihlcnIpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCBldmVudExpc3RlbmVyKTtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9O1xuXG4gICAgICBlbWl0dGVyLm9uY2UoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgZW1pdHRlci5vbmNlKG5hbWUsIGV2ZW50TGlzdGVuZXIpO1xuICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNhc3RDb250ZXh0ID0gdm9pZCAwO1xuY29uc3QgZXZlbnRzXzEgPSByZXF1aXJlKFwiZXZlbnRzXCIpO1xuY29uc3QgbG9nXzEgPSByZXF1aXJlKFwiLi4vbG9nXCIpO1xuY29uc3QgZW51bXNfMSA9IHJlcXVpcmUoXCIuLi9jaHJvbWUuY2FzdC9lbnVtc1wiKTtcbmNvbnN0IGVudW1zXzIgPSByZXF1aXJlKFwiLi9lbnVtc1wiKTtcbmNsYXNzIENhc3RDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3Rvcihpbykge1xuICAgICAgICB0aGlzLmlvID0gaW87XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IGV2ZW50c18xLkV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLmNhc3RTdGF0ZSA9IGVudW1zXzIuQ2FzdFN0YXRlLk5PVF9DT05ORUNURUQ7XG4gICAgICAgIHRoaXMuc2Vzc2lvblN0YXRlID0gZW51bXNfMi5TZXNzaW9uU3RhdGUuTk9fU0VTU0lPTjtcbiAgICB9XG4gICAgYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcikge1xuICAgICAgICBsb2dfMS5sb2coXCJDYXN0Q29udGV4dC5hZGRFdmVudExpc3RlbmVyXCIsIGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldmVudHMub24oZXZlbnQsIGhhbmRsZXIpO1xuICAgIH1cbiAgICBlbmRDdXJyZW50U2Vzc2lvbihzdG9wQ2FzdGluZykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgbG9nXzEubG9nKFwiQ2FzdENvbnRleHQuZW5kQ3VycmVudFNlc3Npb25cIiwgc3RvcENhc3RpbmcpO1xuICAgICAgICAgICAgdGhpcy5zZXRDYXN0U3RhdGUoZW51bXNfMi5DYXN0U3RhdGUuTk9UX0NPTk5FQ1RFRCk7XG4gICAgICAgICAgICB0aGlzLnNldFNlc3Npb25TdGF0ZShlbnVtc18yLlNlc3Npb25TdGF0ZS5TRVNTSU9OX0VORElORyk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuaW8uZW5kQ3VycmVudFNlc3Npb24oeyBzdG9wQ2FzdGluZyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgbG9nXzEubG9nKFwiQ2FzdENvbnRleHQuZW5kQ3VycmVudFNlc3Npb24gRVJST1I6IFwiLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2FzdFN0YXRlKGVudW1zXzIuQ2FzdFN0YXRlLk5PVF9DT05ORUNURUQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2Vzc2lvblN0YXRlKGVudW1zXzIuU2Vzc2lvblN0YXRlLlNFU1NJT05fRU5ERUQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2Vzc2lvblN0YXRlKGVudW1zXzIuU2Vzc2lvblN0YXRlLk5PX1NFU1NJT04pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0Q2FzdFN0YXRlKCkge1xuICAgICAgICBsb2dfMS5sb2coXCJDYXN0Q29udGV4dC5nZXRDYXN0U3RhdGUgPC0gXCIsIHRoaXMuY2FzdFN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FzdFN0YXRlO1xuICAgIH1cbiAgICBnZXRDdXJyZW50U2Vzc2lvbigpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiQ2FzdENvbnRleHQuZ2V0Q3VycmVudFNlc3Npb25cIik7XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGdldFNlc3Npb25TdGF0ZSgpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiQ2FzdENvbnRleHQuZ2V0U2Vzc2lvblN0YXRlIDwtIFwiLCB0aGlzLnNlc3Npb25TdGF0ZSk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb25TdGF0ZTtcbiAgICB9XG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcikge1xuICAgICAgICBsb2dfMS5sb2coXCJDYXN0Q29udGV4dC5yZW1vdmVFdmVudExpc3RlbmVyXCIsIGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgICAgdGhpcy5ldmVudHMub2ZmKGV2ZW50LCBoYW5kbGVyKTtcbiAgICB9XG4gICAgcmVxdWVzdFNlc3Npb24oKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBsb2dfMS5sb2coXCJDYXN0Q29udGV4dC5yZXF1ZXN0U2Vzc2lvblwiKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDYXN0U3RhdGUoZW51bXNfMi5DYXN0U3RhdGUuQ09OTkVDVElORyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTZXNzaW9uU3RhdGUoZW51bXNfMi5TZXNzaW9uU3RhdGUuU0VTU0lPTl9TVEFSVElORyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geWllbGQgdGhpcy5pby5yZXF1ZXN0U2Vzc2lvbih0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGxvZ18xLmxvZyhcInJlcXVlc3RTZXNzaW9uIC0+IFwiLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q2FzdFN0YXRlKGVudW1zXzIuQ2FzdFN0YXRlLkNPTk5FQ1RFRCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTZXNzaW9uU3RhdGUoZW51bXNfMi5TZXNzaW9uU3RhdGUuU0VTU0lPTl9TVEFSVEVEKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTZXNzaW9uU3RhdGUoZW51bXNfMi5TZXNzaW9uU3RhdGUuU0VTU0lPTl9TVEFSVF9GQUlMRUQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2Vzc2lvblN0YXRlKGVudW1zXzIuU2Vzc2lvblN0YXRlLk5PX1NFU1NJT04pO1xuICAgICAgICAgICAgICAgIGxvZ18xLmxvZyhcInJlcXVlc3RTZXNzaW9uIEVSUk9SOiBcIiwgZSk7XG4gICAgICAgICAgICAgICAgaWYgKGUuaWQgPT09IFwiY2FuY2VsbGVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRDYXN0U3RhdGUoZW51bXNfMi5DYXN0U3RhdGUuTk9fREVWSUNFU19BVkFJTEFCTEUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW51bXNfMS5FcnJvckNvZGUuQ0FOQ0VMO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNldENhc3RTdGF0ZShlbnVtc18yLkNhc3RTdGF0ZS5OT1RfQ09OTkVDVEVEKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW51bXNfMS5FcnJvckNvZGUuU0VTU0lPTl9FUlJPUjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldExhdW5jaENyZWRlbnRpYWxzRGF0YShkYXRhKSB7XG4gICAgICAgIGxvZ18xLmxvZyhcIkNhc3RDb250ZXh0LnNldExhdW5jaENyZWRlbnRpYWxzRGF0YVwiLCBkYXRhKTtcbiAgICB9XG4gICAgc2V0T3B0aW9ucyhvcHRzKSB7XG4gICAgICAgIGxvZ18xLmxvZyhcIkNhc3RDb250ZXh0LnNldE9wdGlvbnNcIiwgb3B0cyk7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdHM7XG4gICAgfVxuICAgIHNldENhc3RTdGF0ZShuZXdTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5jYXN0U3RhdGUgIT09IG5ld1N0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmNhc3RTdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgICAgICAgdGhpcy5lbWl0KGVudW1zXzIuQ2FzdENvbnRleHRFdmVudFR5cGUuQ0FTVF9TVEFURV9DSEFOR0VELCBuZXdTdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0U2Vzc2lvblN0YXRlKG5ld1N0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLnNlc3Npb25TdGF0ZSAhPT0gbmV3U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvblN0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgICAgICB0aGlzLmVtaXQoZW51bXNfMi5DYXN0Q29udGV4dEV2ZW50VHlwZS5TRVNTSU9OX1NUQVRFX0NIQU5HRUQsIG5ld1N0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbWl0KGV2ZW50LCAuLi5hcmdzKSB7XG4gICAgICAgIGNvbnN0IHJlY2VpdmVycyA9IHRoaXMuZXZlbnRzLmxpc3RlbmVyQ291bnQoZXZlbnQpO1xuICAgICAgICBsb2dfMS5sb2coXCJDYXN0Q29udGV4dC5lbWl0ICh0b1wiLCByZWNlaXZlcnMsIFwiKVwiLCBldmVudCwgLi4uYXJncyk7XG4gICAgICAgIHRoaXMuZXZlbnRzLmVtaXQoZXZlbnQsIC4uLmFyZ3MpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ2FzdENvbnRleHQgPSBDYXN0Q29udGV4dDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DYXN0Q29udGV4dEV2ZW50VHlwZSA9IGV4cG9ydHMuU2Vzc2lvblN0YXRlID0gZXhwb3J0cy5DYXN0U3RhdGUgPSB2b2lkIDA7XG52YXIgQ2FzdFN0YXRlO1xuKGZ1bmN0aW9uIChDYXN0U3RhdGUpIHtcbiAgICBDYXN0U3RhdGVbXCJOT19ERVZJQ0VTX0FWQUlMQUJMRVwiXSA9IFwiTk9fREVWSUNFU19BVkFJTEFCTEVcIjtcbiAgICBDYXN0U3RhdGVbXCJOT1RfQ09OTkVDVEVEXCJdID0gXCJOT1RfQ09OTkVDVEVEXCI7XG4gICAgQ2FzdFN0YXRlW1wiQ09OTkVDVElOR1wiXSA9IFwiQ09OTkVDVElOR1wiO1xuICAgIENhc3RTdGF0ZVtcIkNPTk5FQ1RFRFwiXSA9IFwiQ09OTkVDVEVEXCI7XG59KShDYXN0U3RhdGUgPSBleHBvcnRzLkNhc3RTdGF0ZSB8fCAoZXhwb3J0cy5DYXN0U3RhdGUgPSB7fSkpO1xudmFyIFNlc3Npb25TdGF0ZTtcbihmdW5jdGlvbiAoU2Vzc2lvblN0YXRlKSB7XG4gICAgU2Vzc2lvblN0YXRlW1wiTk9fU0VTU0lPTlwiXSA9IFwiTk9fU0VTU0lPTlwiO1xuICAgIFNlc3Npb25TdGF0ZVtcIlNFU1NJT05fU1RBUlRJTkdcIl0gPSBcIlNFU1NJT05fU1RBUlRJTkdcIjtcbiAgICBTZXNzaW9uU3RhdGVbXCJTRVNTSU9OX1NUQVJURURcIl0gPSBcIlNFU1NJT05fU1RBUlRFRFwiO1xuICAgIFNlc3Npb25TdGF0ZVtcIlNFU1NJT05fU1RBUlRfRkFJTEVEXCJdID0gXCJTRVNTSU9OX1NUQVJUX0ZBSUxFRFwiO1xuICAgIFNlc3Npb25TdGF0ZVtcIlNFU1NJT05fRU5ESU5HXCJdID0gXCJTRVNTSU9OX0VORElOR1wiO1xuICAgIFNlc3Npb25TdGF0ZVtcIlNFU1NJT05fRU5ERURcIl0gPSBcIlNFU1NJT05fRU5ERURcIjtcbiAgICBTZXNzaW9uU3RhdGVbXCJTRVNTSU9OX1JFU1VNRURcIl0gPSBcIlNFU1NJT05fUkVTVU1FRFwiO1xufSkoU2Vzc2lvblN0YXRlID0gZXhwb3J0cy5TZXNzaW9uU3RhdGUgfHwgKGV4cG9ydHMuU2Vzc2lvblN0YXRlID0ge30pKTtcbnZhciBDYXN0Q29udGV4dEV2ZW50VHlwZTtcbihmdW5jdGlvbiAoQ2FzdENvbnRleHRFdmVudFR5cGUpIHtcbiAgICBDYXN0Q29udGV4dEV2ZW50VHlwZVtcIkNBU1RfU1RBVEVfQ0hBTkdFRFwiXSA9IFwiY2FzdHN0YXRlY2hhbmdlZFwiO1xuICAgIENhc3RDb250ZXh0RXZlbnRUeXBlW1wiU0VTU0lPTl9TVEFURV9DSEFOR0VEXCJdID0gXCJzZXNzaW9uc3RhdGVjaGFuZ2VkXCI7XG59KShDYXN0Q29udGV4dEV2ZW50VHlwZSA9IGV4cG9ydHMuQ2FzdENvbnRleHRFdmVudFR5cGUgfHwgKGV4cG9ydHMuQ2FzdENvbnRleHRFdmVudFR5cGUgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNhc3RTdHViID0gdm9pZCAwO1xuY29uc3QgY2FzdF9jb250ZXh0XzEgPSByZXF1aXJlKFwiLi9jYXN0LmZyYW1ld29yay9jYXN0LWNvbnRleHRcIik7XG5jb25zdCBlbnVtc18xID0gcmVxdWlyZShcIi4vY2FzdC5mcmFtZXdvcmsvZW51bXNcIik7XG5jbGFzcyBTdGF0aWNDbGFzc0NvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKG15SW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5teUluc3RhbmNlID0gbXlJbnN0YW5jZTtcbiAgICB9XG4gICAgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm15SW5zdGFuY2U7XG4gICAgfVxufVxuY2xhc3MgRnJhbWV3b3JrU3R1YiB7XG4gICAgY29uc3RydWN0b3IoaW8pIHtcbiAgICAgICAgdGhpcy5DYXN0U3RhdGUgPSBlbnVtc18xLkNhc3RTdGF0ZTtcbiAgICAgICAgdGhpcy5TZXNzaW9uU3RhdGUgPSBlbnVtc18xLlNlc3Npb25TdGF0ZTtcbiAgICAgICAgdGhpcy5DYXN0Q29udGV4dEV2ZW50VHlwZSA9IGVudW1zXzEuQ2FzdENvbnRleHRFdmVudFR5cGU7XG4gICAgICAgIHRoaXMuQ2FzdENvbnRleHQgPSBuZXcgU3RhdGljQ2xhc3NDb250ZXh0KG5ldyBjYXN0X2NvbnRleHRfMS5DYXN0Q29udGV4dChpbykpO1xuICAgIH1cbn1cbmNsYXNzIENhc3RTdHViIHtcbiAgICBjb25zdHJ1Y3Rvcihpbykge1xuICAgICAgICB0aGlzLmZyYW1ld29yayA9IG5ldyBGcmFtZXdvcmtTdHViKGlvKTtcbiAgICB9XG59XG5leHBvcnRzLkNhc3RTdHViID0gQ2FzdFN0dWI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRXJyb3JDb2RlID0gZXhwb3J0cy5BdXRvSm9pblBvbGljeSA9IHZvaWQgMDtcbnZhciBBdXRvSm9pblBvbGljeTtcbihmdW5jdGlvbiAoQXV0b0pvaW5Qb2xpY3kpIHtcbiAgICBBdXRvSm9pblBvbGljeVtBdXRvSm9pblBvbGljeVtcIlRBQl9BTkRfT1JJR0lOX1NDT1BFRFwiXSA9IDBdID0gXCJUQUJfQU5EX09SSUdJTl9TQ09QRURcIjtcbiAgICBBdXRvSm9pblBvbGljeVtBdXRvSm9pblBvbGljeVtcIk9SSUdJTl9TQ09QRURcIl0gPSAxXSA9IFwiT1JJR0lOX1NDT1BFRFwiO1xuICAgIEF1dG9Kb2luUG9saWN5W0F1dG9Kb2luUG9saWN5W1wiUEFHRV9TQ09QRURcIl0gPSAyXSA9IFwiUEFHRV9TQ09QRURcIjtcbn0pKEF1dG9Kb2luUG9saWN5ID0gZXhwb3J0cy5BdXRvSm9pblBvbGljeSB8fCAoZXhwb3J0cy5BdXRvSm9pblBvbGljeSA9IHt9KSk7XG52YXIgRXJyb3JDb2RlO1xuKGZ1bmN0aW9uIChFcnJvckNvZGUpIHtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiQ0FOQ0VMXCJdID0gMF0gPSBcIkNBTkNFTFwiO1xuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJUSU1FT1VUXCJdID0gMV0gPSBcIlRJTUVPVVRcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiQVBJX05PVF9JTklUSUFMSVpFRFwiXSA9IDJdID0gXCJBUElfTk9UX0lOSVRJQUxJWkVEXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIklOVkFMSURfUEFSQU1FVEVSXCJdID0gM10gPSBcIklOVkFMSURfUEFSQU1FVEVSXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIkVYVEVOU0lPTl9OT1RfQ09NUEFUSUJMRVwiXSA9IDRdID0gXCJFWFRFTlNJT05fTk9UX0NPTVBBVElCTEVcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiRVhURU5TSU9OX01JU1NJTkdcIl0gPSA1XSA9IFwiRVhURU5TSU9OX01JU1NJTkdcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiUkVDRUlWRVJfVU5BVkFJTEFCTEVcIl0gPSA2XSA9IFwiUkVDRUlWRVJfVU5BVkFJTEFCTEVcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiU0VTU0lPTl9FUlJPUlwiXSA9IDddID0gXCJTRVNTSU9OX0VSUk9SXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIkNIQU5ORUxfRVJST1JcIl0gPSA4XSA9IFwiQ0hBTk5FTF9FUlJPUlwiO1xuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJMT0FEX01FRElBX0ZBSUxFRFwiXSA9IDldID0gXCJMT0FEX01FRElBX0ZBSUxFRFwiO1xufSkoRXJyb3JDb2RlID0gZXhwb3J0cy5FcnJvckNvZGUgfHwgKGV4cG9ydHMuRXJyb3JDb2RlID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5NZWRpYVN0dWIgPSB2b2lkIDA7XG5jbGFzcyBNZWRpYVN0dWIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLkRFRkFVTFRfTUVESUFfUkVDRUlWRVJfQVBQX0lEID0gXCJDQzFBRDg0NVwiO1xuICAgIH1cbn1cbmV4cG9ydHMuTWVkaWFTdHViID0gTWVkaWFTdHViO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNocm9tZUNvbnRyb2xsZXIgPSBleHBvcnRzLkNocm9tZVN0dWIgPSB2b2lkIDA7XG5jb25zdCBtZWRpYV8xID0gcmVxdWlyZShcIi4vY2hyb21lLmNhc3QvbWVkaWFcIik7XG5jb25zdCBsb2dfMSA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcbmNvbnN0IGVudW1zXzEgPSByZXF1aXJlKFwiLi9jaHJvbWUuY2FzdC9lbnVtc1wiKTtcbmNsYXNzIENhc3RFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihjb2RlLCBvcHRfZGVzY3JpcHRpb24sIG9wdF9kZXRhaWxzKSB7XG4gICAgICAgIHN1cGVyKGBjaHJvbWUuY2FzdC5FcnJvcjogJHtjb2RlfWApO1xuICAgICAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICAgICAgICB0aGlzLm9wdF9kZXNjcmlwdGlvbiA9IG9wdF9kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5vcHRfZGV0YWlscyA9IG9wdF9kZXRhaWxzO1xuICAgIH1cbn1cbmNsYXNzIENocm9tZUNhc3RTdHViIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5BdXRvSm9pblBvbGljeSA9IGVudW1zXzEuQXV0b0pvaW5Qb2xpY3k7XG4gICAgICAgIHRoaXMubWVkaWEgPSBuZXcgbWVkaWFfMS5NZWRpYVN0dWIoKTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZShhcGlDb25maWcsIG9uU3VjY2Vzcywgb25FcnJvcikge1xuICAgICAgICBsb2dfMS5sb2coXCJJTklUSUFMSVpFXCIsIGFwaUNvbmZpZyk7XG4gICAgfVxufVxuY2xhc3MgQ2hyb21lU3R1YiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FzdFN0dWIgPSBuZXcgQ2hyb21lQ2FzdFN0dWIoKTtcbiAgICB9XG4gICAgZ2V0IGNhc3QoKSB7XG4gICAgICAgIGxvZ18xLmxvZyhcIlJFQUQgY2hyb21lLmNhc3RcIik7XG4gICAgICAgIHJldHVybiB0aGlzLmNhc3RTdHViO1xuICAgIH1cbn1cbmV4cG9ydHMuQ2hyb21lU3R1YiA9IENocm9tZVN0dWI7XG5jbGFzcyBDaHJvbWVDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jaHJvbWUgPSBuZXcgQ2hyb21lU3R1YigpO1xuICAgICAgICB0aGlzLm9uR0Nhc3RBcGlBdmFpbGFibGUgPSAoaXNBdmFpbGFibGUsIGVycikgPT4ge1xuICAgICAgICAgICAgbG9nXzEubG9nKFwicmVjZWl2ZWQgR0Nhc3QgQVBJIEF2YWlsYWJpbGl0eTogXCIsIGlzQXZhaWxhYmxlLCBlcnIpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBzZXRHQ2FzdEFwaUF2YWlsYWJsZUhhbmRsZXIoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5yZWNlaXZlZEFwaUF2YWlsYWJsZUhhbmRsZXIgPSBjYWxsYmFjaztcbiAgICB9XG4gICAgbm90aWZ5R0Nhc3RBdmFpbGFibGUoaXNBdmFpbGFibGUpIHtcbiAgICAgICAgaWYgKHRoaXMucmVjZWl2ZWRBcGlBdmFpbGFibGVIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVkQXBpQXZhaWxhYmxlSGFuZGxlcihpc0F2YWlsYWJsZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkNocm9tZUNvbnRyb2xsZXIgPSBDaHJvbWVDb250cm9sbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ2xpZW50SU8gPSB2b2lkIDA7XG5jb25zdCBjb25zdHNfMSA9IHJlcXVpcmUoXCIuL2NvbnN0c1wiKTtcbmNvbnN0IGxvZ18xID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuY2xhc3MgRnV0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgdGhpcy5yZWplY3QgPSByZWplY3Q7XG4gICAgfVxufVxuY2xhc3MgQ2xpZW50SU8ge1xuICAgIGNvbnN0cnVjdG9yKHNjcmlwdCkge1xuICAgICAgICB0aGlzLnNjcmlwdCA9IHNjcmlwdDtcbiAgICAgICAgdGhpcy5uZXh0UmVxdWVzdElkID0gMDtcbiAgICAgICAgdGhpcy5wZW5kaW5nUmVzb2x2ZXMgPSB7fTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0U2Vzc2lvbiA9IHRoaXMuY3JlYXRlUnBjKFwicmVxdWVzdFNlc3Npb25cIik7XG4gICAgICAgIHRoaXMuZW5kQ3VycmVudFNlc3Npb24gPSB0aGlzLmNyZWF0ZVJwYyhcImVuZEN1cnJlbnRTZXNzaW9uXCIpO1xuICAgICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcihjb25zdHNfMS5JUENfSU5DT01JTkdfRVZFTlQsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBldmVudC5kZXRhaWw7XG4gICAgICAgICAgICBsb2dfMS5sb2coXCJzdHViIHJlY2VpdmVkIGlwYyBtZXNzYWdlXCIsIGRhdGEpO1xuICAgICAgICAgICAgaWYgKGRhdGEuYXJncyAmJiBkYXRhLmFyZ3MucmVxdWVzdElkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmdXR1cmUgPSB0aGlzLnBlbmRpbmdSZXNvbHZlc1tkYXRhLmFyZ3MucmVxdWVzdElkXTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5hcmdzLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1dHVyZS5yZWplY3QoZGF0YS5hcmdzLmVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1dHVyZS5yZXNvbHZlKGRhdGEuYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcGF0Y2ggYSBvbmUtb2ZmIElQQyBtZXNzYWdlIHRvIHRoZSBleHRlbnNpb24uXG4gICAgICovXG4gICAgZGlzcGF0Y2hNZXNzYWdlKG5hbWUsIGFyZ3MpIHtcbiAgICAgICAgdGhpcy5zY3JpcHQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoY29uc3RzXzEuSVBDX09VVEdPSU5HX0VWRU5ULCB7XG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgIGFyZ3MsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIHJlcXVlc3QobmFtZSwgYXJncykge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMubmV4dFJlcXVlc3RJZCsrO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nUmVzb2x2ZXNbaWRdID0gbmV3IEZ1dHVyZShyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE1lc3NhZ2UobmFtZSwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBhcmdzKSwgeyByZXF1ZXN0SWQ6IGlkIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNyZWF0ZVJwYyhuYW1lKSB7XG4gICAgICAgIHJldHVybiAocmVxKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIHRoaXMucmVxdWVzdChuYW1lLCByZXEpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLkNsaWVudElPID0gQ2xpZW50SU87XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU1RVQl9FTEVNRU5UX0lEID0gZXhwb3J0cy5JUENfSU5DT01JTkdfRVZFTlQgPSBleHBvcnRzLklQQ19PVVRHT0lOR19FVkVOVCA9IHZvaWQgMDtcbmV4cG9ydHMuSVBDX09VVEdPSU5HX0VWRU5UID0gXCJjYXN0YWJsZS1icm93c2VyLT5leHRlbnNpb25cIjtcbmV4cG9ydHMuSVBDX0lOQ09NSU5HX0VWRU5UID0gXCJjYXN0YWJsZS1leHRlbnNpb24tPmJyb3dzZXJcIjtcbmV4cG9ydHMuU1RVQl9FTEVNRU5UX0lEID0gXCJjYXN0YWJsZS5zY3JpcHRcIjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FdmVudFJlZ2lzdHJhciA9IGV4cG9ydHMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGV4cG9ydHMuYWRkRXZlbnRMaXN0ZW5lciA9IGV4cG9ydHMuZGlzcGF0Y2hNZXNzYWdlID0gdm9pZCAwO1xuY29uc3QgbG9nXzEgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5mdW5jdGlvbiBkaXNwYXRjaE1lc3NhZ2UobWVzc2FnZU5hbWUsIGNvbnRlbnQpIHtcbiAgICBjb25zdCBlID0gc2FmYXJpLmV4dGVuc2lvbjtcbiAgICBlLmRpc3BhdGNoTWVzc2FnZShtZXNzYWdlTmFtZSwgY29udGVudCk7XG59XG5leHBvcnRzLmRpc3BhdGNoTWVzc2FnZSA9IGRpc3BhdGNoTWVzc2FnZTtcbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgY29uc3QgcGFnZSA9IHNhZmFyaS5zZWxmO1xuICAgIHBhZ2UuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgaGFuZGxlcik7XG59XG5leHBvcnRzLmFkZEV2ZW50TGlzdGVuZXIgPSBhZGRFdmVudExpc3RlbmVyO1xuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICBjb25zdCBwYWdlID0gc2FmYXJpLnNlbGY7XG4gICAgcGFnZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBoYW5kbGVyKTtcbn1cbmV4cG9ydHMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHJlbW92ZUV2ZW50TGlzdGVuZXI7XG5jbGFzcyBFdmVudFJlZ2lzdHJhciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlcnMgPSB7fTtcbiAgICAgICAgdGhpcy5ib3VuZE9uRXZlbnQgPSB0aGlzLm9uRXZlbnQuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgcmVnaXN0ZXIobWVzc2FnZSwgaGFuZGxlcikge1xuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHRoaXMuaGFuZGxlcnMpLmxlbmd0aCkge1xuICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5ib3VuZE9uRXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGFuZGxlcnNbbWVzc2FnZV0gPSBoYW5kbGVyO1xuICAgIH1cbiAgICBvbihtZXNzYWdlLCBoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIobWVzc2FnZSwgaGFuZGxlcik7XG4gICAgfVxuICAgIG9uY2UobWVzc2FnZSwgaGFuZGxlcikge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKG1lc3NhZ2UsICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVucmVnaXN0ZXIobWVzc2FnZSk7XG4gICAgICAgICAgICBoYW5kbGVyKC4uLmFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdW5yZWdpc3RlcihtZXNzYWdlKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmhhbmRsZXJzW21lc3NhZ2VdO1xuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHRoaXMuaGFuZGxlcnMpLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5ib3VuZE9uRXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IHRoaXMuaGFuZGxlcnNbZXZlbnQubmFtZV07XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgICBoYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ18xLndhcm4oXCJObyBoYW5kbGVyIHJlZ2lzdGVyZWQgZm9yOlwiLCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkV2ZW50UmVnaXN0cmFyID0gRXZlbnRSZWdpc3RyYXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvbnN0c18xID0gcmVxdWlyZShcIi4vY29uc3RzXCIpO1xuY29uc3QgZXh0ZW5zaW9uXzEgPSByZXF1aXJlKFwiLi9leHRlbnNpb25cIik7XG5jb25zdCBsb2dfMSA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcbmNvbnN0IHN0dWJfMSA9IHJlcXVpcmUoXCIuL3N0dWJcIik7XG5mdW5jdGlvbiByZWdpc3RlckNhc3QocmVnaXN0cmFyKSB7XG4gICAgbG9nXzEubG9nKFwicmVnaXN0ZXJpbmcgY2FzdCBzdHViXCIpO1xuICAgIGlmICghZG9jdW1lbnQuaGVhZCkge1xuICAgICAgICBsb2dfMS5sb2coXCJubyBkb2N1bWVudC5oZWFkXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghd2luZG93LnNhZmFyaSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJyZWdpc3RlckNhc3QgTVVTVCBOT1QgYmUgY2FsbGVkIGZyb20gcGFnZSBjb250ZXh0XCIpO1xuICAgIH1cbiAgICAvLyBpbnNlcnQgc2NyaXB0IGludG8gdGhlIHBhZ2UncyBjb250ZXh0IHNvIGl0IGhhcyBhY2Nlc3MgdG9cbiAgICAvLyBvdXIgY2hyb21lY2FzdCBzdHVic1xuICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgIG5ld0VsZW1lbnQuc3JjID0gc2FmYXJpLmV4dGVuc2lvbi5iYXNlVVJJICsgXCJjYXN0YWJsZS1zY3JpcHQuanNcIjtcbiAgICBuZXdFbGVtZW50LmlkID0gY29uc3RzXzEuU1RVQl9FTEVNRU5UX0lEO1xuICAgIG5ld0VsZW1lbnQuY2hhcnNldCA9ICd1dGYtOCc7XG4gICAgbmV3RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGNvbnN0c18xLklQQ19PVVRHT0lOR19FVkVOVCwgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBkYXRhID0gZXZlbnQuZGV0YWlsO1xuICAgICAgICBsb2dfMS5sb2coXCJmb3J3YXJkaW5nIG1lc3NhZ2U6XCIsIGRhdGEpO1xuICAgICAgICBleHRlbnNpb25fMS5kaXNwYXRjaE1lc3NhZ2UoZGF0YS5uYW1lLCBkYXRhLmFyZ3MpO1xuICAgIH0pO1xuICAgIHJlZ2lzdHJhci5vbihjb25zdHNfMS5JUENfSU5DT01JTkdfRVZFTlQsIGV2ZW50ID0+IHtcbiAgICAgICAgbG9nXzEubG9nKFwiZXh0IHJlY2VpdmVkIGlwYyBtZXNzYWdlXCIsIGV2ZW50KTtcbiAgICAgICAgbmV3RWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChjb25zdHNfMS5JUENfSU5DT01JTkdfRVZFTlQsIHtcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgIG5hbWU6IGV2ZW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgYXJnczogZXZlbnQubWVzc2FnZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgICB9KSk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChuZXdFbGVtZW50KTtcbn1cbmZ1bmN0aW9uIGluaXRFeHQoKSB7XG4gICAgaWYgKHdpbmRvdy50b3AgIT09IHdpbmRvdykge1xuICAgICAgICBsb2dfMS5sb2coXCJpZ25vcmluZyBub24tdG9wIHdpbmRvdzpcIiwgd2luZG93KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29uc3RzXzEuU1RVQl9FTEVNRU5UX0lEKSkge1xuICAgICAgICBsb2dfMS5sb2coXCJjYXN0YWJsZS5zY3JpcHQgYWxyZWFkeSBlbnF1ZXVlZFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBOT1RFOiBpbiBvcmRlciBmb3Igb3VyIHN0dWIgdG8gYmUgbG9hZGVkIGludG8gdGhlIGFjdHVhbFxuICAgIC8vIHBhZ2UncyBjb250ZXh0LCB3ZSBoYXZlIHRvIHdyaXRlIGEgPHNjcmlwdD4gaW50byB0aGUgRE9NXG4gICAgLy8gd2l0aCAqanVzdCogdGhlIHJpZ2h0IHRpbWluZy4uLlxuICAgIC8vIEhlcmUsIHdlIHdhaXQgdW50aWwgdGhlIERPTSBjb250ZW50IGhhcyBsb2FkZWQsIGxldCB0aGVcbiAgICAvLyBTd2lmdCBleHRlbnNpb24ga25vdywgYW5kIHdhaXQgZm9yIGl0IHRvIHRlbGwgdXMgaXQncyBzYWZlXG4gICAgLy8gdG8gcmVnaXN0ZXJcbiAgICBsb2dfMS5sb2coXCJpbml0RXh0XCIsIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQsIHNhZmFyaSwgd2luZG93LmNocm9tZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgICAgICBsb2dfMS5sb2coXCJjb250ZW50IGxvYWRlZC4uLlwiKTtcbiAgICAgICAgY29uc3QgcmVnaXN0cmFyID0gbmV3IGV4dGVuc2lvbl8xLkV2ZW50UmVnaXN0cmFyKCk7XG4gICAgICAgIHJlZ2lzdHJhci5vbmNlKFwicmVnaXN0ZXItY2FzdFwiLCAoKSA9PiB7XG4gICAgICAgICAgICByZWdpc3RlckNhc3QocmVnaXN0cmFyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGV4dGVuc2lvbl8xLmRpc3BhdGNoTWVzc2FnZShcImNvbnRlbnQtbG9hZGVkXCIpO1xuICAgICAgICBsb2dfMS5sb2coXCJkaXNwYXRjaGVkIGNvbnRlbnQtbG9hZGVkIVwiKTtcbiAgICB9KTtcbn1cbmlmICh3aW5kb3cuc2FmYXJpICYmIHdpbmRvdy5zYWZhcmkuZXh0ZW5zaW9uKSB7XG4gICAgaW5pdEV4dCgpO1xufVxuZWxzZSB7XG4gICAgc3R1Yl8xLmluaXQoKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy53YXJuID0gZXhwb3J0cy5sb2cgPSB2b2lkIDA7XG5mdW5jdGlvbiBsb2coLi4uYXJncykge1xuICAgIGNvbnNvbGUubG9nKFwiQ0FTVEFCTEU6XCIsIC4uLmFyZ3MpO1xufVxuZXhwb3J0cy5sb2cgPSBsb2c7XG5mdW5jdGlvbiB3YXJuKC4uLmFyZ3MpIHtcbiAgICBjb25zb2xlLndhcm4oXCJDQVNUQUJMRTpcIiwgLi4uYXJncyk7XG59XG5leHBvcnRzLndhcm4gPSB3YXJuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXQgPSB2b2lkIDA7XG5jb25zdCBjYXN0XzEgPSByZXF1aXJlKFwiLi9jYXN0XCIpO1xuY29uc3QgY2hyb21lXzEgPSByZXF1aXJlKFwiLi9jaHJvbWVcIik7XG5jb25zdCBjbGllbnRfaW9fMSA9IHJlcXVpcmUoXCIuL2NsaWVudC1pb1wiKTtcbmNvbnN0IGxvZ18xID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuLyoqXG4gKiBJbml0aWFsaXplcyBjaHJvbWVjYXN0IHN0dWJiaW5nXG4gKi9cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbG9nXzEubG9nKFwic3R1Yi5pbml0XCIsIHNhZmFyaS5leHRlbnNpb24sIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQsIHdpbmRvdy5zYWZhcmksIHdpbmRvdy5jaHJvbWUpO1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQ7XG4gICAgaWYgKCFzY3JpcHQgfHwgIShzY3JpcHQgaW5zdGFuY2VvZiBIVE1MU2NyaXB0RWxlbWVudCkpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiRVJST1I6IFVuYWJsZSB0byBpbml0IGNhc3Qgc3R1YnM7IHVuZXhwZWN0ZWQgY3VycmVudFNjcmlwdDpcIiwgc2NyaXB0KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IGNocm9tZV8xLkNocm9tZUNvbnRyb2xsZXIoKTtcbiAgICBjb25zdCBjYXN0ID0gbmV3IGNhc3RfMS5DYXN0U3R1YihuZXcgY2xpZW50X2lvXzEuQ2xpZW50SU8oc2NyaXB0KSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMod2luZG93LCB7XG4gICAgICAgIGNocm9tZToge1xuICAgICAgICAgICAgdmFsdWU6IGNvbnRyb2xsZXIuY2hyb21lLFxuICAgICAgICB9LFxuICAgICAgICBjYXN0OiB7XG4gICAgICAgICAgICB2YWx1ZTogY2FzdCxcbiAgICAgICAgfSxcbiAgICAgICAgX19vbkdDYXN0QXBpQXZhaWxhYmxlOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgbG9nXzEubG9nKFwiUkVBRCBvbkdDYXN0QXBpQXZhaWxhYmxlIDwtIFwiLCB0eXBlb2YgY29udHJvbGxlci5vbkdDYXN0QXBpQXZhaWxhYmxlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udHJvbGxlci5vbkdDYXN0QXBpQXZhaWxhYmxlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGxvZ18xLmxvZyhcInNldCBvbkdDYXN0QXBpQXZhaWxhYmxlIDwtIFwiLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5zZXRHQ2FzdEFwaUF2YWlsYWJsZUhhbmRsZXIodmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9KTtcbiAgICBsb2dfMS5sb2coXCJDcmVhdGVkIGNocm9tZWNhc3QgQVBJIHN0dWJcIiwgY29udHJvbGxlci5jaHJvbWUpO1xufVxuZXhwb3J0cy5pbml0ID0gaW5pdDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9pbmRleC50c1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=