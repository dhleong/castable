/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
const log_1 = __webpack_require__(/*! ../log */ "./castable Extension/ts/log.ts");
const enums_1 = __webpack_require__(/*! ../chrome.cast/enums */ "./castable Extension/ts/chrome.cast/enums.ts");
const enums_2 = __webpack_require__(/*! ./enums */ "./castable Extension/ts/cast.framework/enums.ts");
class CastContext {
    constructor(io) {
        this.io = io;
    }
    addEventListener(event, handler) {
        log_1.log("CastContext.addEventListener", event, handler);
    }
    getCastState() {
        log_1.log("CastContext.getCastState");
        // TODO
        return enums_2.CastState[enums_2.CastState.NO_DEVICES_AVAILABLE];
    }
    getCurrentSession() {
        log_1.log("CastContext.getCurrentSession");
        // TODO
        return null;
    }
    getSessionState() {
        log_1.log("CastContext.getSessionState");
        // TODO
        return enums_2.SessionState[enums_2.SessionState.NO_SESSION];
    }
    removeEventListener(event, handler) {
        log_1.log("CastContext.removeEventListener", event, handler);
    }
    requestSession() {
        return __awaiter(this, void 0, void 0, function* () {
            log_1.log("CastContext.requestSession");
            try {
                const result = yield this.io.requestSession(this.options);
                log_1.log("requestSession -> ", result);
                return null;
            }
            catch (e) {
                log_1.log("requestSession ERROR: ", e);
                if (e.id === "cancelled") {
                    return enums_1.ErrorCode[enums_1.ErrorCode.CANCEL];
                }
                return enums_1.ErrorCode[enums_1.ErrorCode.SESSION_ERROR];
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
    CastState[CastState["NO_DEVICES_AVAILABLE"] = 0] = "NO_DEVICES_AVAILABLE";
    CastState[CastState["NOT_CONNECTED"] = 1] = "NOT_CONNECTED";
    CastState[CastState["CONNECTING"] = 2] = "CONNECTING";
    CastState[CastState["CONNECTED"] = 3] = "CONNECTED";
})(CastState = exports.CastState || (exports.CastState = {}));
var SessionState;
(function (SessionState) {
    SessionState[SessionState["NO_SESSION"] = 0] = "NO_SESSION";
    SessionState[SessionState["SESSION_STARTING"] = 1] = "SESSION_STARTING";
    SessionState[SessionState["SESSION_STARTED"] = 2] = "SESSION_STARTED";
    SessionState[SessionState["SESSION_START_FAILED"] = 3] = "SESSION_START_FAILED";
    SessionState[SessionState["SESSION_ENDING"] = 4] = "SESSION_ENDING";
    SessionState[SessionState["SESSION_ENDED"] = 5] = "SESSION_ENDED";
    SessionState[SessionState["SESSION_RESUMED"] = 6] = "SESSION_RESUMED";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jYXN0LmZyYW1ld29yay9jYXN0LWNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvY2FzdC5mcmFtZXdvcmsvZW51bXMudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvY2FzdC50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jaHJvbWUuY2FzdC9lbnVtcy50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jaHJvbWUuY2FzdC9tZWRpYS50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jaHJvbWUudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvY2xpZW50LWlvLnRzIiwid2VicGFjazovL2Nhc3RhYmxlLy4vY2FzdGFibGUgRXh0ZW5zaW9uL3RzL2NvbnN0cy50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9leHRlbnNpb24udHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvbG9nLnRzIiwid2VicGFjazovL2Nhc3RhYmxlLy4vY2FzdGFibGUgRXh0ZW5zaW9uL3RzL3N0dWIudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxtQkFBbUI7QUFDbkIsY0FBYyxtQkFBTyxDQUFDLDhDQUFRO0FBQzlCLGdCQUFnQixtQkFBTyxDQUFDLDBFQUFzQjtBQUM5QyxnQkFBZ0IsbUJBQU8sQ0FBQyxnRUFBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pFTjtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCw0QkFBNEIsR0FBRyxvQkFBb0IsR0FBRyxpQkFBaUI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxvQ0FBb0MsaUJBQWlCLEtBQUs7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwQ0FBMEMsb0JBQW9CLEtBQUs7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBEQUEwRCw0QkFBNEIsS0FBSzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCL0U7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsZ0JBQWdCO0FBQ2hCLHVCQUF1QixtQkFBTyxDQUFDLDZGQUErQjtBQUM5RCxnQkFBZ0IsbUJBQU8sQ0FBQywrRUFBd0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7OztBQzFCSDtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxpQkFBaUIsR0FBRyxzQkFBc0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsOENBQThDLHNCQUFzQixLQUFLO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0NBQW9DLGlCQUFpQixLQUFLOzs7Ozs7Ozs7Ozs7Ozs7O0FDckI5QztBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSSjtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCx3QkFBd0IsR0FBRyxrQkFBa0I7QUFDN0MsZ0JBQWdCLG1CQUFPLENBQUMseUVBQXFCO0FBQzdDLGNBQWMsbUJBQU8sQ0FBQyw2Q0FBTztBQUM3QixnQkFBZ0IsbUJBQU8sQ0FBQyx5RUFBcUI7QUFDN0M7QUFDQTtBQUNBLG9DQUFvQyxLQUFLO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7Ozs7Ozs7Ozs7Ozs7QUNqRFg7QUFDYjtBQUNBLDJCQUEyQiwrREFBK0QsZ0JBQWdCLEVBQUUsRUFBRTtBQUM5RztBQUNBLG1DQUFtQyxNQUFNLDZCQUE2QixFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ2pHLGtDQUFrQyxNQUFNLGlDQUFpQyxFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ3BHLCtCQUErQixxRkFBcUY7QUFDcEg7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsZ0JBQWdCO0FBQ2hCLGlCQUFpQixtQkFBTyxDQUFDLG1EQUFVO0FBQ25DLGNBQWMsbUJBQU8sQ0FBQyw2Q0FBTztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRSxVQUFVLGdCQUFnQjtBQUMvRixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuRUg7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsdUJBQXVCLEdBQUcsMEJBQTBCLEdBQUcsMEJBQTBCO0FBQ2pGLDBCQUEwQjtBQUMxQiwwQkFBMEI7QUFDMUIsdUJBQXVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTFY7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Qsc0JBQXNCLEdBQUcsMkJBQTJCLEdBQUcsd0JBQXdCLEdBQUcsdUJBQXVCO0FBQ3pHLGNBQWMsbUJBQU8sQ0FBQyw2Q0FBTztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjs7Ozs7Ozs7Ozs7Ozs7O0FDdkRUO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGlCQUFpQixtQkFBTyxDQUFDLG1EQUFVO0FBQ25DLG9CQUFvQixtQkFBTyxDQUFDLHlEQUFhO0FBQ3pDLGNBQWMsbUJBQU8sQ0FBQyw2Q0FBTztBQUM3QixlQUFlLG1CQUFPLENBQUMsK0NBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RWE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsWUFBWSxHQUFHLFdBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWQztBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxZQUFZO0FBQ1osZUFBZSxtQkFBTyxDQUFDLCtDQUFRO0FBQy9CLGlCQUFpQixtQkFBTyxDQUFDLG1EQUFVO0FBQ25DLG9CQUFvQixtQkFBTyxDQUFDLHlEQUFhO0FBQ3pDLGNBQWMsbUJBQU8sQ0FBQyw2Q0FBTztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZOzs7Ozs7O1VDdkNaO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiY2FzdGFibGUtc2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ2FzdENvbnRleHQgPSB2b2lkIDA7XG5jb25zdCBsb2dfMSA9IHJlcXVpcmUoXCIuLi9sb2dcIik7XG5jb25zdCBlbnVtc18xID0gcmVxdWlyZShcIi4uL2Nocm9tZS5jYXN0L2VudW1zXCIpO1xuY29uc3QgZW51bXNfMiA9IHJlcXVpcmUoXCIuL2VudW1zXCIpO1xuY2xhc3MgQ2FzdENvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKGlvKSB7XG4gICAgICAgIHRoaXMuaW8gPSBpbztcbiAgICB9XG4gICAgYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcikge1xuICAgICAgICBsb2dfMS5sb2coXCJDYXN0Q29udGV4dC5hZGRFdmVudExpc3RlbmVyXCIsIGV2ZW50LCBoYW5kbGVyKTtcbiAgICB9XG4gICAgZ2V0Q2FzdFN0YXRlKCkge1xuICAgICAgICBsb2dfMS5sb2coXCJDYXN0Q29udGV4dC5nZXRDYXN0U3RhdGVcIik7XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgcmV0dXJuIGVudW1zXzIuQ2FzdFN0YXRlW2VudW1zXzIuQ2FzdFN0YXRlLk5PX0RFVklDRVNfQVZBSUxBQkxFXTtcbiAgICB9XG4gICAgZ2V0Q3VycmVudFNlc3Npb24oKSB7XG4gICAgICAgIGxvZ18xLmxvZyhcIkNhc3RDb250ZXh0LmdldEN1cnJlbnRTZXNzaW9uXCIpO1xuICAgICAgICAvLyBUT0RPXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBnZXRTZXNzaW9uU3RhdGUoKSB7XG4gICAgICAgIGxvZ18xLmxvZyhcIkNhc3RDb250ZXh0LmdldFNlc3Npb25TdGF0ZVwiKTtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICByZXR1cm4gZW51bXNfMi5TZXNzaW9uU3RhdGVbZW51bXNfMi5TZXNzaW9uU3RhdGUuTk9fU0VTU0lPTl07XG4gICAgfVxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiQ2FzdENvbnRleHQucmVtb3ZlRXZlbnRMaXN0ZW5lclwiLCBldmVudCwgaGFuZGxlcik7XG4gICAgfVxuICAgIHJlcXVlc3RTZXNzaW9uKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgbG9nXzEubG9nKFwiQ2FzdENvbnRleHQucmVxdWVzdFNlc3Npb25cIik7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHlpZWxkIHRoaXMuaW8ucmVxdWVzdFNlc3Npb24odGhpcy5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICBsb2dfMS5sb2coXCJyZXF1ZXN0U2Vzc2lvbiAtPiBcIiwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgbG9nXzEubG9nKFwicmVxdWVzdFNlc3Npb24gRVJST1I6IFwiLCBlKTtcbiAgICAgICAgICAgICAgICBpZiAoZS5pZCA9PT0gXCJjYW5jZWxsZWRcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW51bXNfMS5FcnJvckNvZGVbZW51bXNfMS5FcnJvckNvZGUuQ0FOQ0VMXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVudW1zXzEuRXJyb3JDb2RlW2VudW1zXzEuRXJyb3JDb2RlLlNFU1NJT05fRVJST1JdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0TGF1bmNoQ3JlZGVudGlhbHNEYXRhKGRhdGEpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiQ2FzdENvbnRleHQuc2V0TGF1bmNoQ3JlZGVudGlhbHNEYXRhXCIsIGRhdGEpO1xuICAgIH1cbiAgICBzZXRPcHRpb25zKG9wdHMpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiQ2FzdENvbnRleHQuc2V0T3B0aW9uc1wiLCBvcHRzKTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0cztcbiAgICB9XG59XG5leHBvcnRzLkNhc3RDb250ZXh0ID0gQ2FzdENvbnRleHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ2FzdENvbnRleHRFdmVudFR5cGUgPSBleHBvcnRzLlNlc3Npb25TdGF0ZSA9IGV4cG9ydHMuQ2FzdFN0YXRlID0gdm9pZCAwO1xudmFyIENhc3RTdGF0ZTtcbihmdW5jdGlvbiAoQ2FzdFN0YXRlKSB7XG4gICAgQ2FzdFN0YXRlW0Nhc3RTdGF0ZVtcIk5PX0RFVklDRVNfQVZBSUxBQkxFXCJdID0gMF0gPSBcIk5PX0RFVklDRVNfQVZBSUxBQkxFXCI7XG4gICAgQ2FzdFN0YXRlW0Nhc3RTdGF0ZVtcIk5PVF9DT05ORUNURURcIl0gPSAxXSA9IFwiTk9UX0NPTk5FQ1RFRFwiO1xuICAgIENhc3RTdGF0ZVtDYXN0U3RhdGVbXCJDT05ORUNUSU5HXCJdID0gMl0gPSBcIkNPTk5FQ1RJTkdcIjtcbiAgICBDYXN0U3RhdGVbQ2FzdFN0YXRlW1wiQ09OTkVDVEVEXCJdID0gM10gPSBcIkNPTk5FQ1RFRFwiO1xufSkoQ2FzdFN0YXRlID0gZXhwb3J0cy5DYXN0U3RhdGUgfHwgKGV4cG9ydHMuQ2FzdFN0YXRlID0ge30pKTtcbnZhciBTZXNzaW9uU3RhdGU7XG4oZnVuY3Rpb24gKFNlc3Npb25TdGF0ZSkge1xuICAgIFNlc3Npb25TdGF0ZVtTZXNzaW9uU3RhdGVbXCJOT19TRVNTSU9OXCJdID0gMF0gPSBcIk5PX1NFU1NJT05cIjtcbiAgICBTZXNzaW9uU3RhdGVbU2Vzc2lvblN0YXRlW1wiU0VTU0lPTl9TVEFSVElOR1wiXSA9IDFdID0gXCJTRVNTSU9OX1NUQVJUSU5HXCI7XG4gICAgU2Vzc2lvblN0YXRlW1Nlc3Npb25TdGF0ZVtcIlNFU1NJT05fU1RBUlRFRFwiXSA9IDJdID0gXCJTRVNTSU9OX1NUQVJURURcIjtcbiAgICBTZXNzaW9uU3RhdGVbU2Vzc2lvblN0YXRlW1wiU0VTU0lPTl9TVEFSVF9GQUlMRURcIl0gPSAzXSA9IFwiU0VTU0lPTl9TVEFSVF9GQUlMRURcIjtcbiAgICBTZXNzaW9uU3RhdGVbU2Vzc2lvblN0YXRlW1wiU0VTU0lPTl9FTkRJTkdcIl0gPSA0XSA9IFwiU0VTU0lPTl9FTkRJTkdcIjtcbiAgICBTZXNzaW9uU3RhdGVbU2Vzc2lvblN0YXRlW1wiU0VTU0lPTl9FTkRFRFwiXSA9IDVdID0gXCJTRVNTSU9OX0VOREVEXCI7XG4gICAgU2Vzc2lvblN0YXRlW1Nlc3Npb25TdGF0ZVtcIlNFU1NJT05fUkVTVU1FRFwiXSA9IDZdID0gXCJTRVNTSU9OX1JFU1VNRURcIjtcbn0pKFNlc3Npb25TdGF0ZSA9IGV4cG9ydHMuU2Vzc2lvblN0YXRlIHx8IChleHBvcnRzLlNlc3Npb25TdGF0ZSA9IHt9KSk7XG52YXIgQ2FzdENvbnRleHRFdmVudFR5cGU7XG4oZnVuY3Rpb24gKENhc3RDb250ZXh0RXZlbnRUeXBlKSB7XG4gICAgQ2FzdENvbnRleHRFdmVudFR5cGVbXCJDQVNUX1NUQVRFX0NIQU5HRURcIl0gPSBcImNhc3RzdGF0ZWNoYW5nZWRcIjtcbiAgICBDYXN0Q29udGV4dEV2ZW50VHlwZVtcIlNFU1NJT05fU1RBVEVfQ0hBTkdFRFwiXSA9IFwic2Vzc2lvbnN0YXRlY2hhbmdlZFwiO1xufSkoQ2FzdENvbnRleHRFdmVudFR5cGUgPSBleHBvcnRzLkNhc3RDb250ZXh0RXZlbnRUeXBlIHx8IChleHBvcnRzLkNhc3RDb250ZXh0RXZlbnRUeXBlID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DYXN0U3R1YiA9IHZvaWQgMDtcbmNvbnN0IGNhc3RfY29udGV4dF8xID0gcmVxdWlyZShcIi4vY2FzdC5mcmFtZXdvcmsvY2FzdC1jb250ZXh0XCIpO1xuY29uc3QgZW51bXNfMSA9IHJlcXVpcmUoXCIuL2Nhc3QuZnJhbWV3b3JrL2VudW1zXCIpO1xuY2xhc3MgU3RhdGljQ2xhc3NDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3RvcihteUluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMubXlJbnN0YW5jZSA9IG15SW5zdGFuY2U7XG4gICAgfVxuICAgIGdldEluc3RhbmNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5teUluc3RhbmNlO1xuICAgIH1cbn1cbmNsYXNzIEZyYW1ld29ya1N0dWIge1xuICAgIGNvbnN0cnVjdG9yKGlvKSB7XG4gICAgICAgIHRoaXMuQ2FzdFN0YXRlID0gZW51bXNfMS5DYXN0U3RhdGU7XG4gICAgICAgIHRoaXMuU2Vzc2lvblN0YXRlID0gZW51bXNfMS5TZXNzaW9uU3RhdGU7XG4gICAgICAgIHRoaXMuQ2FzdENvbnRleHRFdmVudFR5cGUgPSBlbnVtc18xLkNhc3RDb250ZXh0RXZlbnRUeXBlO1xuICAgICAgICB0aGlzLkNhc3RDb250ZXh0ID0gbmV3IFN0YXRpY0NsYXNzQ29udGV4dChuZXcgY2FzdF9jb250ZXh0XzEuQ2FzdENvbnRleHQoaW8pKTtcbiAgICB9XG59XG5jbGFzcyBDYXN0U3R1YiB7XG4gICAgY29uc3RydWN0b3IoaW8pIHtcbiAgICAgICAgdGhpcy5mcmFtZXdvcmsgPSBuZXcgRnJhbWV3b3JrU3R1Yihpbyk7XG4gICAgfVxufVxuZXhwb3J0cy5DYXN0U3R1YiA9IENhc3RTdHViO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkVycm9yQ29kZSA9IGV4cG9ydHMuQXV0b0pvaW5Qb2xpY3kgPSB2b2lkIDA7XG52YXIgQXV0b0pvaW5Qb2xpY3k7XG4oZnVuY3Rpb24gKEF1dG9Kb2luUG9saWN5KSB7XG4gICAgQXV0b0pvaW5Qb2xpY3lbQXV0b0pvaW5Qb2xpY3lbXCJUQUJfQU5EX09SSUdJTl9TQ09QRURcIl0gPSAwXSA9IFwiVEFCX0FORF9PUklHSU5fU0NPUEVEXCI7XG4gICAgQXV0b0pvaW5Qb2xpY3lbQXV0b0pvaW5Qb2xpY3lbXCJPUklHSU5fU0NPUEVEXCJdID0gMV0gPSBcIk9SSUdJTl9TQ09QRURcIjtcbiAgICBBdXRvSm9pblBvbGljeVtBdXRvSm9pblBvbGljeVtcIlBBR0VfU0NPUEVEXCJdID0gMl0gPSBcIlBBR0VfU0NPUEVEXCI7XG59KShBdXRvSm9pblBvbGljeSA9IGV4cG9ydHMuQXV0b0pvaW5Qb2xpY3kgfHwgKGV4cG9ydHMuQXV0b0pvaW5Qb2xpY3kgPSB7fSkpO1xudmFyIEVycm9yQ29kZTtcbihmdW5jdGlvbiAoRXJyb3JDb2RlKSB7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIkNBTkNFTFwiXSA9IDBdID0gXCJDQU5DRUxcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiVElNRU9VVFwiXSA9IDFdID0gXCJUSU1FT1VUXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIkFQSV9OT1RfSU5JVElBTElaRURcIl0gPSAyXSA9IFwiQVBJX05PVF9JTklUSUFMSVpFRFwiO1xuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJJTlZBTElEX1BBUkFNRVRFUlwiXSA9IDNdID0gXCJJTlZBTElEX1BBUkFNRVRFUlwiO1xuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJFWFRFTlNJT05fTk9UX0NPTVBBVElCTEVcIl0gPSA0XSA9IFwiRVhURU5TSU9OX05PVF9DT01QQVRJQkxFXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIkVYVEVOU0lPTl9NSVNTSU5HXCJdID0gNV0gPSBcIkVYVEVOU0lPTl9NSVNTSU5HXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIlJFQ0VJVkVSX1VOQVZBSUxBQkxFXCJdID0gNl0gPSBcIlJFQ0VJVkVSX1VOQVZBSUxBQkxFXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIlNFU1NJT05fRVJST1JcIl0gPSA3XSA9IFwiU0VTU0lPTl9FUlJPUlwiO1xuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJDSEFOTkVMX0VSUk9SXCJdID0gOF0gPSBcIkNIQU5ORUxfRVJST1JcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiTE9BRF9NRURJQV9GQUlMRURcIl0gPSA5XSA9IFwiTE9BRF9NRURJQV9GQUlMRURcIjtcbn0pKEVycm9yQ29kZSA9IGV4cG9ydHMuRXJyb3JDb2RlIHx8IChleHBvcnRzLkVycm9yQ29kZSA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTWVkaWFTdHViID0gdm9pZCAwO1xuY2xhc3MgTWVkaWFTdHViIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ERUZBVUxUX01FRElBX1JFQ0VJVkVSX0FQUF9JRCA9IFwiQ0MxQUQ4NDVcIjtcbiAgICB9XG59XG5leHBvcnRzLk1lZGlhU3R1YiA9IE1lZGlhU3R1YjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DaHJvbWVDb250cm9sbGVyID0gZXhwb3J0cy5DaHJvbWVTdHViID0gdm9pZCAwO1xuY29uc3QgbWVkaWFfMSA9IHJlcXVpcmUoXCIuL2Nocm9tZS5jYXN0L21lZGlhXCIpO1xuY29uc3QgbG9nXzEgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5jb25zdCBlbnVtc18xID0gcmVxdWlyZShcIi4vY2hyb21lLmNhc3QvZW51bXNcIik7XG5jbGFzcyBDYXN0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoY29kZSwgb3B0X2Rlc2NyaXB0aW9uLCBvcHRfZGV0YWlscykge1xuICAgICAgICBzdXBlcihgY2hyb21lLmNhc3QuRXJyb3I6ICR7Y29kZX1gKTtcbiAgICAgICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICAgICAgdGhpcy5vcHRfZGVzY3JpcHRpb24gPSBvcHRfZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMub3B0X2RldGFpbHMgPSBvcHRfZGV0YWlscztcbiAgICB9XG59XG5jbGFzcyBDaHJvbWVDYXN0U3R1YiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuQXV0b0pvaW5Qb2xpY3kgPSBlbnVtc18xLkF1dG9Kb2luUG9saWN5O1xuICAgICAgICB0aGlzLm1lZGlhID0gbmV3IG1lZGlhXzEuTWVkaWFTdHViKCk7XG4gICAgfVxuICAgIGluaXRpYWxpemUoYXBpQ29uZmlnLCBvblN1Y2Nlc3MsIG9uRXJyb3IpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiSU5JVElBTElaRVwiLCBhcGlDb25maWcpO1xuICAgIH1cbn1cbmNsYXNzIENocm9tZVN0dWIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhc3RTdHViID0gbmV3IENocm9tZUNhc3RTdHViKCk7XG4gICAgfVxuICAgIGdldCBjYXN0KCkge1xuICAgICAgICBsb2dfMS5sb2coXCJSRUFEIGNocm9tZS5jYXN0XCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5jYXN0U3R1YjtcbiAgICB9XG59XG5leHBvcnRzLkNocm9tZVN0dWIgPSBDaHJvbWVTdHViO1xuY2xhc3MgQ2hyb21lQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2hyb21lID0gbmV3IENocm9tZVN0dWIoKTtcbiAgICAgICAgdGhpcy5vbkdDYXN0QXBpQXZhaWxhYmxlID0gKGlzQXZhaWxhYmxlLCBlcnIpID0+IHtcbiAgICAgICAgICAgIGxvZ18xLmxvZyhcInJlY2VpdmVkIEdDYXN0IEFQSSBBdmFpbGFiaWxpdHk6IFwiLCBpc0F2YWlsYWJsZSwgZXJyKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc2V0R0Nhc3RBcGlBdmFpbGFibGVIYW5kbGVyKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMucmVjZWl2ZWRBcGlBdmFpbGFibGVIYW5kbGVyID0gY2FsbGJhY2s7XG4gICAgfVxuICAgIG5vdGlmeUdDYXN0QXZhaWxhYmxlKGlzQXZhaWxhYmxlKSB7XG4gICAgICAgIGlmICh0aGlzLnJlY2VpdmVkQXBpQXZhaWxhYmxlSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5yZWNlaXZlZEFwaUF2YWlsYWJsZUhhbmRsZXIoaXNBdmFpbGFibGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5DaHJvbWVDb250cm9sbGVyID0gQ2hyb21lQ29udHJvbGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNsaWVudElPID0gdm9pZCAwO1xuY29uc3QgY29uc3RzXzEgPSByZXF1aXJlKFwiLi9jb25zdHNcIik7XG5jb25zdCBsb2dfMSA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcbmNsYXNzIEZ1dHVyZSB7XG4gICAgY29uc3RydWN0b3IocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHRoaXMucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIHRoaXMucmVqZWN0ID0gcmVqZWN0O1xuICAgIH1cbn1cbmNsYXNzIENsaWVudElPIHtcbiAgICBjb25zdHJ1Y3RvcihzY3JpcHQpIHtcbiAgICAgICAgdGhpcy5zY3JpcHQgPSBzY3JpcHQ7XG4gICAgICAgIHRoaXMubmV4dFJlcXVlc3RJZCA9IDA7XG4gICAgICAgIHRoaXMucGVuZGluZ1Jlc29sdmVzID0ge307XG4gICAgICAgIHRoaXMucmVxdWVzdFNlc3Npb24gPSB0aGlzLmNyZWF0ZVJwYyhcInJlcXVlc3RTZXNzaW9uXCIpO1xuICAgICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcihjb25zdHNfMS5JUENfSU5DT01JTkdfRVZFTlQsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBldmVudC5kZXRhaWw7XG4gICAgICAgICAgICBsb2dfMS5sb2coXCJzdHViIHJlY2VpdmVkIGlwYyBtZXNzYWdlXCIsIGRhdGEpO1xuICAgICAgICAgICAgaWYgKGRhdGEuYXJncyAmJiBkYXRhLmFyZ3MucmVxdWVzdElkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmdXR1cmUgPSB0aGlzLnBlbmRpbmdSZXNvbHZlc1tkYXRhLmFyZ3MucmVxdWVzdElkXTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5hcmdzLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1dHVyZS5yZWplY3QoZGF0YS5hcmdzLmVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1dHVyZS5yZXNvbHZlKGRhdGEuYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcGF0Y2ggYSBvbmUtb2ZmIElQQyBtZXNzYWdlIHRvIHRoZSBleHRlbnNpb24uXG4gICAgICovXG4gICAgZGlzcGF0Y2hNZXNzYWdlKG5hbWUsIGFyZ3MpIHtcbiAgICAgICAgdGhpcy5zY3JpcHQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoY29uc3RzXzEuSVBDX09VVEdPSU5HX0VWRU5ULCB7XG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgIGFyZ3MsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIHJlcXVlc3QobmFtZSwgYXJncykge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMubmV4dFJlcXVlc3RJZCsrO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nUmVzb2x2ZXNbaWRdID0gbmV3IEZ1dHVyZShyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE1lc3NhZ2UobmFtZSwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBhcmdzKSwgeyByZXF1ZXN0SWQ6IGlkIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNyZWF0ZVJwYyhuYW1lKSB7XG4gICAgICAgIHJldHVybiAocmVxKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIHRoaXMucmVxdWVzdChuYW1lLCByZXEpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLkNsaWVudElPID0gQ2xpZW50SU87XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU1RVQl9FTEVNRU5UX0lEID0gZXhwb3J0cy5JUENfSU5DT01JTkdfRVZFTlQgPSBleHBvcnRzLklQQ19PVVRHT0lOR19FVkVOVCA9IHZvaWQgMDtcbmV4cG9ydHMuSVBDX09VVEdPSU5HX0VWRU5UID0gXCJjYXN0YWJsZS1icm93c2VyLT5leHRlbnNpb25cIjtcbmV4cG9ydHMuSVBDX0lOQ09NSU5HX0VWRU5UID0gXCJjYXN0YWJsZS1leHRlbnNpb24tPmJyb3dzZXJcIjtcbmV4cG9ydHMuU1RVQl9FTEVNRU5UX0lEID0gXCJjYXN0YWJsZS5zY3JpcHRcIjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FdmVudFJlZ2lzdHJhciA9IGV4cG9ydHMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGV4cG9ydHMuYWRkRXZlbnRMaXN0ZW5lciA9IGV4cG9ydHMuZGlzcGF0Y2hNZXNzYWdlID0gdm9pZCAwO1xuY29uc3QgbG9nXzEgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5mdW5jdGlvbiBkaXNwYXRjaE1lc3NhZ2UobWVzc2FnZU5hbWUsIGNvbnRlbnQpIHtcbiAgICBjb25zdCBlID0gc2FmYXJpLmV4dGVuc2lvbjtcbiAgICBlLmRpc3BhdGNoTWVzc2FnZShtZXNzYWdlTmFtZSwgY29udGVudCk7XG59XG5leHBvcnRzLmRpc3BhdGNoTWVzc2FnZSA9IGRpc3BhdGNoTWVzc2FnZTtcbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgY29uc3QgcGFnZSA9IHNhZmFyaS5zZWxmO1xuICAgIHBhZ2UuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgaGFuZGxlcik7XG59XG5leHBvcnRzLmFkZEV2ZW50TGlzdGVuZXIgPSBhZGRFdmVudExpc3RlbmVyO1xuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICBjb25zdCBwYWdlID0gc2FmYXJpLnNlbGY7XG4gICAgcGFnZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBoYW5kbGVyKTtcbn1cbmV4cG9ydHMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHJlbW92ZUV2ZW50TGlzdGVuZXI7XG5jbGFzcyBFdmVudFJlZ2lzdHJhciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlcnMgPSB7fTtcbiAgICAgICAgdGhpcy5ib3VuZE9uRXZlbnQgPSB0aGlzLm9uRXZlbnQuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgcmVnaXN0ZXIobWVzc2FnZSwgaGFuZGxlcikge1xuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHRoaXMuaGFuZGxlcnMpLmxlbmd0aCkge1xuICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5ib3VuZE9uRXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGFuZGxlcnNbbWVzc2FnZV0gPSBoYW5kbGVyO1xuICAgIH1cbiAgICBvbihtZXNzYWdlLCBoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIobWVzc2FnZSwgaGFuZGxlcik7XG4gICAgfVxuICAgIG9uY2UobWVzc2FnZSwgaGFuZGxlcikge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKG1lc3NhZ2UsICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVucmVnaXN0ZXIobWVzc2FnZSk7XG4gICAgICAgICAgICBoYW5kbGVyKC4uLmFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdW5yZWdpc3RlcihtZXNzYWdlKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmhhbmRsZXJzW21lc3NhZ2VdO1xuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHRoaXMuaGFuZGxlcnMpLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5ib3VuZE9uRXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IHRoaXMuaGFuZGxlcnNbZXZlbnQubmFtZV07XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgICBoYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ18xLndhcm4oXCJObyBoYW5kbGVyIHJlZ2lzdGVyZWQgZm9yOlwiLCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkV2ZW50UmVnaXN0cmFyID0gRXZlbnRSZWdpc3RyYXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvbnN0c18xID0gcmVxdWlyZShcIi4vY29uc3RzXCIpO1xuY29uc3QgZXh0ZW5zaW9uXzEgPSByZXF1aXJlKFwiLi9leHRlbnNpb25cIik7XG5jb25zdCBsb2dfMSA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcbmNvbnN0IHN0dWJfMSA9IHJlcXVpcmUoXCIuL3N0dWJcIik7XG5mdW5jdGlvbiByZWdpc3RlckNhc3QocmVnaXN0cmFyKSB7XG4gICAgbG9nXzEubG9nKFwicmVnaXN0ZXJpbmcgY2FzdCBzdHViXCIpO1xuICAgIGlmICghZG9jdW1lbnQuaGVhZCkge1xuICAgICAgICBsb2dfMS5sb2coXCJubyBkb2N1bWVudC5oZWFkXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghd2luZG93LnNhZmFyaSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJyZWdpc3RlckNhc3QgTVVTVCBOT1QgYmUgY2FsbGVkIGZyb20gcGFnZSBjb250ZXh0XCIpO1xuICAgIH1cbiAgICAvLyBpbnNlcnQgc2NyaXB0IGludG8gdGhlIHBhZ2UncyBjb250ZXh0IHNvIGl0IGhhcyBhY2Nlc3MgdG9cbiAgICAvLyBvdXIgY2hyb21lY2FzdCBzdHVic1xuICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgIG5ld0VsZW1lbnQuc3JjID0gc2FmYXJpLmV4dGVuc2lvbi5iYXNlVVJJICsgXCJjYXN0YWJsZS1zY3JpcHQuanNcIjtcbiAgICBuZXdFbGVtZW50LmlkID0gY29uc3RzXzEuU1RVQl9FTEVNRU5UX0lEO1xuICAgIG5ld0VsZW1lbnQuY2hhcnNldCA9ICd1dGYtOCc7XG4gICAgbmV3RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGNvbnN0c18xLklQQ19PVVRHT0lOR19FVkVOVCwgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBkYXRhID0gZXZlbnQuZGV0YWlsO1xuICAgICAgICBsb2dfMS5sb2coXCJmb3J3YXJkaW5nIG1lc3NhZ2U6XCIsIGRhdGEpO1xuICAgICAgICBleHRlbnNpb25fMS5kaXNwYXRjaE1lc3NhZ2UoZGF0YS5uYW1lLCBkYXRhLmFyZ3MpO1xuICAgIH0pO1xuICAgIHJlZ2lzdHJhci5vbihjb25zdHNfMS5JUENfSU5DT01JTkdfRVZFTlQsIGV2ZW50ID0+IHtcbiAgICAgICAgbG9nXzEubG9nKFwiZXh0IHJlY2VpdmVkIGlwYyBtZXNzYWdlXCIsIGV2ZW50KTtcbiAgICAgICAgbmV3RWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChjb25zdHNfMS5JUENfSU5DT01JTkdfRVZFTlQsIHtcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgIG5hbWU6IGV2ZW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgYXJnczogZXZlbnQubWVzc2FnZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgICB9KSk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChuZXdFbGVtZW50KTtcbn1cbmZ1bmN0aW9uIGluaXRFeHQoKSB7XG4gICAgaWYgKHdpbmRvdy50b3AgIT09IHdpbmRvdykge1xuICAgICAgICBsb2dfMS5sb2coXCJpZ25vcmluZyBub24tdG9wIHdpbmRvdzpcIiwgd2luZG93KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29uc3RzXzEuU1RVQl9FTEVNRU5UX0lEKSkge1xuICAgICAgICBsb2dfMS5sb2coXCJjYXN0YWJsZS5zY3JpcHQgYWxyZWFkeSBlbnF1ZXVlZFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBOT1RFOiBpbiBvcmRlciBmb3Igb3VyIHN0dWIgdG8gYmUgbG9hZGVkIGludG8gdGhlIGFjdHVhbFxuICAgIC8vIHBhZ2UncyBjb250ZXh0LCB3ZSBoYXZlIHRvIHdyaXRlIGEgPHNjcmlwdD4gaW50byB0aGUgRE9NXG4gICAgLy8gd2l0aCAqanVzdCogdGhlIHJpZ2h0IHRpbWluZy4uLlxuICAgIC8vIEhlcmUsIHdlIHdhaXQgdW50aWwgdGhlIERPTSBjb250ZW50IGhhcyBsb2FkZWQsIGxldCB0aGVcbiAgICAvLyBTd2lmdCBleHRlbnNpb24ga25vdywgYW5kIHdhaXQgZm9yIGl0IHRvIHRlbGwgdXMgaXQncyBzYWZlXG4gICAgLy8gdG8gcmVnaXN0ZXJcbiAgICBsb2dfMS5sb2coXCJpbml0RXh0XCIsIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQsIHNhZmFyaSwgd2luZG93LmNocm9tZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgICAgICBsb2dfMS5sb2coXCJjb250ZW50IGxvYWRlZC4uLlwiKTtcbiAgICAgICAgY29uc3QgcmVnaXN0cmFyID0gbmV3IGV4dGVuc2lvbl8xLkV2ZW50UmVnaXN0cmFyKCk7XG4gICAgICAgIHJlZ2lzdHJhci5vbmNlKFwicmVnaXN0ZXItY2FzdFwiLCAoKSA9PiB7XG4gICAgICAgICAgICByZWdpc3RlckNhc3QocmVnaXN0cmFyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGV4dGVuc2lvbl8xLmRpc3BhdGNoTWVzc2FnZShcImNvbnRlbnQtbG9hZGVkXCIpO1xuICAgICAgICBsb2dfMS5sb2coXCJkaXNwYXRjaGVkIGNvbnRlbnQtbG9hZGVkIVwiKTtcbiAgICB9KTtcbn1cbmlmICh3aW5kb3cuc2FmYXJpICYmIHdpbmRvdy5zYWZhcmkuZXh0ZW5zaW9uKSB7XG4gICAgaW5pdEV4dCgpO1xufVxuZWxzZSB7XG4gICAgc3R1Yl8xLmluaXQoKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy53YXJuID0gZXhwb3J0cy5sb2cgPSB2b2lkIDA7XG5mdW5jdGlvbiBsb2coLi4uYXJncykge1xuICAgIGNvbnNvbGUubG9nKFwiQ0FTVEFCTEU6XCIsIC4uLmFyZ3MpO1xufVxuZXhwb3J0cy5sb2cgPSBsb2c7XG5mdW5jdGlvbiB3YXJuKC4uLmFyZ3MpIHtcbiAgICBjb25zb2xlLndhcm4oXCJDQVNUQUJMRTpcIiwgLi4uYXJncyk7XG59XG5leHBvcnRzLndhcm4gPSB3YXJuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXQgPSB2b2lkIDA7XG5jb25zdCBjYXN0XzEgPSByZXF1aXJlKFwiLi9jYXN0XCIpO1xuY29uc3QgY2hyb21lXzEgPSByZXF1aXJlKFwiLi9jaHJvbWVcIik7XG5jb25zdCBjbGllbnRfaW9fMSA9IHJlcXVpcmUoXCIuL2NsaWVudC1pb1wiKTtcbmNvbnN0IGxvZ18xID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuLyoqXG4gKiBJbml0aWFsaXplcyBjaHJvbWVjYXN0IHN0dWJiaW5nXG4gKi9cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbG9nXzEubG9nKFwic3R1Yi5pbml0XCIsIHNhZmFyaS5leHRlbnNpb24sIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQsIHdpbmRvdy5zYWZhcmksIHdpbmRvdy5jaHJvbWUpO1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQ7XG4gICAgaWYgKCFzY3JpcHQgfHwgIShzY3JpcHQgaW5zdGFuY2VvZiBIVE1MU2NyaXB0RWxlbWVudCkpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiRVJST1I6IFVuYWJsZSB0byBpbml0IGNhc3Qgc3R1YnM7IHVuZXhwZWN0ZWQgY3VycmVudFNjcmlwdDpcIiwgc2NyaXB0KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IGNocm9tZV8xLkNocm9tZUNvbnRyb2xsZXIoKTtcbiAgICBjb25zdCBjYXN0ID0gbmV3IGNhc3RfMS5DYXN0U3R1YihuZXcgY2xpZW50X2lvXzEuQ2xpZW50SU8oc2NyaXB0KSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMod2luZG93LCB7XG4gICAgICAgIGNocm9tZToge1xuICAgICAgICAgICAgdmFsdWU6IGNvbnRyb2xsZXIuY2hyb21lLFxuICAgICAgICB9LFxuICAgICAgICBjYXN0OiB7XG4gICAgICAgICAgICB2YWx1ZTogY2FzdCxcbiAgICAgICAgfSxcbiAgICAgICAgX19vbkdDYXN0QXBpQXZhaWxhYmxlOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgbG9nXzEubG9nKFwiUkVBRCBvbkdDYXN0QXBpQXZhaWxhYmxlIDwtIFwiLCB0eXBlb2YgY29udHJvbGxlci5vbkdDYXN0QXBpQXZhaWxhYmxlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udHJvbGxlci5vbkdDYXN0QXBpQXZhaWxhYmxlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGxvZ18xLmxvZyhcInNldCBvbkdDYXN0QXBpQXZhaWxhYmxlIDwtIFwiLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5zZXRHQ2FzdEFwaUF2YWlsYWJsZUhhbmRsZXIodmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9KTtcbiAgICBsb2dfMS5sb2coXCJDcmVhdGVkIGNocm9tZWNhc3QgQVBJIHN0dWJcIiwgY29udHJvbGxlci5jaHJvbWUpO1xufVxuZXhwb3J0cy5pbml0ID0gaW5pdDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9pbmRleC50c1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=