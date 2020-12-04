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
            this.io.dispatchMessage("request-session");
            return enums_1.ErrorCode[enums_1.ErrorCode.CANCEL];
        });
    }
    setLaunchCredentialsData(data) {
        log_1.log("CastContext.setLaunchCredentialsData", data);
    }
    setOptions(opts) {
        log_1.log("CastContext.setOptions", opts);
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
/*! flagged exports */
/*! export ClientIO [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientIO = void 0;
const consts_1 = __webpack_require__(/*! ./consts */ "./castable Extension/ts/consts.ts");
const log_1 = __webpack_require__(/*! ./log */ "./castable Extension/ts/log.ts");
class ClientIO {
    constructor(script) {
        this.script = script;
        script.addEventListener(consts_1.IPC_INCOMING_EVENT, event => {
            const data = event.detail;
            log_1.log("stub received ipc message", data);
        });
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jYXN0LmZyYW1ld29yay9jYXN0LWNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvY2FzdC5mcmFtZXdvcmsvZW51bXMudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvY2FzdC50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jaHJvbWUuY2FzdC9lbnVtcy50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jaHJvbWUuY2FzdC9tZWRpYS50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jaHJvbWUudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvY2xpZW50LWlvLnRzIiwid2VicGFjazovL2Nhc3RhYmxlLy4vY2FzdGFibGUgRXh0ZW5zaW9uL3RzL2NvbnN0cy50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9leHRlbnNpb24udHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvbG9nLnRzIiwid2VicGFjazovL2Nhc3RhYmxlLy4vY2FzdGFibGUgRXh0ZW5zaW9uL3RzL3N0dWIudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FB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Q0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiY2FzdGFibGUtc2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ2FzdENvbnRleHQgPSB2b2lkIDA7XG5jb25zdCBsb2dfMSA9IHJlcXVpcmUoXCIuLi9sb2dcIik7XG5jb25zdCBlbnVtc18xID0gcmVxdWlyZShcIi4uL2Nocm9tZS5jYXN0L2VudW1zXCIpO1xuY29uc3QgZW51bXNfMiA9IHJlcXVpcmUoXCIuL2VudW1zXCIpO1xuY2xhc3MgQ2FzdENvbnRleHQge1xuICAgIGNvbnN0cnVjdG9yKGlvKSB7XG4gICAgICAgIHRoaXMuaW8gPSBpbztcbiAgICB9XG4gICAgYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcikge1xuICAgICAgICBsb2dfMS5sb2coXCJDYXN0Q29udGV4dC5hZGRFdmVudExpc3RlbmVyXCIsIGV2ZW50LCBoYW5kbGVyKTtcbiAgICB9XG4gICAgZ2V0Q2FzdFN0YXRlKCkge1xuICAgICAgICBsb2dfMS5sb2coXCJDYXN0Q29udGV4dC5nZXRDYXN0U3RhdGVcIik7XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgcmV0dXJuIGVudW1zXzIuQ2FzdFN0YXRlW2VudW1zXzIuQ2FzdFN0YXRlLk5PX0RFVklDRVNfQVZBSUxBQkxFXTtcbiAgICB9XG4gICAgZ2V0Q3VycmVudFNlc3Npb24oKSB7XG4gICAgICAgIGxvZ18xLmxvZyhcIkNhc3RDb250ZXh0LmdldEN1cnJlbnRTZXNzaW9uXCIpO1xuICAgICAgICAvLyBUT0RPXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBnZXRTZXNzaW9uU3RhdGUoKSB7XG4gICAgICAgIGxvZ18xLmxvZyhcIkNhc3RDb250ZXh0LmdldFNlc3Npb25TdGF0ZVwiKTtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICByZXR1cm4gZW51bXNfMi5TZXNzaW9uU3RhdGVbZW51bXNfMi5TZXNzaW9uU3RhdGUuTk9fU0VTU0lPTl07XG4gICAgfVxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiQ2FzdENvbnRleHQucmVtb3ZlRXZlbnRMaXN0ZW5lclwiLCBldmVudCwgaGFuZGxlcik7XG4gICAgfVxuICAgIHJlcXVlc3RTZXNzaW9uKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgbG9nXzEubG9nKFwiQ2FzdENvbnRleHQucmVxdWVzdFNlc3Npb25cIik7XG4gICAgICAgICAgICB0aGlzLmlvLmRpc3BhdGNoTWVzc2FnZShcInJlcXVlc3Qtc2Vzc2lvblwiKTtcbiAgICAgICAgICAgIHJldHVybiBlbnVtc18xLkVycm9yQ29kZVtlbnVtc18xLkVycm9yQ29kZS5DQU5DRUxdO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0TGF1bmNoQ3JlZGVudGlhbHNEYXRhKGRhdGEpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiQ2FzdENvbnRleHQuc2V0TGF1bmNoQ3JlZGVudGlhbHNEYXRhXCIsIGRhdGEpO1xuICAgIH1cbiAgICBzZXRPcHRpb25zKG9wdHMpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiQ2FzdENvbnRleHQuc2V0T3B0aW9uc1wiLCBvcHRzKTtcbiAgICB9XG59XG5leHBvcnRzLkNhc3RDb250ZXh0ID0gQ2FzdENvbnRleHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ2FzdENvbnRleHRFdmVudFR5cGUgPSBleHBvcnRzLlNlc3Npb25TdGF0ZSA9IGV4cG9ydHMuQ2FzdFN0YXRlID0gdm9pZCAwO1xudmFyIENhc3RTdGF0ZTtcbihmdW5jdGlvbiAoQ2FzdFN0YXRlKSB7XG4gICAgQ2FzdFN0YXRlW0Nhc3RTdGF0ZVtcIk5PX0RFVklDRVNfQVZBSUxBQkxFXCJdID0gMF0gPSBcIk5PX0RFVklDRVNfQVZBSUxBQkxFXCI7XG4gICAgQ2FzdFN0YXRlW0Nhc3RTdGF0ZVtcIk5PVF9DT05ORUNURURcIl0gPSAxXSA9IFwiTk9UX0NPTk5FQ1RFRFwiO1xuICAgIENhc3RTdGF0ZVtDYXN0U3RhdGVbXCJDT05ORUNUSU5HXCJdID0gMl0gPSBcIkNPTk5FQ1RJTkdcIjtcbiAgICBDYXN0U3RhdGVbQ2FzdFN0YXRlW1wiQ09OTkVDVEVEXCJdID0gM10gPSBcIkNPTk5FQ1RFRFwiO1xufSkoQ2FzdFN0YXRlID0gZXhwb3J0cy5DYXN0U3RhdGUgfHwgKGV4cG9ydHMuQ2FzdFN0YXRlID0ge30pKTtcbnZhciBTZXNzaW9uU3RhdGU7XG4oZnVuY3Rpb24gKFNlc3Npb25TdGF0ZSkge1xuICAgIFNlc3Npb25TdGF0ZVtTZXNzaW9uU3RhdGVbXCJOT19TRVNTSU9OXCJdID0gMF0gPSBcIk5PX1NFU1NJT05cIjtcbiAgICBTZXNzaW9uU3RhdGVbU2Vzc2lvblN0YXRlW1wiU0VTU0lPTl9TVEFSVElOR1wiXSA9IDFdID0gXCJTRVNTSU9OX1NUQVJUSU5HXCI7XG4gICAgU2Vzc2lvblN0YXRlW1Nlc3Npb25TdGF0ZVtcIlNFU1NJT05fU1RBUlRFRFwiXSA9IDJdID0gXCJTRVNTSU9OX1NUQVJURURcIjtcbiAgICBTZXNzaW9uU3RhdGVbU2Vzc2lvblN0YXRlW1wiU0VTU0lPTl9TVEFSVF9GQUlMRURcIl0gPSAzXSA9IFwiU0VTU0lPTl9TVEFSVF9GQUlMRURcIjtcbiAgICBTZXNzaW9uU3RhdGVbU2Vzc2lvblN0YXRlW1wiU0VTU0lPTl9FTkRJTkdcIl0gPSA0XSA9IFwiU0VTU0lPTl9FTkRJTkdcIjtcbiAgICBTZXNzaW9uU3RhdGVbU2Vzc2lvblN0YXRlW1wiU0VTU0lPTl9FTkRFRFwiXSA9IDVdID0gXCJTRVNTSU9OX0VOREVEXCI7XG4gICAgU2Vzc2lvblN0YXRlW1Nlc3Npb25TdGF0ZVtcIlNFU1NJT05fUkVTVU1FRFwiXSA9IDZdID0gXCJTRVNTSU9OX1JFU1VNRURcIjtcbn0pKFNlc3Npb25TdGF0ZSA9IGV4cG9ydHMuU2Vzc2lvblN0YXRlIHx8IChleHBvcnRzLlNlc3Npb25TdGF0ZSA9IHt9KSk7XG52YXIgQ2FzdENvbnRleHRFdmVudFR5cGU7XG4oZnVuY3Rpb24gKENhc3RDb250ZXh0RXZlbnRUeXBlKSB7XG4gICAgQ2FzdENvbnRleHRFdmVudFR5cGVbXCJDQVNUX1NUQVRFX0NIQU5HRURcIl0gPSBcImNhc3RzdGF0ZWNoYW5nZWRcIjtcbiAgICBDYXN0Q29udGV4dEV2ZW50VHlwZVtcIlNFU1NJT05fU1RBVEVfQ0hBTkdFRFwiXSA9IFwic2Vzc2lvbnN0YXRlY2hhbmdlZFwiO1xufSkoQ2FzdENvbnRleHRFdmVudFR5cGUgPSBleHBvcnRzLkNhc3RDb250ZXh0RXZlbnRUeXBlIHx8IChleHBvcnRzLkNhc3RDb250ZXh0RXZlbnRUeXBlID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DYXN0U3R1YiA9IHZvaWQgMDtcbmNvbnN0IGNhc3RfY29udGV4dF8xID0gcmVxdWlyZShcIi4vY2FzdC5mcmFtZXdvcmsvY2FzdC1jb250ZXh0XCIpO1xuY29uc3QgZW51bXNfMSA9IHJlcXVpcmUoXCIuL2Nhc3QuZnJhbWV3b3JrL2VudW1zXCIpO1xuY2xhc3MgU3RhdGljQ2xhc3NDb250ZXh0IHtcbiAgICBjb25zdHJ1Y3RvcihteUluc3RhbmNlKSB7XG4gICAgICAgIHRoaXMubXlJbnN0YW5jZSA9IG15SW5zdGFuY2U7XG4gICAgfVxuICAgIGdldEluc3RhbmNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5teUluc3RhbmNlO1xuICAgIH1cbn1cbmNsYXNzIEZyYW1ld29ya1N0dWIge1xuICAgIGNvbnN0cnVjdG9yKGlvKSB7XG4gICAgICAgIHRoaXMuQ2FzdFN0YXRlID0gZW51bXNfMS5DYXN0U3RhdGU7XG4gICAgICAgIHRoaXMuU2Vzc2lvblN0YXRlID0gZW51bXNfMS5TZXNzaW9uU3RhdGU7XG4gICAgICAgIHRoaXMuQ2FzdENvbnRleHRFdmVudFR5cGUgPSBlbnVtc18xLkNhc3RDb250ZXh0RXZlbnRUeXBlO1xuICAgICAgICB0aGlzLkNhc3RDb250ZXh0ID0gbmV3IFN0YXRpY0NsYXNzQ29udGV4dChuZXcgY2FzdF9jb250ZXh0XzEuQ2FzdENvbnRleHQoaW8pKTtcbiAgICB9XG59XG5jbGFzcyBDYXN0U3R1YiB7XG4gICAgY29uc3RydWN0b3IoaW8pIHtcbiAgICAgICAgdGhpcy5mcmFtZXdvcmsgPSBuZXcgRnJhbWV3b3JrU3R1Yihpbyk7XG4gICAgfVxufVxuZXhwb3J0cy5DYXN0U3R1YiA9IENhc3RTdHViO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkVycm9yQ29kZSA9IGV4cG9ydHMuQXV0b0pvaW5Qb2xpY3kgPSB2b2lkIDA7XG52YXIgQXV0b0pvaW5Qb2xpY3k7XG4oZnVuY3Rpb24gKEF1dG9Kb2luUG9saWN5KSB7XG4gICAgQXV0b0pvaW5Qb2xpY3lbQXV0b0pvaW5Qb2xpY3lbXCJUQUJfQU5EX09SSUdJTl9TQ09QRURcIl0gPSAwXSA9IFwiVEFCX0FORF9PUklHSU5fU0NPUEVEXCI7XG4gICAgQXV0b0pvaW5Qb2xpY3lbQXV0b0pvaW5Qb2xpY3lbXCJPUklHSU5fU0NPUEVEXCJdID0gMV0gPSBcIk9SSUdJTl9TQ09QRURcIjtcbiAgICBBdXRvSm9pblBvbGljeVtBdXRvSm9pblBvbGljeVtcIlBBR0VfU0NPUEVEXCJdID0gMl0gPSBcIlBBR0VfU0NPUEVEXCI7XG59KShBdXRvSm9pblBvbGljeSA9IGV4cG9ydHMuQXV0b0pvaW5Qb2xpY3kgfHwgKGV4cG9ydHMuQXV0b0pvaW5Qb2xpY3kgPSB7fSkpO1xudmFyIEVycm9yQ29kZTtcbihmdW5jdGlvbiAoRXJyb3JDb2RlKSB7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIkNBTkNFTFwiXSA9IDBdID0gXCJDQU5DRUxcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiVElNRU9VVFwiXSA9IDFdID0gXCJUSU1FT1VUXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIkFQSV9OT1RfSU5JVElBTElaRURcIl0gPSAyXSA9IFwiQVBJX05PVF9JTklUSUFMSVpFRFwiO1xuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJJTlZBTElEX1BBUkFNRVRFUlwiXSA9IDNdID0gXCJJTlZBTElEX1BBUkFNRVRFUlwiO1xuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJFWFRFTlNJT05fTk9UX0NPTVBBVElCTEVcIl0gPSA0XSA9IFwiRVhURU5TSU9OX05PVF9DT01QQVRJQkxFXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIkVYVEVOU0lPTl9NSVNTSU5HXCJdID0gNV0gPSBcIkVYVEVOU0lPTl9NSVNTSU5HXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIlJFQ0VJVkVSX1VOQVZBSUxBQkxFXCJdID0gNl0gPSBcIlJFQ0VJVkVSX1VOQVZBSUxBQkxFXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIlNFU1NJT05fRVJST1JcIl0gPSA3XSA9IFwiU0VTU0lPTl9FUlJPUlwiO1xuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJDSEFOTkVMX0VSUk9SXCJdID0gOF0gPSBcIkNIQU5ORUxfRVJST1JcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiTE9BRF9NRURJQV9GQUlMRURcIl0gPSA5XSA9IFwiTE9BRF9NRURJQV9GQUlMRURcIjtcbn0pKEVycm9yQ29kZSA9IGV4cG9ydHMuRXJyb3JDb2RlIHx8IChleHBvcnRzLkVycm9yQ29kZSA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTWVkaWFTdHViID0gdm9pZCAwO1xuY2xhc3MgTWVkaWFTdHViIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ERUZBVUxUX01FRElBX1JFQ0VJVkVSX0FQUF9JRCA9IFwiQ0MxQUQ4NDVcIjtcbiAgICB9XG59XG5leHBvcnRzLk1lZGlhU3R1YiA9IE1lZGlhU3R1YjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DaHJvbWVDb250cm9sbGVyID0gZXhwb3J0cy5DaHJvbWVTdHViID0gdm9pZCAwO1xuY29uc3QgbWVkaWFfMSA9IHJlcXVpcmUoXCIuL2Nocm9tZS5jYXN0L21lZGlhXCIpO1xuY29uc3QgbG9nXzEgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5jb25zdCBlbnVtc18xID0gcmVxdWlyZShcIi4vY2hyb21lLmNhc3QvZW51bXNcIik7XG5jbGFzcyBDYXN0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoY29kZSwgb3B0X2Rlc2NyaXB0aW9uLCBvcHRfZGV0YWlscykge1xuICAgICAgICBzdXBlcihgY2hyb21lLmNhc3QuRXJyb3I6ICR7Y29kZX1gKTtcbiAgICAgICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICAgICAgdGhpcy5vcHRfZGVzY3JpcHRpb24gPSBvcHRfZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMub3B0X2RldGFpbHMgPSBvcHRfZGV0YWlscztcbiAgICB9XG59XG5jbGFzcyBDaHJvbWVDYXN0U3R1YiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuQXV0b0pvaW5Qb2xpY3kgPSBlbnVtc18xLkF1dG9Kb2luUG9saWN5O1xuICAgICAgICB0aGlzLm1lZGlhID0gbmV3IG1lZGlhXzEuTWVkaWFTdHViKCk7XG4gICAgfVxuICAgIGluaXRpYWxpemUoYXBpQ29uZmlnLCBvblN1Y2Nlc3MsIG9uRXJyb3IpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiSU5JVElBTElaRVwiLCBhcGlDb25maWcpO1xuICAgIH1cbn1cbmNsYXNzIENocm9tZVN0dWIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhc3RTdHViID0gbmV3IENocm9tZUNhc3RTdHViKCk7XG4gICAgfVxuICAgIGdldCBjYXN0KCkge1xuICAgICAgICBsb2dfMS5sb2coXCJSRUFEIGNocm9tZS5jYXN0XCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5jYXN0U3R1YjtcbiAgICB9XG59XG5leHBvcnRzLkNocm9tZVN0dWIgPSBDaHJvbWVTdHViO1xuY2xhc3MgQ2hyb21lQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2hyb21lID0gbmV3IENocm9tZVN0dWIoKTtcbiAgICAgICAgdGhpcy5vbkdDYXN0QXBpQXZhaWxhYmxlID0gKGlzQXZhaWxhYmxlLCBlcnIpID0+IHtcbiAgICAgICAgICAgIGxvZ18xLmxvZyhcInJlY2VpdmVkIEdDYXN0IEFQSSBBdmFpbGFiaWxpdHk6IFwiLCBpc0F2YWlsYWJsZSwgZXJyKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc2V0R0Nhc3RBcGlBdmFpbGFibGVIYW5kbGVyKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMucmVjZWl2ZWRBcGlBdmFpbGFibGVIYW5kbGVyID0gY2FsbGJhY2s7XG4gICAgfVxuICAgIG5vdGlmeUdDYXN0QXZhaWxhYmxlKGlzQXZhaWxhYmxlKSB7XG4gICAgICAgIGlmICh0aGlzLnJlY2VpdmVkQXBpQXZhaWxhYmxlSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5yZWNlaXZlZEFwaUF2YWlsYWJsZUhhbmRsZXIoaXNBdmFpbGFibGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5DaHJvbWVDb250cm9sbGVyID0gQ2hyb21lQ29udHJvbGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DbGllbnRJTyA9IHZvaWQgMDtcbmNvbnN0IGNvbnN0c18xID0gcmVxdWlyZShcIi4vY29uc3RzXCIpO1xuY29uc3QgbG9nXzEgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5jbGFzcyBDbGllbnRJTyB7XG4gICAgY29uc3RydWN0b3Ioc2NyaXB0KSB7XG4gICAgICAgIHRoaXMuc2NyaXB0ID0gc2NyaXB0O1xuICAgICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcihjb25zdHNfMS5JUENfSU5DT01JTkdfRVZFTlQsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBldmVudC5kZXRhaWw7XG4gICAgICAgICAgICBsb2dfMS5sb2coXCJzdHViIHJlY2VpdmVkIGlwYyBtZXNzYWdlXCIsIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZGlzcGF0Y2hNZXNzYWdlKG5hbWUsIGFyZ3MpIHtcbiAgICAgICAgdGhpcy5zY3JpcHQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoY29uc3RzXzEuSVBDX09VVEdPSU5HX0VWRU5ULCB7XG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgIGFyZ3MsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgICB9KSk7XG4gICAgfVxufVxuZXhwb3J0cy5DbGllbnRJTyA9IENsaWVudElPO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNUVUJfRUxFTUVOVF9JRCA9IGV4cG9ydHMuSVBDX0lOQ09NSU5HX0VWRU5UID0gZXhwb3J0cy5JUENfT1VUR09JTkdfRVZFTlQgPSB2b2lkIDA7XG5leHBvcnRzLklQQ19PVVRHT0lOR19FVkVOVCA9IFwiY2FzdGFibGUtYnJvd3Nlci0+ZXh0ZW5zaW9uXCI7XG5leHBvcnRzLklQQ19JTkNPTUlOR19FVkVOVCA9IFwiY2FzdGFibGUtZXh0ZW5zaW9uLT5icm93c2VyXCI7XG5leHBvcnRzLlNUVUJfRUxFTUVOVF9JRCA9IFwiY2FzdGFibGUuc2NyaXB0XCI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRXZlbnRSZWdpc3RyYXIgPSBleHBvcnRzLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBleHBvcnRzLmFkZEV2ZW50TGlzdGVuZXIgPSBleHBvcnRzLmRpc3BhdGNoTWVzc2FnZSA9IHZvaWQgMDtcbmNvbnN0IGxvZ18xID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuZnVuY3Rpb24gZGlzcGF0Y2hNZXNzYWdlKG1lc3NhZ2VOYW1lLCBjb250ZW50KSB7XG4gICAgY29uc3QgZSA9IHNhZmFyaS5leHRlbnNpb247XG4gICAgZS5kaXNwYXRjaE1lc3NhZ2UobWVzc2FnZU5hbWUsIGNvbnRlbnQpO1xufVxuZXhwb3J0cy5kaXNwYXRjaE1lc3NhZ2UgPSBkaXNwYXRjaE1lc3NhZ2U7XG5mdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgIGNvbnN0IHBhZ2UgPSBzYWZhcmkuc2VsZjtcbiAgICBwYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGhhbmRsZXIpO1xufVxuZXhwb3J0cy5hZGRFdmVudExpc3RlbmVyID0gYWRkRXZlbnRMaXN0ZW5lcjtcbmZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgY29uc3QgcGFnZSA9IHNhZmFyaS5zZWxmO1xuICAgIHBhZ2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgaGFuZGxlcik7XG59XG5leHBvcnRzLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSByZW1vdmVFdmVudExpc3RlbmVyO1xuY2xhc3MgRXZlbnRSZWdpc3RyYXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmhhbmRsZXJzID0ge307XG4gICAgICAgIHRoaXMuYm91bmRPbkV2ZW50ID0gdGhpcy5vbkV2ZW50LmJpbmQodGhpcyk7XG4gICAgfVxuICAgIHJlZ2lzdGVyKG1lc3NhZ2UsIGhhbmRsZXIpIHtcbiAgICAgICAgaWYgKCFPYmplY3Qua2V5cyh0aGlzLmhhbmRsZXJzKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMuYm91bmRPbkV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhbmRsZXJzW21lc3NhZ2VdID0gaGFuZGxlcjtcbiAgICB9XG4gICAgb24obWVzc2FnZSwgaGFuZGxlcikge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKG1lc3NhZ2UsIGhhbmRsZXIpO1xuICAgIH1cbiAgICBvbmNlKG1lc3NhZ2UsIGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlcihtZXNzYWdlLCAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgdGhpcy51bnJlZ2lzdGVyKG1lc3NhZ2UpO1xuICAgICAgICAgICAgaGFuZGxlciguLi5hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHVucmVnaXN0ZXIobWVzc2FnZSkge1xuICAgICAgICBkZWxldGUgdGhpcy5oYW5kbGVyc1ttZXNzYWdlXTtcbiAgICAgICAgaWYgKCFPYmplY3Qua2V5cyh0aGlzLmhhbmRsZXJzKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMuYm91bmRPbkV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkV2ZW50KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSB0aGlzLmhhbmRsZXJzW2V2ZW50Lm5hbWVdO1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgaGFuZGxlcihldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dfMS53YXJuKFwiTm8gaGFuZGxlciByZWdpc3RlcmVkIGZvcjpcIiwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5FdmVudFJlZ2lzdHJhciA9IEV2ZW50UmVnaXN0cmFyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb25zdHNfMSA9IHJlcXVpcmUoXCIuL2NvbnN0c1wiKTtcbmNvbnN0IGV4dGVuc2lvbl8xID0gcmVxdWlyZShcIi4vZXh0ZW5zaW9uXCIpO1xuY29uc3QgbG9nXzEgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5jb25zdCBzdHViXzEgPSByZXF1aXJlKFwiLi9zdHViXCIpO1xuZnVuY3Rpb24gcmVnaXN0ZXJDYXN0KHJlZ2lzdHJhcikge1xuICAgIGxvZ18xLmxvZyhcInJlZ2lzdGVyaW5nIGNhc3Qgc3R1YlwiKTtcbiAgICBpZiAoIWRvY3VtZW50LmhlYWQpIHtcbiAgICAgICAgbG9nXzEubG9nKFwibm8gZG9jdW1lbnQuaGVhZFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXdpbmRvdy5zYWZhcmkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicmVnaXN0ZXJDYXN0IE1VU1QgTk9UIGJlIGNhbGxlZCBmcm9tIHBhZ2UgY29udGV4dFwiKTtcbiAgICB9XG4gICAgLy8gaW5zZXJ0IHNjcmlwdCBpbnRvIHRoZSBwYWdlJ3MgY29udGV4dCBzbyBpdCBoYXMgYWNjZXNzIHRvXG4gICAgLy8gb3VyIGNocm9tZWNhc3Qgc3R1YnNcbiAgICBjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBuZXdFbGVtZW50LnNyYyA9IHNhZmFyaS5leHRlbnNpb24uYmFzZVVSSSArIFwiY2FzdGFibGUtc2NyaXB0LmpzXCI7XG4gICAgbmV3RWxlbWVudC5pZCA9IGNvbnN0c18xLlNUVUJfRUxFTUVOVF9JRDtcbiAgICBuZXdFbGVtZW50LmNoYXJzZXQgPSAndXRmLTgnO1xuICAgIG5ld0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihjb25zdHNfMS5JUENfT1VUR09JTkdfRVZFTlQsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGV2ZW50LmRldGFpbDtcbiAgICAgICAgbG9nXzEubG9nKFwiZm9yd2FyZGluZyBtZXNzYWdlOlwiLCBkYXRhKTtcbiAgICAgICAgZXh0ZW5zaW9uXzEuZGlzcGF0Y2hNZXNzYWdlKGRhdGEubmFtZSwgZGF0YS5hcmdzKTtcbiAgICB9KTtcbiAgICByZWdpc3RyYXIub24oY29uc3RzXzEuSVBDX0lOQ09NSU5HX0VWRU5ULCBldmVudCA9PiB7XG4gICAgICAgIGxvZ18xLmxvZyhcImV4dCByZWNlaXZlZCBpcGMgbWVzc2FnZVwiLCBldmVudCk7XG4gICAgICAgIG5ld0VsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoY29uc3RzXzEuSVBDX0lOQ09NSU5HX0VWRU5ULCB7XG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBldmVudC5uYW1lLFxuICAgICAgICAgICAgICAgIGFyZ3M6IGV2ZW50Lm1lc3NhZ2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnViYmxlczogZmFsc2UsXG4gICAgICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgICAgfSkpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobmV3RWxlbWVudCk7XG59XG5mdW5jdGlvbiBpbml0RXh0KCkge1xuICAgIGlmICh3aW5kb3cudG9wICE9PSB3aW5kb3cpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiaWdub3Jpbmcgbm9uLXRvcCB3aW5kb3c6XCIsIHdpbmRvdyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnN0c18xLlNUVUJfRUxFTUVOVF9JRCkpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiY2FzdGFibGUuc2NyaXB0IGFscmVhZHkgZW5xdWV1ZWRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gTk9URTogaW4gb3JkZXIgZm9yIG91ciBzdHViIHRvIGJlIGxvYWRlZCBpbnRvIHRoZSBhY3R1YWxcbiAgICAvLyBwYWdlJ3MgY29udGV4dCwgd2UgaGF2ZSB0byB3cml0ZSBhIDxzY3JpcHQ+IGludG8gdGhlIERPTVxuICAgIC8vIHdpdGggKmp1c3QqIHRoZSByaWdodCB0aW1pbmcuLi5cbiAgICAvLyBIZXJlLCB3ZSB3YWl0IHVudGlsIHRoZSBET00gY29udGVudCBoYXMgbG9hZGVkLCBsZXQgdGhlXG4gICAgLy8gU3dpZnQgZXh0ZW5zaW9uIGtub3csIGFuZCB3YWl0IGZvciBpdCB0byB0ZWxsIHVzIGl0J3Mgc2FmZVxuICAgIC8vIHRvIHJlZ2lzdGVyXG4gICAgbG9nXzEubG9nKFwiaW5pdEV4dFwiLCBkb2N1bWVudC5jdXJyZW50U2NyaXB0LCBzYWZhcmksIHdpbmRvdy5jaHJvbWUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICAgICAgbG9nXzEubG9nKFwiY29udGVudCBsb2FkZWQuLi5cIik7XG4gICAgICAgIGNvbnN0IHJlZ2lzdHJhciA9IG5ldyBleHRlbnNpb25fMS5FdmVudFJlZ2lzdHJhcigpO1xuICAgICAgICByZWdpc3RyYXIub25jZShcInJlZ2lzdGVyLWNhc3RcIiwgKCkgPT4ge1xuICAgICAgICAgICAgcmVnaXN0ZXJDYXN0KHJlZ2lzdHJhcik7XG4gICAgICAgIH0pO1xuICAgICAgICBleHRlbnNpb25fMS5kaXNwYXRjaE1lc3NhZ2UoXCJjb250ZW50LWxvYWRlZFwiKTtcbiAgICAgICAgbG9nXzEubG9nKFwiZGlzcGF0Y2hlZCBjb250ZW50LWxvYWRlZCFcIik7XG4gICAgfSk7XG59XG5pZiAod2luZG93LnNhZmFyaSAmJiB3aW5kb3cuc2FmYXJpLmV4dGVuc2lvbikge1xuICAgIGluaXRFeHQoKTtcbn1cbmVsc2Uge1xuICAgIHN0dWJfMS5pbml0KCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMud2FybiA9IGV4cG9ydHMubG9nID0gdm9pZCAwO1xuZnVuY3Rpb24gbG9nKC4uLmFyZ3MpIHtcbiAgICBjb25zb2xlLmxvZyhcIkNBU1RBQkxFOlwiLCAuLi5hcmdzKTtcbn1cbmV4cG9ydHMubG9nID0gbG9nO1xuZnVuY3Rpb24gd2FybiguLi5hcmdzKSB7XG4gICAgY29uc29sZS53YXJuKFwiQ0FTVEFCTEU6XCIsIC4uLmFyZ3MpO1xufVxuZXhwb3J0cy53YXJuID0gd2FybjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0ID0gdm9pZCAwO1xuY29uc3QgY2FzdF8xID0gcmVxdWlyZShcIi4vY2FzdFwiKTtcbmNvbnN0IGNocm9tZV8xID0gcmVxdWlyZShcIi4vY2hyb21lXCIpO1xuY29uc3QgY2xpZW50X2lvXzEgPSByZXF1aXJlKFwiLi9jbGllbnQtaW9cIik7XG5jb25zdCBsb2dfMSA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcbi8qKlxuICogSW5pdGlhbGl6ZXMgY2hyb21lY2FzdCBzdHViYmluZ1xuICovXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGxvZ18xLmxvZyhcInN0dWIuaW5pdFwiLCBzYWZhcmkuZXh0ZW5zaW9uLCBkb2N1bWVudC5jdXJyZW50U2NyaXB0LCB3aW5kb3cuc2FmYXJpLCB3aW5kb3cuY2hyb21lKTtcbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0O1xuICAgIGlmICghc2NyaXB0IHx8ICEoc2NyaXB0IGluc3RhbmNlb2YgSFRNTFNjcmlwdEVsZW1lbnQpKSB7XG4gICAgICAgIGxvZ18xLmxvZyhcIkVSUk9SOiBVbmFibGUgdG8gaW5pdCBjYXN0IHN0dWJzOyB1bmV4cGVjdGVkIGN1cnJlbnRTY3JpcHQ6XCIsIHNjcmlwdCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBjaHJvbWVfMS5DaHJvbWVDb250cm9sbGVyKCk7XG4gICAgY29uc3QgY2FzdCA9IG5ldyBjYXN0XzEuQ2FzdFN0dWIobmV3IGNsaWVudF9pb18xLkNsaWVudElPKHNjcmlwdCkpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHdpbmRvdywge1xuICAgICAgICBjaHJvbWU6IHtcbiAgICAgICAgICAgIHZhbHVlOiBjb250cm9sbGVyLmNocm9tZSxcbiAgICAgICAgfSxcbiAgICAgICAgY2FzdDoge1xuICAgICAgICAgICAgdmFsdWU6IGNhc3QsXG4gICAgICAgIH0sXG4gICAgICAgIF9fb25HQ2FzdEFwaUF2YWlsYWJsZToge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIGxvZ18xLmxvZyhcIlJFQUQgb25HQ2FzdEFwaUF2YWlsYWJsZSA8LSBcIiwgdHlwZW9mIGNvbnRyb2xsZXIub25HQ2FzdEFwaUF2YWlsYWJsZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXIub25HQ2FzdEFwaUF2YWlsYWJsZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsb2dfMS5sb2coXCJzZXQgb25HQ2FzdEFwaUF2YWlsYWJsZSA8LSBcIiwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuc2V0R0Nhc3RBcGlBdmFpbGFibGVIYW5kbGVyKHZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSk7XG4gICAgbG9nXzEubG9nKFwiQ3JlYXRlZCBjaHJvbWVjYXN0IEFQSSBzdHViXCIsIGNvbnRyb2xsZXIuY2hyb21lKTtcbn1cbmV4cG9ydHMuaW5pdCA9IGluaXQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvaW5kZXgudHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9