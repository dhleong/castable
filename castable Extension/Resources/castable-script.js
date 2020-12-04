/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./castable Extension/ts/cast.framework/cast-context.ts":
/*!**************************************************************!*\
  !*** ./castable Extension/ts/cast.framework/cast-context.ts ***!
  \**************************************************************/
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
exports.CastContext = void 0;
const log_1 = __webpack_require__(/*! ../log */ "./castable Extension/ts/log.ts");
const enums_1 = __webpack_require__(/*! ../chrome.cast/enums */ "./castable Extension/ts/chrome.cast/enums.ts");
const enums_2 = __webpack_require__(/*! ./enums */ "./castable Extension/ts/cast.framework/enums.ts");
class CastContext {
    static getInstance() {
        // TODO
        return new CastContext();
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
const log_1 = __webpack_require__(/*! ./log */ "./castable Extension/ts/log.ts");
const cast_context_1 = __webpack_require__(/*! ./cast.framework/cast-context */ "./castable Extension/ts/cast.framework/cast-context.ts");
const enums_1 = __webpack_require__(/*! ./cast.framework/enums */ "./castable Extension/ts/cast.framework/enums.ts");
class FrameworkStub {
    constructor() {
        this.CastState = enums_1.CastState;
        this.SessionState = enums_1.SessionState;
        this.CastContext = cast_context_1.CastContext;
        this.CastContextEventType = enums_1.CastContextEventType;
    }
}
class CastStub {
    constructor() {
        this.frameworkStub = new FrameworkStub();
    }
    get framework() {
        log_1.log("READ cast.framework");
        return this.frameworkStub;
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
    e.dispatchMessage("content-loaded");
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
const log_1 = __webpack_require__(/*! ./log */ "./castable Extension/ts/log.ts");
const extension_1 = __webpack_require__(/*! ./extension */ "./castable Extension/ts/extension.ts");
const stub_1 = __webpack_require__(/*! ./stub */ "./castable Extension/ts/stub.ts");
function registerCast() {
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
    newElement.id = "castable.script";
    newElement.charset = 'utf-8';
    document.head.appendChild(newElement);
}
function initExt() {
    if (window.top !== window) {
        log_1.log("ignoring non-top window:", window);
        return;
    }
    if (document.getElementById("castable.script")) {
        log_1.log("castable.script already enqueued");
        return;
    }
    // NOTE: in order for our stub to be loaded into the actual
    // page's context, we have to write a <script> into the DOM
    // with *just* the right timing...
    // Here, we wait until the DOM content has loaded, let the
    // Swift extension know, and wait for it to tell us it's safe
    // to register
    log_1.log(document.currentScript, safari, window.chrome);
    log_1.log("init ext:", window);
    document.addEventListener("DOMContentLoaded", () => {
        log_1.log("content loaded...");
        const registrar = new extension_1.EventRegistrar();
        registrar.on("register-cast", registerCast);
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
const log_1 = __webpack_require__(/*! ./log */ "./castable Extension/ts/log.ts");
/**
 * Initializes chromecast stubbing
 */
function init() {
    log_1.log("ext", safari.extension);
    log_1.log(document.currentScript, window.safari, window.chrome);
    const controller = new chrome_1.ChromeController();
    Object.defineProperties(window, {
        chrome: {
            value: controller.chrome,
        },
        cast: {
            value: new cast_1.CastStub(),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jYXN0LmZyYW1ld29yay9jYXN0LWNvbnRleHQudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvY2FzdC5mcmFtZXdvcmsvZW51bXMudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvY2FzdC50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jaHJvbWUuY2FzdC9lbnVtcy50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jaHJvbWUuY2FzdC9tZWRpYS50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jaHJvbWUudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvZXh0ZW5zaW9uLnRzIiwid2VicGFjazovL2Nhc3RhYmxlLy4vY2FzdGFibGUgRXh0ZW5zaW9uL3RzL2luZGV4LnRzIiwid2VicGFjazovL2Nhc3RhYmxlLy4vY2FzdGFibGUgRXh0ZW5zaW9uL3RzL2xvZy50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9zdHViLnRzIiwid2VicGFjazovL2Nhc3RhYmxlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nhc3RhYmxlL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtB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QUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZOzs7Ozs7O1VDakNaO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiY2FzdGFibGUtc2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ2FzdENvbnRleHQgPSB2b2lkIDA7XG5jb25zdCBsb2dfMSA9IHJlcXVpcmUoXCIuLi9sb2dcIik7XG5jb25zdCBlbnVtc18xID0gcmVxdWlyZShcIi4uL2Nocm9tZS5jYXN0L2VudW1zXCIpO1xuY29uc3QgZW51bXNfMiA9IHJlcXVpcmUoXCIuL2VudW1zXCIpO1xuY2xhc3MgQ2FzdENvbnRleHQge1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICByZXR1cm4gbmV3IENhc3RDb250ZXh0KCk7XG4gICAgfVxuICAgIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiQ2FzdENvbnRleHQuYWRkRXZlbnRMaXN0ZW5lclwiLCBldmVudCwgaGFuZGxlcik7XG4gICAgfVxuICAgIGdldENhc3RTdGF0ZSgpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiQ2FzdENvbnRleHQuZ2V0Q2FzdFN0YXRlXCIpO1xuICAgICAgICAvLyBUT0RPXG4gICAgICAgIHJldHVybiBlbnVtc18yLkNhc3RTdGF0ZVtlbnVtc18yLkNhc3RTdGF0ZS5OT19ERVZJQ0VTX0FWQUlMQUJMRV07XG4gICAgfVxuICAgIGdldEN1cnJlbnRTZXNzaW9uKCkge1xuICAgICAgICBsb2dfMS5sb2coXCJDYXN0Q29udGV4dC5nZXRDdXJyZW50U2Vzc2lvblwiKTtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZ2V0U2Vzc2lvblN0YXRlKCkge1xuICAgICAgICBsb2dfMS5sb2coXCJDYXN0Q29udGV4dC5nZXRTZXNzaW9uU3RhdGVcIik7XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgcmV0dXJuIGVudW1zXzIuU2Vzc2lvblN0YXRlW2VudW1zXzIuU2Vzc2lvblN0YXRlLk5PX1NFU1NJT05dO1xuICAgIH1cbiAgICByZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgIGxvZ18xLmxvZyhcIkNhc3RDb250ZXh0LnJlbW92ZUV2ZW50TGlzdGVuZXJcIiwgZXZlbnQsIGhhbmRsZXIpO1xuICAgIH1cbiAgICByZXF1ZXN0U2Vzc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGxvZ18xLmxvZyhcIkNhc3RDb250ZXh0LnJlcXVlc3RTZXNzaW9uXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGVudW1zXzEuRXJyb3JDb2RlW2VudW1zXzEuRXJyb3JDb2RlLkNBTkNFTF07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZXRMYXVuY2hDcmVkZW50aWFsc0RhdGEoZGF0YSkge1xuICAgICAgICBsb2dfMS5sb2coXCJDYXN0Q29udGV4dC5zZXRMYXVuY2hDcmVkZW50aWFsc0RhdGFcIiwgZGF0YSk7XG4gICAgfVxuICAgIHNldE9wdGlvbnMob3B0cykge1xuICAgICAgICBsb2dfMS5sb2coXCJDYXN0Q29udGV4dC5zZXRPcHRpb25zXCIsIG9wdHMpO1xuICAgIH1cbn1cbmV4cG9ydHMuQ2FzdENvbnRleHQgPSBDYXN0Q29udGV4dDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DYXN0Q29udGV4dEV2ZW50VHlwZSA9IGV4cG9ydHMuU2Vzc2lvblN0YXRlID0gZXhwb3J0cy5DYXN0U3RhdGUgPSB2b2lkIDA7XG52YXIgQ2FzdFN0YXRlO1xuKGZ1bmN0aW9uIChDYXN0U3RhdGUpIHtcbiAgICBDYXN0U3RhdGVbQ2FzdFN0YXRlW1wiTk9fREVWSUNFU19BVkFJTEFCTEVcIl0gPSAwXSA9IFwiTk9fREVWSUNFU19BVkFJTEFCTEVcIjtcbiAgICBDYXN0U3RhdGVbQ2FzdFN0YXRlW1wiTk9UX0NPTk5FQ1RFRFwiXSA9IDFdID0gXCJOT1RfQ09OTkVDVEVEXCI7XG4gICAgQ2FzdFN0YXRlW0Nhc3RTdGF0ZVtcIkNPTk5FQ1RJTkdcIl0gPSAyXSA9IFwiQ09OTkVDVElOR1wiO1xuICAgIENhc3RTdGF0ZVtDYXN0U3RhdGVbXCJDT05ORUNURURcIl0gPSAzXSA9IFwiQ09OTkVDVEVEXCI7XG59KShDYXN0U3RhdGUgPSBleHBvcnRzLkNhc3RTdGF0ZSB8fCAoZXhwb3J0cy5DYXN0U3RhdGUgPSB7fSkpO1xudmFyIFNlc3Npb25TdGF0ZTtcbihmdW5jdGlvbiAoU2Vzc2lvblN0YXRlKSB7XG4gICAgU2Vzc2lvblN0YXRlW1Nlc3Npb25TdGF0ZVtcIk5PX1NFU1NJT05cIl0gPSAwXSA9IFwiTk9fU0VTU0lPTlwiO1xuICAgIFNlc3Npb25TdGF0ZVtTZXNzaW9uU3RhdGVbXCJTRVNTSU9OX1NUQVJUSU5HXCJdID0gMV0gPSBcIlNFU1NJT05fU1RBUlRJTkdcIjtcbiAgICBTZXNzaW9uU3RhdGVbU2Vzc2lvblN0YXRlW1wiU0VTU0lPTl9TVEFSVEVEXCJdID0gMl0gPSBcIlNFU1NJT05fU1RBUlRFRFwiO1xuICAgIFNlc3Npb25TdGF0ZVtTZXNzaW9uU3RhdGVbXCJTRVNTSU9OX1NUQVJUX0ZBSUxFRFwiXSA9IDNdID0gXCJTRVNTSU9OX1NUQVJUX0ZBSUxFRFwiO1xuICAgIFNlc3Npb25TdGF0ZVtTZXNzaW9uU3RhdGVbXCJTRVNTSU9OX0VORElOR1wiXSA9IDRdID0gXCJTRVNTSU9OX0VORElOR1wiO1xuICAgIFNlc3Npb25TdGF0ZVtTZXNzaW9uU3RhdGVbXCJTRVNTSU9OX0VOREVEXCJdID0gNV0gPSBcIlNFU1NJT05fRU5ERURcIjtcbiAgICBTZXNzaW9uU3RhdGVbU2Vzc2lvblN0YXRlW1wiU0VTU0lPTl9SRVNVTUVEXCJdID0gNl0gPSBcIlNFU1NJT05fUkVTVU1FRFwiO1xufSkoU2Vzc2lvblN0YXRlID0gZXhwb3J0cy5TZXNzaW9uU3RhdGUgfHwgKGV4cG9ydHMuU2Vzc2lvblN0YXRlID0ge30pKTtcbnZhciBDYXN0Q29udGV4dEV2ZW50VHlwZTtcbihmdW5jdGlvbiAoQ2FzdENvbnRleHRFdmVudFR5cGUpIHtcbiAgICBDYXN0Q29udGV4dEV2ZW50VHlwZVtcIkNBU1RfU1RBVEVfQ0hBTkdFRFwiXSA9IFwiY2FzdHN0YXRlY2hhbmdlZFwiO1xuICAgIENhc3RDb250ZXh0RXZlbnRUeXBlW1wiU0VTU0lPTl9TVEFURV9DSEFOR0VEXCJdID0gXCJzZXNzaW9uc3RhdGVjaGFuZ2VkXCI7XG59KShDYXN0Q29udGV4dEV2ZW50VHlwZSA9IGV4cG9ydHMuQ2FzdENvbnRleHRFdmVudFR5cGUgfHwgKGV4cG9ydHMuQ2FzdENvbnRleHRFdmVudFR5cGUgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNhc3RTdHViID0gdm9pZCAwO1xuY29uc3QgbG9nXzEgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5jb25zdCBjYXN0X2NvbnRleHRfMSA9IHJlcXVpcmUoXCIuL2Nhc3QuZnJhbWV3b3JrL2Nhc3QtY29udGV4dFwiKTtcbmNvbnN0IGVudW1zXzEgPSByZXF1aXJlKFwiLi9jYXN0LmZyYW1ld29yay9lbnVtc1wiKTtcbmNsYXNzIEZyYW1ld29ya1N0dWIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLkNhc3RTdGF0ZSA9IGVudW1zXzEuQ2FzdFN0YXRlO1xuICAgICAgICB0aGlzLlNlc3Npb25TdGF0ZSA9IGVudW1zXzEuU2Vzc2lvblN0YXRlO1xuICAgICAgICB0aGlzLkNhc3RDb250ZXh0ID0gY2FzdF9jb250ZXh0XzEuQ2FzdENvbnRleHQ7XG4gICAgICAgIHRoaXMuQ2FzdENvbnRleHRFdmVudFR5cGUgPSBlbnVtc18xLkNhc3RDb250ZXh0RXZlbnRUeXBlO1xuICAgIH1cbn1cbmNsYXNzIENhc3RTdHViIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5mcmFtZXdvcmtTdHViID0gbmV3IEZyYW1ld29ya1N0dWIoKTtcbiAgICB9XG4gICAgZ2V0IGZyYW1ld29yaygpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiUkVBRCBjYXN0LmZyYW1ld29ya1wiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJhbWV3b3JrU3R1YjtcbiAgICB9XG59XG5leHBvcnRzLkNhc3RTdHViID0gQ2FzdFN0dWI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRXJyb3JDb2RlID0gZXhwb3J0cy5BdXRvSm9pblBvbGljeSA9IHZvaWQgMDtcbnZhciBBdXRvSm9pblBvbGljeTtcbihmdW5jdGlvbiAoQXV0b0pvaW5Qb2xpY3kpIHtcbiAgICBBdXRvSm9pblBvbGljeVtBdXRvSm9pblBvbGljeVtcIlRBQl9BTkRfT1JJR0lOX1NDT1BFRFwiXSA9IDBdID0gXCJUQUJfQU5EX09SSUdJTl9TQ09QRURcIjtcbiAgICBBdXRvSm9pblBvbGljeVtBdXRvSm9pblBvbGljeVtcIk9SSUdJTl9TQ09QRURcIl0gPSAxXSA9IFwiT1JJR0lOX1NDT1BFRFwiO1xuICAgIEF1dG9Kb2luUG9saWN5W0F1dG9Kb2luUG9saWN5W1wiUEFHRV9TQ09QRURcIl0gPSAyXSA9IFwiUEFHRV9TQ09QRURcIjtcbn0pKEF1dG9Kb2luUG9saWN5ID0gZXhwb3J0cy5BdXRvSm9pblBvbGljeSB8fCAoZXhwb3J0cy5BdXRvSm9pblBvbGljeSA9IHt9KSk7XG52YXIgRXJyb3JDb2RlO1xuKGZ1bmN0aW9uIChFcnJvckNvZGUpIHtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiQ0FOQ0VMXCJdID0gMF0gPSBcIkNBTkNFTFwiO1xuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJUSU1FT1VUXCJdID0gMV0gPSBcIlRJTUVPVVRcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiQVBJX05PVF9JTklUSUFMSVpFRFwiXSA9IDJdID0gXCJBUElfTk9UX0lOSVRJQUxJWkVEXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIklOVkFMSURfUEFSQU1FVEVSXCJdID0gM10gPSBcIklOVkFMSURfUEFSQU1FVEVSXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIkVYVEVOU0lPTl9OT1RfQ09NUEFUSUJMRVwiXSA9IDRdID0gXCJFWFRFTlNJT05fTk9UX0NPTVBBVElCTEVcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiRVhURU5TSU9OX01JU1NJTkdcIl0gPSA1XSA9IFwiRVhURU5TSU9OX01JU1NJTkdcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiUkVDRUlWRVJfVU5BVkFJTEFCTEVcIl0gPSA2XSA9IFwiUkVDRUlWRVJfVU5BVkFJTEFCTEVcIjtcbiAgICBFcnJvckNvZGVbRXJyb3JDb2RlW1wiU0VTU0lPTl9FUlJPUlwiXSA9IDddID0gXCJTRVNTSU9OX0VSUk9SXCI7XG4gICAgRXJyb3JDb2RlW0Vycm9yQ29kZVtcIkNIQU5ORUxfRVJST1JcIl0gPSA4XSA9IFwiQ0hBTk5FTF9FUlJPUlwiO1xuICAgIEVycm9yQ29kZVtFcnJvckNvZGVbXCJMT0FEX01FRElBX0ZBSUxFRFwiXSA9IDldID0gXCJMT0FEX01FRElBX0ZBSUxFRFwiO1xufSkoRXJyb3JDb2RlID0gZXhwb3J0cy5FcnJvckNvZGUgfHwgKGV4cG9ydHMuRXJyb3JDb2RlID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5NZWRpYVN0dWIgPSB2b2lkIDA7XG5jbGFzcyBNZWRpYVN0dWIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLkRFRkFVTFRfTUVESUFfUkVDRUlWRVJfQVBQX0lEID0gXCJDQzFBRDg0NVwiO1xuICAgIH1cbn1cbmV4cG9ydHMuTWVkaWFTdHViID0gTWVkaWFTdHViO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNocm9tZUNvbnRyb2xsZXIgPSBleHBvcnRzLkNocm9tZVN0dWIgPSB2b2lkIDA7XG5jb25zdCBtZWRpYV8xID0gcmVxdWlyZShcIi4vY2hyb21lLmNhc3QvbWVkaWFcIik7XG5jb25zdCBsb2dfMSA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcbmNvbnN0IGVudW1zXzEgPSByZXF1aXJlKFwiLi9jaHJvbWUuY2FzdC9lbnVtc1wiKTtcbmNsYXNzIENhc3RFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihjb2RlLCBvcHRfZGVzY3JpcHRpb24sIG9wdF9kZXRhaWxzKSB7XG4gICAgICAgIHN1cGVyKGBjaHJvbWUuY2FzdC5FcnJvcjogJHtjb2RlfWApO1xuICAgICAgICB0aGlzLmNvZGUgPSBjb2RlO1xuICAgICAgICB0aGlzLm9wdF9kZXNjcmlwdGlvbiA9IG9wdF9kZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5vcHRfZGV0YWlscyA9IG9wdF9kZXRhaWxzO1xuICAgIH1cbn1cbmNsYXNzIENocm9tZUNhc3RTdHViIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5BdXRvSm9pblBvbGljeSA9IGVudW1zXzEuQXV0b0pvaW5Qb2xpY3k7XG4gICAgICAgIHRoaXMubWVkaWEgPSBuZXcgbWVkaWFfMS5NZWRpYVN0dWIoKTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZShhcGlDb25maWcsIG9uU3VjY2Vzcywgb25FcnJvcikge1xuICAgICAgICBsb2dfMS5sb2coXCJJTklUSUFMSVpFXCIsIGFwaUNvbmZpZyk7XG4gICAgfVxufVxuY2xhc3MgQ2hyb21lU3R1YiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FzdFN0dWIgPSBuZXcgQ2hyb21lQ2FzdFN0dWIoKTtcbiAgICB9XG4gICAgZ2V0IGNhc3QoKSB7XG4gICAgICAgIGxvZ18xLmxvZyhcIlJFQUQgY2hyb21lLmNhc3RcIik7XG4gICAgICAgIHJldHVybiB0aGlzLmNhc3RTdHViO1xuICAgIH1cbn1cbmV4cG9ydHMuQ2hyb21lU3R1YiA9IENocm9tZVN0dWI7XG5jbGFzcyBDaHJvbWVDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jaHJvbWUgPSBuZXcgQ2hyb21lU3R1YigpO1xuICAgICAgICB0aGlzLm9uR0Nhc3RBcGlBdmFpbGFibGUgPSAoaXNBdmFpbGFibGUsIGVycikgPT4ge1xuICAgICAgICAgICAgbG9nXzEubG9nKFwicmVjZWl2ZWQgR0Nhc3QgQVBJIEF2YWlsYWJpbGl0eTogXCIsIGlzQXZhaWxhYmxlLCBlcnIpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBzZXRHQ2FzdEFwaUF2YWlsYWJsZUhhbmRsZXIoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5yZWNlaXZlZEFwaUF2YWlsYWJsZUhhbmRsZXIgPSBjYWxsYmFjaztcbiAgICB9XG4gICAgbm90aWZ5R0Nhc3RBdmFpbGFibGUoaXNBdmFpbGFibGUpIHtcbiAgICAgICAgaWYgKHRoaXMucmVjZWl2ZWRBcGlBdmFpbGFibGVIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVkQXBpQXZhaWxhYmxlSGFuZGxlcihpc0F2YWlsYWJsZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkNocm9tZUNvbnRyb2xsZXIgPSBDaHJvbWVDb250cm9sbGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkV2ZW50UmVnaXN0cmFyID0gZXhwb3J0cy5yZW1vdmVFdmVudExpc3RlbmVyID0gZXhwb3J0cy5hZGRFdmVudExpc3RlbmVyID0gZXhwb3J0cy5kaXNwYXRjaE1lc3NhZ2UgPSB2b2lkIDA7XG5jb25zdCBsb2dfMSA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcbmZ1bmN0aW9uIGRpc3BhdGNoTWVzc2FnZShtZXNzYWdlTmFtZSwgY29udGVudCkge1xuICAgIGNvbnN0IGUgPSBzYWZhcmkuZXh0ZW5zaW9uO1xuICAgIGUuZGlzcGF0Y2hNZXNzYWdlKFwiY29udGVudC1sb2FkZWRcIik7XG59XG5leHBvcnRzLmRpc3BhdGNoTWVzc2FnZSA9IGRpc3BhdGNoTWVzc2FnZTtcbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgY29uc3QgcGFnZSA9IHNhZmFyaS5zZWxmO1xuICAgIHBhZ2UuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgaGFuZGxlcik7XG59XG5leHBvcnRzLmFkZEV2ZW50TGlzdGVuZXIgPSBhZGRFdmVudExpc3RlbmVyO1xuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICBjb25zdCBwYWdlID0gc2FmYXJpLnNlbGY7XG4gICAgcGFnZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBoYW5kbGVyKTtcbn1cbmV4cG9ydHMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHJlbW92ZUV2ZW50TGlzdGVuZXI7XG5jbGFzcyBFdmVudFJlZ2lzdHJhciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlcnMgPSB7fTtcbiAgICAgICAgdGhpcy5ib3VuZE9uRXZlbnQgPSB0aGlzLm9uRXZlbnQuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgcmVnaXN0ZXIobWVzc2FnZSwgaGFuZGxlcikge1xuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHRoaXMuaGFuZGxlcnMpLmxlbmd0aCkge1xuICAgICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5ib3VuZE9uRXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGFuZGxlcnNbbWVzc2FnZV0gPSBoYW5kbGVyO1xuICAgIH1cbiAgICBvbihtZXNzYWdlLCBoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIobWVzc2FnZSwgaGFuZGxlcik7XG4gICAgfVxuICAgIHVucmVnaXN0ZXIobWVzc2FnZSkge1xuICAgICAgICBkZWxldGUgdGhpcy5oYW5kbGVyc1ttZXNzYWdlXTtcbiAgICAgICAgaWYgKCFPYmplY3Qua2V5cyh0aGlzLmhhbmRsZXJzKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMuYm91bmRPbkV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkV2ZW50KGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSB0aGlzLmhhbmRsZXJzW2V2ZW50Lm5hbWVdO1xuICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgaGFuZGxlcihldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dfMS53YXJuKFwiTm8gaGFuZGxlciByZWdpc3RlcmVkIGZvcjpcIiwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5FdmVudFJlZ2lzdHJhciA9IEV2ZW50UmVnaXN0cmFyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBsb2dfMSA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcbmNvbnN0IGV4dGVuc2lvbl8xID0gcmVxdWlyZShcIi4vZXh0ZW5zaW9uXCIpO1xuY29uc3Qgc3R1Yl8xID0gcmVxdWlyZShcIi4vc3R1YlwiKTtcbmZ1bmN0aW9uIHJlZ2lzdGVyQ2FzdCgpIHtcbiAgICBsb2dfMS5sb2coXCJyZWdpc3RlcmluZyBjYXN0IHN0dWJcIik7XG4gICAgaWYgKCFkb2N1bWVudC5oZWFkKSB7XG4gICAgICAgIGxvZ18xLmxvZyhcIm5vIGRvY3VtZW50LmhlYWRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF3aW5kb3cuc2FmYXJpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInJlZ2lzdGVyQ2FzdCBNVVNUIE5PVCBiZSBjYWxsZWQgZnJvbSBwYWdlIGNvbnRleHRcIik7XG4gICAgfVxuICAgIC8vIGluc2VydCBzY3JpcHQgaW50byB0aGUgcGFnZSdzIGNvbnRleHQgc28gaXQgaGFzIGFjY2VzcyB0b1xuICAgIC8vIG91ciBjaHJvbWVjYXN0IHN0dWJzXG4gICAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgbmV3RWxlbWVudC5zcmMgPSBzYWZhcmkuZXh0ZW5zaW9uLmJhc2VVUkkgKyBcImNhc3RhYmxlLXNjcmlwdC5qc1wiO1xuICAgIG5ld0VsZW1lbnQuaWQgPSBcImNhc3RhYmxlLnNjcmlwdFwiO1xuICAgIG5ld0VsZW1lbnQuY2hhcnNldCA9ICd1dGYtOCc7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChuZXdFbGVtZW50KTtcbn1cbmZ1bmN0aW9uIGluaXRFeHQoKSB7XG4gICAgaWYgKHdpbmRvdy50b3AgIT09IHdpbmRvdykge1xuICAgICAgICBsb2dfMS5sb2coXCJpZ25vcmluZyBub24tdG9wIHdpbmRvdzpcIiwgd2luZG93KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXN0YWJsZS5zY3JpcHRcIikpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiY2FzdGFibGUuc2NyaXB0IGFscmVhZHkgZW5xdWV1ZWRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gTk9URTogaW4gb3JkZXIgZm9yIG91ciBzdHViIHRvIGJlIGxvYWRlZCBpbnRvIHRoZSBhY3R1YWxcbiAgICAvLyBwYWdlJ3MgY29udGV4dCwgd2UgaGF2ZSB0byB3cml0ZSBhIDxzY3JpcHQ+IGludG8gdGhlIERPTVxuICAgIC8vIHdpdGggKmp1c3QqIHRoZSByaWdodCB0aW1pbmcuLi5cbiAgICAvLyBIZXJlLCB3ZSB3YWl0IHVudGlsIHRoZSBET00gY29udGVudCBoYXMgbG9hZGVkLCBsZXQgdGhlXG4gICAgLy8gU3dpZnQgZXh0ZW5zaW9uIGtub3csIGFuZCB3YWl0IGZvciBpdCB0byB0ZWxsIHVzIGl0J3Mgc2FmZVxuICAgIC8vIHRvIHJlZ2lzdGVyXG4gICAgbG9nXzEubG9nKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQsIHNhZmFyaSwgd2luZG93LmNocm9tZSk7XG4gICAgbG9nXzEubG9nKFwiaW5pdCBleHQ6XCIsIHdpbmRvdyk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgICAgICBsb2dfMS5sb2coXCJjb250ZW50IGxvYWRlZC4uLlwiKTtcbiAgICAgICAgY29uc3QgcmVnaXN0cmFyID0gbmV3IGV4dGVuc2lvbl8xLkV2ZW50UmVnaXN0cmFyKCk7XG4gICAgICAgIHJlZ2lzdHJhci5vbihcInJlZ2lzdGVyLWNhc3RcIiwgcmVnaXN0ZXJDYXN0KTtcbiAgICAgICAgZXh0ZW5zaW9uXzEuZGlzcGF0Y2hNZXNzYWdlKFwiY29udGVudC1sb2FkZWRcIik7XG4gICAgICAgIGxvZ18xLmxvZyhcImRpc3BhdGNoZWQgY29udGVudC1sb2FkZWQhXCIpO1xuICAgIH0pO1xufVxuaWYgKHdpbmRvdy5zYWZhcmkgJiYgd2luZG93LnNhZmFyaS5leHRlbnNpb24pIHtcbiAgICBpbml0RXh0KCk7XG59XG5lbHNlIHtcbiAgICBzdHViXzEuaW5pdCgpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLndhcm4gPSBleHBvcnRzLmxvZyA9IHZvaWQgMDtcbmZ1bmN0aW9uIGxvZyguLi5hcmdzKSB7XG4gICAgY29uc29sZS5sb2coXCJDQVNUQUJMRTpcIiwgLi4uYXJncyk7XG59XG5leHBvcnRzLmxvZyA9IGxvZztcbmZ1bmN0aW9uIHdhcm4oLi4uYXJncykge1xuICAgIGNvbnNvbGUud2FybihcIkNBU1RBQkxFOlwiLCAuLi5hcmdzKTtcbn1cbmV4cG9ydHMud2FybiA9IHdhcm47XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdCA9IHZvaWQgMDtcbmNvbnN0IGNhc3RfMSA9IHJlcXVpcmUoXCIuL2Nhc3RcIik7XG5jb25zdCBjaHJvbWVfMSA9IHJlcXVpcmUoXCIuL2Nocm9tZVwiKTtcbmNvbnN0IGxvZ18xID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuLyoqXG4gKiBJbml0aWFsaXplcyBjaHJvbWVjYXN0IHN0dWJiaW5nXG4gKi9cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbG9nXzEubG9nKFwiZXh0XCIsIHNhZmFyaS5leHRlbnNpb24pO1xuICAgIGxvZ18xLmxvZyhkb2N1bWVudC5jdXJyZW50U2NyaXB0LCB3aW5kb3cuc2FmYXJpLCB3aW5kb3cuY2hyb21lKTtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IGNocm9tZV8xLkNocm9tZUNvbnRyb2xsZXIoKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh3aW5kb3csIHtcbiAgICAgICAgY2hyb21lOiB7XG4gICAgICAgICAgICB2YWx1ZTogY29udHJvbGxlci5jaHJvbWUsXG4gICAgICAgIH0sXG4gICAgICAgIGNhc3Q6IHtcbiAgICAgICAgICAgIHZhbHVlOiBuZXcgY2FzdF8xLkNhc3RTdHViKCksXG4gICAgICAgIH0sXG4gICAgICAgIF9fb25HQ2FzdEFwaUF2YWlsYWJsZToge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIGxvZ18xLmxvZyhcIlJFQUQgb25HQ2FzdEFwaUF2YWlsYWJsZSA8LSBcIiwgdHlwZW9mIGNvbnRyb2xsZXIub25HQ2FzdEFwaUF2YWlsYWJsZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXIub25HQ2FzdEFwaUF2YWlsYWJsZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsb2dfMS5sb2coXCJzZXQgb25HQ2FzdEFwaUF2YWlsYWJsZSA8LSBcIiwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuc2V0R0Nhc3RBcGlBdmFpbGFibGVIYW5kbGVyKHZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSk7XG4gICAgbG9nXzEubG9nKFwiQ3JlYXRlZCBjaHJvbWVjYXN0IEFQSSBzdHViXCIsIGNvbnRyb2xsZXIuY2hyb21lKTtcbn1cbmV4cG9ydHMuaW5pdCA9IGluaXQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvaW5kZXgudHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9