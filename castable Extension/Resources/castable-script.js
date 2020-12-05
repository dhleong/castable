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
                if (result.cancelled) {
                    return enums_1.ErrorCode[enums_1.ErrorCode.CANCEL];
                }
                return null;
            }
            catch (e) {
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
        this.requestSession = this.createRpc("request-session");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jYXN0LmZyYW1ld29yay9jYXN0LWNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvY2FzdC5mcmFtZXdvcmsvZW51bXMudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvY2FzdC50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jaHJvbWUuY2FzdC9lbnVtcy50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jaHJvbWUuY2FzdC9tZWRpYS50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jaHJvbWUudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvY2xpZW50LWlvLnRzIiwid2VicGFjazovL2Nhc3RhYmxlLy4vY2FzdGFibGUgRXh0ZW5zaW9uL3RzL2NvbnN0cy50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9leHRlbnNpb24udHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvbG9nLnRzIiwid2VicGFjazovL2Nhc3RhYmxlLy4vY2FzdGFibGUgRXh0ZW5zaW9uL3RzL3N0dWIudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FB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Yiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsWUFBWTtBQUNaLGVBQWUsbUJBQU8sQ0FBQywrQ0FBUTtBQUMvQixpQkFBaUIsbUJBQU8sQ0FBQyxtREFBVTtBQUNuQyxvQkFBb0IsbUJBQU8sQ0FBQyx5REFBYTtBQUN6QyxjQUFjLG1CQUFPLENBQUMsNkNBQU87QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTs7Ozs7OztVQ3ZDWjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7O1VDckJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImNhc3RhYmxlLXNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNhc3RDb250ZXh0ID0gdm9pZCAwO1xuY29uc3QgbG9nXzEgPSByZXF1aXJlKFwiLi4vbG9nXCIpO1xuY29uc3QgZW51bXNfMSA9IHJlcXVpcmUoXCIuLi9jaHJvbWUuY2FzdC9lbnVtc1wiKTtcbmNvbnN0IGVudW1zXzIgPSByZXF1aXJlKFwiLi9lbnVtc1wiKTtcbmNsYXNzIENhc3RDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3Rvcihpbykge1xuICAgICAgICB0aGlzLmlvID0gaW87XG4gICAgfVxuICAgIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiQ2FzdENvbnRleHQuYWRkRXZlbnRMaXN0ZW5lclwiLCBldmVudCwgaGFuZGxlcik7XG4gICAgfVxuICAgIGdldENhc3RTdGF0ZSgpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiQ2FzdENvbnRleHQuZ2V0Q2FzdFN0YXRlXCIpO1xuICAgICAgICAvLyBUT0RPXG4gICAgICAgIHJldHVybiBlbnVtc18yLkNhc3RTdGF0ZVtlbnVtc18yLkNhc3RTdGF0ZS5OT19ERVZJQ0VTX0FWQUlMQUJMRV07XG4gICAgfVxuICAgIGdldEN1cnJlbnRTZXNzaW9uKCkge1xuICAgICAgICBsb2dfMS5sb2coXCJDYXN0Q29udGV4dC5nZXRDdXJyZW50U2Vzc2lvblwiKTtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZ2V0U2Vzc2lvblN0YXRlKCkge1xuICAgICAgICBsb2dfMS5sb2coXCJDYXN0Q29udGV4dC5nZXRTZXNzaW9uU3RhdGVcIik7XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgcmV0dXJuIGVudW1zXzIuU2Vzc2lvblN0YXRlW2VudW1zXzIuU2Vzc2lvblN0YXRlLk5PX1NFU1NJT05dO1xuICAgIH1cbiAgICByZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgIGxvZ18xLmxvZyhcIkNhc3RDb250ZXh0LnJlbW92ZUV2ZW50TGlzdGVuZXJcIiwgZXZlbnQsIGhhbmRsZXIpO1xuICAgIH1cbiAgICByZXF1ZXN0U2Vzc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGxvZ18xLmxvZyhcIkNhc3RDb250ZXh0LnJlcXVlc3RTZXNzaW9uXCIpO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB5aWVsZCB0aGlzLmlvLnJlcXVlc3RTZXNzaW9uKHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgbG9nXzEubG9nKFwicmVxdWVzdFNlc3Npb24gLT4gXCIsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jYW5jZWxsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVudW1zXzEuRXJyb3JDb2RlW2VudW1zXzEuRXJyb3JDb2RlLkNBTkNFTF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW51bXNfMS5FcnJvckNvZGVbZW51bXNfMS5FcnJvckNvZGUuU0VTU0lPTl9FUlJPUl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZXRMYXVuY2hDcmVkZW50aWFsc0RhdGEoZGF0YSkge1xuICAgICAgICBsb2dfMS5sb2coXCJDYXN0Q29udGV4dC5zZXRMYXVuY2hDcmVkZW50aWFsc0RhdGFcIiwgZGF0YSk7XG4gICAgfVxuICAgIHNldE9wdGlvbnMob3B0cykge1xuICAgICAgICBsb2dfMS5sb2coXCJDYXN0Q29udGV4dC5zZXRPcHRpb25zXCIsIG9wdHMpO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRzO1xuICAgIH1cbn1cbmV4cG9ydHMuQ2FzdENvbnRleHQgPSBDYXN0Q29udGV4dDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DYXN0Q29udGV4dEV2ZW50VHlwZSA9IGV4cG9ydHMuU2Vzc2lvblN0YXRlID0gZXhwb3J0cy5DYXN0U3RhdGUgPSB2b2lkIDA7XG52YXIgQ2FzdFN0YXRlO1xuKGZ1bmN0aW9uIChDYXN0U3RhdGUpIHtcbiAgICBDYXN0U3RhdGVbQ2FzdFN0YXRlW1wiTk9fREVWSUNFU19BVkFJTEFCTEVcIl0gPSAwXSA9IFwiTk9fREVWSUNFU19BVkFJTEFCTEVcIjtcbiAgICBDYXN0U3RhdGVbQ2FzdFN0YXRlW1wiTk9UX0NPTk5FQ1RFRFwiXSA9IDFdID0gXCJOT1RfQ09OTkVDVEVEXCI7XG4gICAgQ2FzdFN0YXRlW0Nhc3RTdGF0ZVtcIkNPTk5FQ1RJTkdcIl0gPSAyXSA9IFwiQ09OTkVDVElOR1wiO1xuICAgIENhc3RTdGF0ZVtDYXN0U3RhdGVbXCJDT05ORUNURURcIl0gPSAzXSA9IFwiQ09OTkVDVEVEXCI7XG59KShDYXN0U3RhdGUgPSBleHBvcnRzLkNhc3RTdGF0ZSB8fCAoZXhwb3J0cy5DYXN0U3RhdGUgPSB7fSkpO1xudmFyIFNlc3Npb25TdGF0ZTtcbihmdW5jdGlvbiAoU2Vzc2lvblN0YXRlKSB7XG4gICAgU2Vzc2lvblN0YXRlW1Nlc3Npb25TdGF0ZVtcIk5PX1NFU1NJT05cIl0gPSAwXSA9IFwiTk9fU0VTU0lPTlwiO1xuICAgIFNlc3Npb25TdGF0ZVtTZXNzaW9uU3RhdGVbXCJTRVNTSU9OX1NUQVJUSU5HXCJdID0gMV0gPSBcIlNFU1NJT05fU1RBUlRJTkdcIjtcbiAgICBTZXNzaW9uU3RhdGVbU2Vzc2lvblN0YXRlW1wiU0VTU0lPTl9TVEFSVEVEXCJdID0gMl0gPSBcIlNFU1NJT05fU1RBUlRFRFwiO1xuICAgIFNlc3Npb25TdGF0ZVtTZXNzaW9uU3RhdGVbXCJTRVNTSU9OX1NUQVJUX0ZBSUxFRFwiXSA9IDNdID0gXCJTRVNTSU9OX1NUQVJUX0ZBSUxFRFwiO1xuICAgIFNlc3Npb25TdGF0ZVtTZXNzaW9uU3RhdGVbXCJTRVNTSU9OX0VORElOR1wiXSA9IDRdID0gXCJTRVNTSU9OX0VORElOR1wiO1xuICAgIFNlc3Npb25TdGF0ZVtTZXNzaW9uU3RhdGVbXCJTRVNTSU9OX0VOREVEXCJdID0gNV0gPSBcIlNFU1NJT05fRU5ERURcIjtcbiAgICBTZXNzaW9uU3RhdGVbU2Vzc2lvblN0YXRlW1wiU0VTU0lPTl9SRVNVTUVEXCJdID0gNl0gPSBcIlNFU1NJT05fUkVTVU1FRFwiO1xufSkoU2Vzc2lvblN0YXRlID0gZXhwb3J0cy5TZXNzaW9uU3RhdGUgfHwgKGV4cG9ydHMuU2Vzc2lvblN0YXRlID0ge30pKTtcbnZhciBDYXN0Q29udGV4dEV2ZW50VHlwZTtcbihmdW5jdGlvbiAoQ2FzdENvbnRleHRFdmVudFR5cGUpIHtcbiAgICBDYXN0Q29udGV4dEV2ZW50VHlwZVtcIkNBU1RfU1RBVEVfQ0hBTkdFRFwiXSA9IFwiY2FzdHN0YXRlY2hhbmdlZFwiO1xuICAgIENhc3RDb250ZXh0RXZlbnRUeXBlW1wiU0VTU0lPTl9TVEFURV9DSEFOR0VEXCJdID0gXCJzZXNzaW9uc3RhdGVjaGFuZ2VkXCI7XG59KShDYXN0Q29udGV4dEV2ZW50VHlwZSA9IGV4cG9ydHMuQ2FzdENvbnRleHRFdmVudFR5cGUgfHwgKGV4cG9ydHMuQ2FzdENvbnRleHRFdmVudFR5cGUgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNhc3RTdHViID0gdm9pZCAwO1xuY29uc3QgY2FzdF9jb250ZXh0XzEgPSByZXF1aXJlKFwiLi9jYXN0LmZyYW1ld29yay9jYXN0LWNvbnRleHRcIik7XG5jb25zdCBlbnVtc18xID0gcmVxdWlyZShcIi4vY2FzdC5mcmFtZXdvcmsvZW51bXNcIik7XG5jbGFzcyBTdGF0aWNDbGFzc0NvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKG15SW5zdGFuY2UpIHtcbiAgICAgICAgdGhpcy5teUluc3RhbmNlID0gbXlJbnN0YW5jZTtcbiAgICB9XG4gICAgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm15SW5zdGFuY2U7XG4gICAgfVxufVxuY2xhc3MgRnJhbWV3b3JrU3R1YiB7XG4gICAgY29uc3RydWN0b3IoaW8pIHtcbiAgICAgICAgdGhpcy5DYXN0U3RhdGUgPSBlbnVtc18xLkNhc3RTdGF0ZTtcbiAgICAgICAgdGhpcy5TZXNzaW9uU3RhdGUgPSBlbnVtc18xLlNlc3Npb25TdGF0ZTtcbiAgICAgICAgdGhpcy5DYXN0Q29udGV4dEV2ZW50VHlwZSA9IGVudW1zXzEuQ2FzdENvbnRleHRFdmVudFR5cGU7XG4gICAgICAgIHRoaXMuQ2FzdENvbnRleHQgPSBuZXcgU3RhdGljQ2xhc3NDb250ZXh0KG5ldyBjYXN0X2NvbnRleHRfMS5DYXN0Q29udGV4dChpbykpO1xuICAgIH1cbn1cbmNsYXNzIENhc3RTdHViIHtcbiAgICBjb25zdHJ1Y3Rvcihpbykge1xuICAgICAgICB0aGlzLmZyYW1ld29yayA9IG5ldyBGcmFtZXdvcmtTdHViKGlvKTtcbiAgICB9XG59XG5leHBvcnRzLkNhc3RTdHViID0gQ2FzdFN0dWI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRXJyb3JDb2RlID0gZXhwb3J0cy5BdXRvSm9pblBvbGljeSA9IHZvaWQgMDtcbnZhciBBdXRvSm9pblBvbGljeTtcbihmdW5jdGlvbiAoQXV0b0pvaW5Qb2xpY3kpIHtcbiAgICBBdXRvSm9pblBvbGljeVtBdXRvSm9pblBvbGljeVtcIlRBQl9BTkRfT1JJR0lOX1NDT1BFRFwiXSA9IDBdID0gXCJUQUJfQU5EX09SSUdJTl9TQ09QRURcIjtcbiAgICBBdXRvSm9pblBvbGljeVtBdXRvSm9pblBvbGljeVtcIk9SSUdJTl9TQ09QRURcIl0gPSAxXSA9IFwiT1JJR0lOX1NDT1BFRFwiO1xuICAgIEF1dG9Kb2luUG9saWN5W0F1dG9Kb2luUG9saWN5W1wiUEFHRV9TQ09QRURcIl0gPSAyXSA9IFwiUEFHRV9TQ09QRURcIjtcbn0pKEF1dG9Kb2luUG9saWN5ID0gZXhwb3J0cy5BdXRvSm9pblBvbGljeSB8fCAoZXhwb3J0cy5BdXRvSm9pblBvbGljeSA9IHt9KSk7XG52YXIgRXJyb3JDb2RlO1xuKGZ1bmN0aW9uIChFcnJvckNvZGUpIHtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiQ0FOQ0VMXCJdID0gMF0gPSBcIkNBTkNFTFwiO1xuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJUSU1FT1VUXCJdID0gMV0gPSBcIlRJTUVPVVRcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiQVBJX05PVF9JTklUSUFMSVpFRFwiXSA9IDJdID0gXCJBUElfTk9UX0lOSVRJQUxJWkVEXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIklOVkFMSURfUEFSQU1FVEVSXCJdID0gM10gPSBcIklOVkFMSURfUEFSQU1FVEVSXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIkVYVEVOU0lPTl9OT1RfQ09NUEFUSUJMRVwiXSA9IDRdID0gXCJFWFRFTlNJT05fTk9UX0NPTVBBVElCTEVcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiRVhURU5TSU9OX01JU1NJTkdcIl0gPSA1XSA9IFwiRVhURU5TSU9OX01JU1NJTkdcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiUkVDRUlWRVJfVU5BVkFJTEFCTEVcIl0gPSA2XSA9IFwiUkVDRUlWRVJfVU5BVkFJTEFCTEVcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiU0VTU0lPTl9FUlJPUlwiXSA9IDddID0gXCJTRVNTSU9OX0VSUk9SXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIkNIQU5ORUxfRVJST1JcIl0gPSA4XSA9IFwiQ0hBTk5FTF9FUlJPUlwiO1xuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJMT0FEX01FRElBX0ZBSUxFRFwiXSA9IDldID0gXCJMT0FEX01FRElBX0ZBSUxFRFwiO1xufSkoRXJyb3JDb2RlID0gZXhwb3J0cy5FcnJvckNvZGUgfHwgKGV4cG9ydHMuRXJyb3JDb2RlID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5NZWRpYVN0dWIgPSB2b2lkIDA7XG5jbGFzcyBNZWRpYVN0dWIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLkRFRkFVTFRfTUVESUFfUkVDRUlWRVJfQVBQX0lEID0gXCJDQzFBRDg0NVwiO1xuICAgIH1cbn1cbmV4cG9ydHMuTWVkaWFTdHViID0gTWVkaWFTdHViO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNocm9tZUNvbnRyb2xsZXIgPSBleHBvcnRzLkNocm9tZVN0dWIgPSB2b2lkIDA7XG5jb25zdCBtZWRpYV8xID0gcmVxdWlyZShcIi4vY2hyb21lLmNhc3QvbWVkaWFcIik7XG5jb25zdCBsb2dfMSA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcbmNvbnN0IGVudW1zXzEgPSByZXF1aXJlKFwiLi9jaHJvbWUuY2FzdC9lbnVtc1wiKTtcbmNsYXNzIENhc3RFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihjb2RlLCBvcHRfZGVzY3JpcHRpb24sIG9wdF9kZXRhaWxzKSB7XG4gICAgICAgIHN1cGVyKGBjaHJvbWUuY2FzdC5FcnJvcjogJHtjb2RlfWApO1xuICAgICAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICAgICAgICB0aGlzLm9wdF9kZXNjcmlwdGlvbiA9IG9wdF9kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5vcHRfZGV0YWlscyA9IG9wdF9kZXRhaWxzO1xuICAgIH1cbn1cbmNsYXNzIENocm9tZUNhc3RTdHViIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5BdXRvSm9pblBvbGljeSA9IGVudW1zXzEuQXV0b0pvaW5Qb2xpY3k7XG4gICAgICAgIHRoaXMubWVkaWEgPSBuZXcgbWVkaWFfMS5NZWRpYVN0dWIoKTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZShhcGlDb25maWcsIG9uU3VjY2Vzcywgb25FcnJvcikge1xuICAgICAgICBsb2dfMS5sb2coXCJJTklUSUFMSVpFXCIsIGFwaUNvbmZpZyk7XG4gICAgfVxufVxuY2xhc3MgQ2hyb21lU3R1YiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FzdFN0dWIgPSBuZXcgQ2hyb21lQ2FzdFN0dWIoKTtcbiAgICB9XG4gICAgZ2V0IGNhc3QoKSB7XG4gICAgICAgIGxvZ18xLmxvZyhcIlJFQUQgY2hyb21lLmNhc3RcIik7XG4gICAgICAgIHJldHVybiB0aGlzLmNhc3RTdHViO1xuICAgIH1cbn1cbmV4cG9ydHMuQ2hyb21lU3R1YiA9IENocm9tZVN0dWI7XG5jbGFzcyBDaHJvbWVDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jaHJvbWUgPSBuZXcgQ2hyb21lU3R1YigpO1xuICAgICAgICB0aGlzLm9uR0Nhc3RBcGlBdmFpbGFibGUgPSAoaXNBdmFpbGFibGUsIGVycikgPT4ge1xuICAgICAgICAgICAgbG9nXzEubG9nKFwicmVjZWl2ZWQgR0Nhc3QgQVBJIEF2YWlsYWJpbGl0eTogXCIsIGlzQXZhaWxhYmxlLCBlcnIpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBzZXRHQ2FzdEFwaUF2YWlsYWJsZUhhbmRsZXIoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5yZWNlaXZlZEFwaUF2YWlsYWJsZUhhbmRsZXIgPSBjYWxsYmFjaztcbiAgICB9XG4gICAgbm90aWZ5R0Nhc3RBdmFpbGFibGUoaXNBdmFpbGFibGUpIHtcbiAgICAgICAgaWYgKHRoaXMucmVjZWl2ZWRBcGlBdmFpbGFibGVIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVkQXBpQXZhaWxhYmxlSGFuZGxlcihpc0F2YWlsYWJsZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkNocm9tZUNvbnRyb2xsZXIgPSBDaHJvbWVDb250cm9sbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ2xpZW50SU8gPSB2b2lkIDA7XG5jb25zdCBjb25zdHNfMSA9IHJlcXVpcmUoXCIuL2NvbnN0c1wiKTtcbmNvbnN0IGxvZ18xID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuY2xhc3MgRnV0dXJlIHtcbiAgICBjb25zdHJ1Y3RvcihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgdGhpcy5yZWplY3QgPSByZWplY3Q7XG4gICAgfVxufVxuY2xhc3MgQ2xpZW50SU8ge1xuICAgIGNvbnN0cnVjdG9yKHNjcmlwdCkge1xuICAgICAgICB0aGlzLnNjcmlwdCA9IHNjcmlwdDtcbiAgICAgICAgdGhpcy5uZXh0UmVxdWVzdElkID0gMDtcbiAgICAgICAgdGhpcy5wZW5kaW5nUmVzb2x2ZXMgPSB7fTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0U2Vzc2lvbiA9IHRoaXMuY3JlYXRlUnBjKFwicmVxdWVzdC1zZXNzaW9uXCIpO1xuICAgICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcihjb25zdHNfMS5JUENfSU5DT01JTkdfRVZFTlQsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBldmVudC5kZXRhaWw7XG4gICAgICAgICAgICBsb2dfMS5sb2coXCJzdHViIHJlY2VpdmVkIGlwYyBtZXNzYWdlXCIsIGRhdGEpO1xuICAgICAgICAgICAgaWYgKGRhdGEuYXJncyAmJiBkYXRhLmFyZ3MucmVxdWVzdElkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmdXR1cmUgPSB0aGlzLnBlbmRpbmdSZXNvbHZlc1tkYXRhLmFyZ3MucmVxdWVzdElkXTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5hcmdzLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1dHVyZS5yZWplY3QoZGF0YS5hcmdzLmVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1dHVyZS5yZXNvbHZlKGRhdGEuYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcGF0Y2ggYSBvbmUtb2ZmIElQQyBtZXNzYWdlIHRvIHRoZSBleHRlbnNpb24uXG4gICAgICovXG4gICAgZGlzcGF0Y2hNZXNzYWdlKG5hbWUsIGFyZ3MpIHtcbiAgICAgICAgdGhpcy5zY3JpcHQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoY29uc3RzXzEuSVBDX09VVEdPSU5HX0VWRU5ULCB7XG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgIGFyZ3MsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIHJlcXVlc3QobmFtZSwgYXJncykge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMubmV4dFJlcXVlc3RJZCsrO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nUmVzb2x2ZXNbaWRdID0gbmV3IEZ1dHVyZShyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaE1lc3NhZ2UobmFtZSwgT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBhcmdzKSwgeyByZXF1ZXN0SWQ6IGlkIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNyZWF0ZVJwYyhuYW1lKSB7XG4gICAgICAgIHJldHVybiAocmVxKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIHRoaXMucmVxdWVzdChuYW1lLCByZXEpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLkNsaWVudElPID0gQ2xpZW50SU87XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU1RVQl9FTEVNRU5UX0lEID0gZXhwb3J0cy5JUENfSU5DT01JTkdfRVZFTlQgPSBleHBvcnRzLklQQ19PVVRHT0lOR19FVkVOVCA9IHZvaWQgMDtcbmV4cG9ydHMuSVBDX09VVEdPSU5HX0VWRU5UID0gXCJjYXN0YWJsZS1icm93c2VyLT5leHRlbnNpb25cIjtcbmV4cG9ydHMuSVBDX0lOQ09NSU5HX0VWRU5UID0gXCJjYXN0YWJsZS1leHRlbnNpb24tPmJyb3dzZXJcIjtcbmV4cG9ydHMuU1RVQl9FTEVNRU5UX0lEID0gXCJjYXN0YWJsZS5zY3JpcHRcIjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FdmVudFJlZ2lzdHJhciA9IGV4cG9ydHMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGV4cG9ydHMuYWRkRXZlbnRMaXN0ZW5lciA9IGV4cG9ydHMuZGlzcGF0Y2hNZXNzYWdlID0gdm9pZCAwO1xuY29uc3QgbG9nXzEgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5mdW5jdGlvbiBkaXNwYXRjaE1lc3NhZ2UobWVzc2FnZU5hbWUsIGNvbnRlbnQpIHtcbiAgICBjb25zdCBlID0gc2FmYXJpLmV4dGVuc2lvbjtcbiAgICBlLmRpc3BhdGNoTWVzc2FnZShtZXNzYWdlTmFtZSwgY29udGVudCk7XG59XG5leHBvcnRzLmRpc3BhdGNoTWVzc2FnZSA9IGRpc3BhdGNoTWVzc2FnZTtcbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgY29uc3QgcGFnZSA9IHNhZmFyaS5zZWxmO1xuICAgIHBhZ2UuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgaGFuZGxlcik7XG59XG5leHBvcnRzLmFkZEV2ZW50TGlzdGVuZXIgPSBhZGRFdmVudExpc3RlbmVyO1xuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICBjb25zdCBwYWdlID0gc2FmYXJpLnNlbGY7XG4gICAgcGFnZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBoYW5kbGVyKTtcbn1cbmV4cG9ydHMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHJlbW92ZUV2ZW50TGlzdGVuZXI7XG5jbGFzcyBFdmVudFJlZ2lzdHJhciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlcnMgPSB7fTtcbiAgICAgICAgdGhpcy5ib3VuZE9uRXZlbnQgPSB0aGlzLm9uRXZlbnQuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgcmVnaXN0ZXIobWVzc2FnZSwgaGFuZGxlcikge1xuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHRoaXMuaGFuZGxlcnMpLmxlbmd0aCkge1xuICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5ib3VuZE9uRXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGFuZGxlcnNbbWVzc2FnZV0gPSBoYW5kbGVyO1xuICAgIH1cbiAgICBvbihtZXNzYWdlLCBoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIobWVzc2FnZSwgaGFuZGxlcik7XG4gICAgfVxuICAgIG9uY2UobWVzc2FnZSwgaGFuZGxlcikge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKG1lc3NhZ2UsICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVucmVnaXN0ZXIobWVzc2FnZSk7XG4gICAgICAgICAgICBoYW5kbGVyKC4uLmFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdW5yZWdpc3RlcihtZXNzYWdlKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmhhbmRsZXJzW21lc3NhZ2VdO1xuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHRoaXMuaGFuZGxlcnMpLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5ib3VuZE9uRXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IHRoaXMuaGFuZGxlcnNbZXZlbnQubmFtZV07XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgICBoYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ18xLndhcm4oXCJObyBoYW5kbGVyIHJlZ2lzdGVyZWQgZm9yOlwiLCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkV2ZW50UmVnaXN0cmFyID0gRXZlbnRSZWdpc3RyYXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvbnN0c18xID0gcmVxdWlyZShcIi4vY29uc3RzXCIpO1xuY29uc3QgZXh0ZW5zaW9uXzEgPSByZXF1aXJlKFwiLi9leHRlbnNpb25cIik7XG5jb25zdCBsb2dfMSA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcbmNvbnN0IHN0dWJfMSA9IHJlcXVpcmUoXCIuL3N0dWJcIik7XG5mdW5jdGlvbiByZWdpc3RlckNhc3QocmVnaXN0cmFyKSB7XG4gICAgbG9nXzEubG9nKFwicmVnaXN0ZXJpbmcgY2FzdCBzdHViXCIpO1xuICAgIGlmICghZG9jdW1lbnQuaGVhZCkge1xuICAgICAgICBsb2dfMS5sb2coXCJubyBkb2N1bWVudC5oZWFkXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghd2luZG93LnNhZmFyaSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJyZWdpc3RlckNhc3QgTVVTVCBOT1QgYmUgY2FsbGVkIGZyb20gcGFnZSBjb250ZXh0XCIpO1xuICAgIH1cbiAgICAvLyBpbnNlcnQgc2NyaXB0IGludG8gdGhlIHBhZ2UncyBjb250ZXh0IHNvIGl0IGhhcyBhY2Nlc3MgdG9cbiAgICAvLyBvdXIgY2hyb21lY2FzdCBzdHVic1xuICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgIG5ld0VsZW1lbnQuc3JjID0gc2FmYXJpLmV4dGVuc2lvbi5iYXNlVVJJICsgXCJjYXN0YWJsZS1zY3JpcHQuanNcIjtcbiAgICBuZXdFbGVtZW50LmlkID0gY29uc3RzXzEuU1RVQl9FTEVNRU5UX0lEO1xuICAgIG5ld0VsZW1lbnQuY2hhcnNldCA9ICd1dGYtOCc7XG4gICAgbmV3RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGNvbnN0c18xLklQQ19PVVRHT0lOR19FVkVOVCwgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBkYXRhID0gZXZlbnQuZGV0YWlsO1xuICAgICAgICBsb2dfMS5sb2coXCJmb3J3YXJkaW5nIG1lc3NhZ2U6XCIsIGRhdGEpO1xuICAgICAgICBleHRlbnNpb25fMS5kaXNwYXRjaE1lc3NhZ2UoZGF0YS5uYW1lLCBkYXRhLmFyZ3MpO1xuICAgIH0pO1xuICAgIHJlZ2lzdHJhci5vbihjb25zdHNfMS5JUENfSU5DT01JTkdfRVZFTlQsIGV2ZW50ID0+IHtcbiAgICAgICAgbG9nXzEubG9nKFwiZXh0IHJlY2VpdmVkIGlwYyBtZXNzYWdlXCIsIGV2ZW50KTtcbiAgICAgICAgbmV3RWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChjb25zdHNfMS5JUENfSU5DT01JTkdfRVZFTlQsIHtcbiAgICAgICAgICAgIGRldGFpbDoge1xuICAgICAgICAgICAgICAgIG5hbWU6IGV2ZW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgYXJnczogZXZlbnQubWVzc2FnZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgICB9KSk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChuZXdFbGVtZW50KTtcbn1cbmZ1bmN0aW9uIGluaXRFeHQoKSB7XG4gICAgaWYgKHdpbmRvdy50b3AgIT09IHdpbmRvdykge1xuICAgICAgICBsb2dfMS5sb2coXCJpZ25vcmluZyBub24tdG9wIHdpbmRvdzpcIiwgd2luZG93KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29uc3RzXzEuU1RVQl9FTEVNRU5UX0lEKSkge1xuICAgICAgICBsb2dfMS5sb2coXCJjYXN0YWJsZS5zY3JpcHQgYWxyZWFkeSBlbnF1ZXVlZFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBOT1RFOiBpbiBvcmRlciBmb3Igb3VyIHN0dWIgdG8gYmUgbG9hZGVkIGludG8gdGhlIGFjdHVhbFxuICAgIC8vIHBhZ2UncyBjb250ZXh0LCB3ZSBoYXZlIHRvIHdyaXRlIGEgPHNjcmlwdD4gaW50byB0aGUgRE9NXG4gICAgLy8gd2l0aCAqanVzdCogdGhlIHJpZ2h0IHRpbWluZy4uLlxuICAgIC8vIEhlcmUsIHdlIHdhaXQgdW50aWwgdGhlIERPTSBjb250ZW50IGhhcyBsb2FkZWQsIGxldCB0aGVcbiAgICAvLyBTd2lmdCBleHRlbnNpb24ga25vdywgYW5kIHdhaXQgZm9yIGl0IHRvIHRlbGwgdXMgaXQncyBzYWZlXG4gICAgLy8gdG8gcmVnaXN0ZXJcbiAgICBsb2dfMS5sb2coXCJpbml0RXh0XCIsIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQsIHNhZmFyaSwgd2luZG93LmNocm9tZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgICAgICBsb2dfMS5sb2coXCJjb250ZW50IGxvYWRlZC4uLlwiKTtcbiAgICAgICAgY29uc3QgcmVnaXN0cmFyID0gbmV3IGV4dGVuc2lvbl8xLkV2ZW50UmVnaXN0cmFyKCk7XG4gICAgICAgIHJlZ2lzdHJhci5vbmNlKFwicmVnaXN0ZXItY2FzdFwiLCAoKSA9PiB7XG4gICAgICAgICAgICByZWdpc3RlckNhc3QocmVnaXN0cmFyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGV4dGVuc2lvbl8xLmRpc3BhdGNoTWVzc2FnZShcImNvbnRlbnQtbG9hZGVkXCIpO1xuICAgICAgICBsb2dfMS5sb2coXCJkaXNwYXRjaGVkIGNvbnRlbnQtbG9hZGVkIVwiKTtcbiAgICB9KTtcbn1cbmlmICh3aW5kb3cuc2FmYXJpICYmIHdpbmRvdy5zYWZhcmkuZXh0ZW5zaW9uKSB7XG4gICAgaW5pdEV4dCgpO1xufVxuZWxzZSB7XG4gICAgc3R1Yl8xLmluaXQoKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy53YXJuID0gZXhwb3J0cy5sb2cgPSB2b2lkIDA7XG5mdW5jdGlvbiBsb2coLi4uYXJncykge1xuICAgIGNvbnNvbGUubG9nKFwiQ0FTVEFCTEU6XCIsIC4uLmFyZ3MpO1xufVxuZXhwb3J0cy5sb2cgPSBsb2c7XG5mdW5jdGlvbiB3YXJuKC4uLmFyZ3MpIHtcbiAgICBjb25zb2xlLndhcm4oXCJDQVNUQUJMRTpcIiwgLi4uYXJncyk7XG59XG5leHBvcnRzLndhcm4gPSB3YXJuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXQgPSB2b2lkIDA7XG5jb25zdCBjYXN0XzEgPSByZXF1aXJlKFwiLi9jYXN0XCIpO1xuY29uc3QgY2hyb21lXzEgPSByZXF1aXJlKFwiLi9jaHJvbWVcIik7XG5jb25zdCBjbGllbnRfaW9fMSA9IHJlcXVpcmUoXCIuL2NsaWVudC1pb1wiKTtcbmNvbnN0IGxvZ18xID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuLyoqXG4gKiBJbml0aWFsaXplcyBjaHJvbWVjYXN0IHN0dWJiaW5nXG4gKi9cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbG9nXzEubG9nKFwic3R1Yi5pbml0XCIsIHNhZmFyaS5leHRlbnNpb24sIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQsIHdpbmRvdy5zYWZhcmksIHdpbmRvdy5jaHJvbWUpO1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQ7XG4gICAgaWYgKCFzY3JpcHQgfHwgIShzY3JpcHQgaW5zdGFuY2VvZiBIVE1MU2NyaXB0RWxlbWVudCkpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiRVJST1I6IFVuYWJsZSB0byBpbml0IGNhc3Qgc3R1YnM7IHVuZXhwZWN0ZWQgY3VycmVudFNjcmlwdDpcIiwgc2NyaXB0KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IGNocm9tZV8xLkNocm9tZUNvbnRyb2xsZXIoKTtcbiAgICBjb25zdCBjYXN0ID0gbmV3IGNhc3RfMS5DYXN0U3R1YihuZXcgY2xpZW50X2lvXzEuQ2xpZW50SU8oc2NyaXB0KSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMod2luZG93LCB7XG4gICAgICAgIGNocm9tZToge1xuICAgICAgICAgICAgdmFsdWU6IGNvbnRyb2xsZXIuY2hyb21lLFxuICAgICAgICB9LFxuICAgICAgICBjYXN0OiB7XG4gICAgICAgICAgICB2YWx1ZTogY2FzdCxcbiAgICAgICAgfSxcbiAgICAgICAgX19vbkdDYXN0QXBpQXZhaWxhYmxlOiB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgbG9nXzEubG9nKFwiUkVBRCBvbkdDYXN0QXBpQXZhaWxhYmxlIDwtIFwiLCB0eXBlb2YgY29udHJvbGxlci5vbkdDYXN0QXBpQXZhaWxhYmxlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udHJvbGxlci5vbkdDYXN0QXBpQXZhaWxhYmxlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGxvZ18xLmxvZyhcInNldCBvbkdDYXN0QXBpQXZhaWxhYmxlIDwtIFwiLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5zZXRHQ2FzdEFwaUF2YWlsYWJsZUhhbmRsZXIodmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9KTtcbiAgICBsb2dfMS5sb2coXCJDcmVhdGVkIGNocm9tZWNhc3QgQVBJIHN0dWJcIiwgY29udHJvbGxlci5jaHJvbWUpO1xufVxuZXhwb3J0cy5pbml0ID0gaW5pdDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9pbmRleC50c1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=