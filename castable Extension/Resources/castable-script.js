/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
const log_1 = __webpack_require__(/*! ./log */ "./castable Extension/ts/log.ts");
class FrameworkStub {
}
class CastStub {
    constructor() {
        // TODO ?
        this.frame = new FrameworkStub();
    }
    get framework() {
        log_1.log("READ chrome.cast.framework");
        return this.frame;
    }
}
const castStub = new CastStub();
class ChromeStub {
    get cast() {
        log_1.log("READ chrome.cast");
        return castStub;
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jaHJvbWUudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvZXh0ZW5zaW9uLnRzIiwid2VicGFjazovL2Nhc3RhYmxlLy4vY2FzdGFibGUgRXh0ZW5zaW9uL3RzL2luZGV4LnRzIiwid2VicGFjazovL2Nhc3RhYmxlLy4vY2FzdGFibGUgRXh0ZW5zaW9uL3RzL2xvZy50cyIsIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9zdHViLnRzIiwid2VicGFjazovL2Nhc3RhYmxlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nhc3RhYmxlL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Qsd0JBQXdCLEdBQUcsa0JBQWtCO0FBQzdDLGNBQWMsbUJBQU8sQ0FBQyw2Q0FBTztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hDWDtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxzQkFBc0IsR0FBRywyQkFBMkIsR0FBRyx3QkFBd0IsR0FBRyx1QkFBdUI7QUFDekcsY0FBYyxtQkFBTyxDQUFDLDZDQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjs7Ozs7Ozs7Ozs7Ozs7O0FDakRUO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGNBQWMsbUJBQU8sQ0FBQyw2Q0FBTztBQUM3QixvQkFBb0IsbUJBQU8sQ0FBQyx5REFBYTtBQUN6QyxlQUFlLG1CQUFPLENBQUMsK0NBQVE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcERhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELFlBQVksR0FBRyxXQUFXO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxZQUFZOzs7Ozs7Ozs7Ozs7Ozs7O0FDVkM7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsWUFBWTtBQUNaLGlCQUFpQixtQkFBTyxDQUFDLG1EQUFVO0FBQ25DLGNBQWMsbUJBQU8sQ0FBQyw2Q0FBTztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTs7Ozs7OztVQzdCWjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7O1VDckJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImNhc3RhYmxlLXNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DaHJvbWVDb250cm9sbGVyID0gZXhwb3J0cy5DaHJvbWVTdHViID0gdm9pZCAwO1xuY29uc3QgbG9nXzEgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5jbGFzcyBGcmFtZXdvcmtTdHViIHtcbn1cbmNsYXNzIENhc3RTdHViIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gVE9ETyA/XG4gICAgICAgIHRoaXMuZnJhbWUgPSBuZXcgRnJhbWV3b3JrU3R1YigpO1xuICAgIH1cbiAgICBnZXQgZnJhbWV3b3JrKCkge1xuICAgICAgICBsb2dfMS5sb2coXCJSRUFEIGNocm9tZS5jYXN0LmZyYW1ld29ya1wiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJhbWU7XG4gICAgfVxufVxuY29uc3QgY2FzdFN0dWIgPSBuZXcgQ2FzdFN0dWIoKTtcbmNsYXNzIENocm9tZVN0dWIge1xuICAgIGdldCBjYXN0KCkge1xuICAgICAgICBsb2dfMS5sb2coXCJSRUFEIGNocm9tZS5jYXN0XCIpO1xuICAgICAgICByZXR1cm4gY2FzdFN0dWI7XG4gICAgfVxufVxuZXhwb3J0cy5DaHJvbWVTdHViID0gQ2hyb21lU3R1YjtcbmNsYXNzIENocm9tZUNvbnRyb2xsZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNocm9tZSA9IG5ldyBDaHJvbWVTdHViKCk7XG4gICAgICAgIHRoaXMub25HQ2FzdEFwaUF2YWlsYWJsZSA9IChpc0F2YWlsYWJsZSwgZXJyKSA9PiB7XG4gICAgICAgICAgICBsb2dfMS5sb2coXCJyZWNlaXZlZCBHQ2FzdCBBUEkgQXZhaWxhYmlsaXR5OiBcIiwgaXNBdmFpbGFibGUsIGVycik7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHNldEdDYXN0QXBpQXZhaWxhYmxlSGFuZGxlcihjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnJlY2VpdmVkQXBpQXZhaWxhYmxlSGFuZGxlciA9IGNhbGxiYWNrO1xuICAgIH1cbiAgICBub3RpZnlHQ2FzdEF2YWlsYWJsZShpc0F2YWlsYWJsZSkge1xuICAgICAgICBpZiAodGhpcy5yZWNlaXZlZEFwaUF2YWlsYWJsZUhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVjZWl2ZWRBcGlBdmFpbGFibGVIYW5kbGVyKGlzQXZhaWxhYmxlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuQ2hyb21lQ29udHJvbGxlciA9IENocm9tZUNvbnRyb2xsZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRXZlbnRSZWdpc3RyYXIgPSBleHBvcnRzLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBleHBvcnRzLmFkZEV2ZW50TGlzdGVuZXIgPSBleHBvcnRzLmRpc3BhdGNoTWVzc2FnZSA9IHZvaWQgMDtcbmNvbnN0IGxvZ18xID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuZnVuY3Rpb24gZGlzcGF0Y2hNZXNzYWdlKG1lc3NhZ2VOYW1lLCBjb250ZW50KSB7XG4gICAgY29uc3QgZSA9IHNhZmFyaS5leHRlbnNpb247XG4gICAgZS5kaXNwYXRjaE1lc3NhZ2UoXCJjb250ZW50LWxvYWRlZFwiKTtcbn1cbmV4cG9ydHMuZGlzcGF0Y2hNZXNzYWdlID0gZGlzcGF0Y2hNZXNzYWdlO1xuZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICBjb25zdCBwYWdlID0gc2FmYXJpLnNlbGY7XG4gICAgcGFnZS5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBoYW5kbGVyKTtcbn1cbmV4cG9ydHMuYWRkRXZlbnRMaXN0ZW5lciA9IGFkZEV2ZW50TGlzdGVuZXI7XG5mdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgIGNvbnN0IHBhZ2UgPSBzYWZhcmkuc2VsZjtcbiAgICBwYWdlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGhhbmRsZXIpO1xufVxuZXhwb3J0cy5yZW1vdmVFdmVudExpc3RlbmVyID0gcmVtb3ZlRXZlbnRMaXN0ZW5lcjtcbmNsYXNzIEV2ZW50UmVnaXN0cmFyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVycyA9IHt9O1xuICAgICAgICB0aGlzLmJvdW5kT25FdmVudCA9IHRoaXMub25FdmVudC5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICByZWdpc3RlcihtZXNzYWdlLCBoYW5kbGVyKSB7XG4gICAgICAgIGlmICghT2JqZWN0LmtleXModGhpcy5oYW5kbGVycykubGVuZ3RoKSB7XG4gICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCB0aGlzLmJvdW5kT25FdmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oYW5kbGVyc1ttZXNzYWdlXSA9IGhhbmRsZXI7XG4gICAgfVxuICAgIG9uKG1lc3NhZ2UsIGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlcihtZXNzYWdlLCBoYW5kbGVyKTtcbiAgICB9XG4gICAgdW5yZWdpc3RlcihtZXNzYWdlKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmhhbmRsZXJzW21lc3NhZ2VdO1xuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHRoaXMuaGFuZGxlcnMpLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgdGhpcy5ib3VuZE9uRXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IHRoaXMuaGFuZGxlcnNbZXZlbnQubmFtZV07XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgICBoYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvZ18xLndhcm4oXCJObyBoYW5kbGVyIHJlZ2lzdGVyZWQgZm9yOlwiLCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkV2ZW50UmVnaXN0cmFyID0gRXZlbnRSZWdpc3RyYXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGxvZ18xID0gcmVxdWlyZShcIi4vbG9nXCIpO1xuY29uc3QgZXh0ZW5zaW9uXzEgPSByZXF1aXJlKFwiLi9leHRlbnNpb25cIik7XG5jb25zdCBzdHViXzEgPSByZXF1aXJlKFwiLi9zdHViXCIpO1xuZnVuY3Rpb24gcmVnaXN0ZXJDYXN0KCkge1xuICAgIGxvZ18xLmxvZyhcInJlZ2lzdGVyaW5nIGNhc3Qgc3R1YlwiKTtcbiAgICBpZiAoIWRvY3VtZW50LmhlYWQpIHtcbiAgICAgICAgbG9nXzEubG9nKFwibm8gZG9jdW1lbnQuaGVhZFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXdpbmRvdy5zYWZhcmkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicmVnaXN0ZXJDYXN0IE1VU1QgTk9UIGJlIGNhbGxlZCBmcm9tIHBhZ2UgY29udGV4dFwiKTtcbiAgICB9XG4gICAgLy8gaW5zZXJ0IHNjcmlwdCBpbnRvIHRoZSBwYWdlJ3MgY29udGV4dCBzbyBpdCBoYXMgYWNjZXNzIHRvXG4gICAgLy8gb3VyIGNocm9tZWNhc3Qgc3R1YnNcbiAgICBjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBuZXdFbGVtZW50LnNyYyA9IHNhZmFyaS5leHRlbnNpb24uYmFzZVVSSSArIFwiY2FzdGFibGUtc2NyaXB0LmpzXCI7XG4gICAgbmV3RWxlbWVudC5pZCA9IFwiY2FzdGFibGUuc2NyaXB0XCI7XG4gICAgbmV3RWxlbWVudC5jaGFyc2V0ID0gJ3V0Zi04JztcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKG5ld0VsZW1lbnQpO1xufVxuZnVuY3Rpb24gaW5pdEV4dCgpIHtcbiAgICBpZiAod2luZG93LnRvcCAhPT0gd2luZG93KSB7XG4gICAgICAgIGxvZ18xLmxvZyhcImlnbm9yaW5nIG5vbi10b3Agd2luZG93OlwiLCB3aW5kb3cpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhc3RhYmxlLnNjcmlwdFwiKSkge1xuICAgICAgICBsb2dfMS5sb2coXCJjYXN0YWJsZS5zY3JpcHQgYWxyZWFkeSBlbnF1ZXVlZFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBOT1RFOiBpbiBvcmRlciBmb3Igb3VyIHN0dWIgdG8gYmUgbG9hZGVkIGludG8gdGhlIGFjdHVhbFxuICAgIC8vIHBhZ2UncyBjb250ZXh0LCB3ZSBoYXZlIHRvIHdyaXRlIGEgPHNjcmlwdD4gaW50byB0aGUgRE9NXG4gICAgLy8gd2l0aCAqanVzdCogdGhlIHJpZ2h0IHRpbWluZy4uLlxuICAgIC8vIEhlcmUsIHdlIHdhaXQgdW50aWwgdGhlIERPTSBjb250ZW50IGhhcyBsb2FkZWQsIGxldCB0aGVcbiAgICAvLyBTd2lmdCBleHRlbnNpb24ga25vdywgYW5kIHdhaXQgZm9yIGl0IHRvIHRlbGwgdXMgaXQncyBzYWZlXG4gICAgLy8gdG8gcmVnaXN0ZXJcbiAgICBsb2dfMS5sb2coZG9jdW1lbnQuY3VycmVudFNjcmlwdCwgc2FmYXJpLCB3aW5kb3cuY2hyb21lKTtcbiAgICBsb2dfMS5sb2coXCJpbml0IGV4dDpcIiwgd2luZG93KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgICAgIGxvZ18xLmxvZyhcImNvbnRlbnQgbG9hZGVkLi4uXCIpO1xuICAgICAgICBjb25zdCByZWdpc3RyYXIgPSBuZXcgZXh0ZW5zaW9uXzEuRXZlbnRSZWdpc3RyYXIoKTtcbiAgICAgICAgcmVnaXN0cmFyLm9uKFwicmVnaXN0ZXItY2FzdFwiLCByZWdpc3RlckNhc3QpO1xuICAgICAgICBleHRlbnNpb25fMS5kaXNwYXRjaE1lc3NhZ2UoXCJjb250ZW50LWxvYWRlZFwiKTtcbiAgICAgICAgbG9nXzEubG9nKFwiZGlzcGF0Y2hlZCBjb250ZW50LWxvYWRlZCFcIik7XG4gICAgfSk7XG59XG5pZiAod2luZG93LnNhZmFyaSAmJiB3aW5kb3cuc2FmYXJpLmV4dGVuc2lvbikge1xuICAgIGluaXRFeHQoKTtcbn1cbmVsc2Uge1xuICAgIHN0dWJfMS5pbml0KCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMud2FybiA9IGV4cG9ydHMubG9nID0gdm9pZCAwO1xuZnVuY3Rpb24gbG9nKC4uLmFyZ3MpIHtcbiAgICBjb25zb2xlLmxvZyhcIkNBU1RBQkxFOlwiLCAuLi5hcmdzKTtcbn1cbmV4cG9ydHMubG9nID0gbG9nO1xuZnVuY3Rpb24gd2FybiguLi5hcmdzKSB7XG4gICAgY29uc29sZS53YXJuKFwiQ0FTVEFCTEU6XCIsIC4uLmFyZ3MpO1xufVxuZXhwb3J0cy53YXJuID0gd2FybjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0ID0gdm9pZCAwO1xuY29uc3QgY2hyb21lXzEgPSByZXF1aXJlKFwiLi9jaHJvbWVcIik7XG5jb25zdCBsb2dfMSA9IHJlcXVpcmUoXCIuL2xvZ1wiKTtcbi8qKlxuICogSW5pdGlhbGl6ZXMgY2hyb21lY2FzdCBzdHViYmluZ1xuICovXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIGxvZ18xLmxvZyhcImV4dFwiLCBzYWZhcmkuZXh0ZW5zaW9uKTtcbiAgICBsb2dfMS5sb2coZG9jdW1lbnQuY3VycmVudFNjcmlwdCwgd2luZG93LnNhZmFyaSwgd2luZG93LmNocm9tZSk7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBjaHJvbWVfMS5DaHJvbWVDb250cm9sbGVyKCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMod2luZG93LCB7XG4gICAgICAgIGNocm9tZToge1xuICAgICAgICAgICAgdmFsdWU6IGNvbnRyb2xsZXIuY2hyb21lLFxuICAgICAgICB9LFxuICAgICAgICBfX29uR0Nhc3RBcGlBdmFpbGFibGU6IHtcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICBsb2dfMS5sb2coXCJSRUFEIG9uR0Nhc3RBcGlBdmFpbGFibGUgPC0gXCIsIHR5cGVvZiBjb250cm9sbGVyLm9uR0Nhc3RBcGlBdmFpbGFibGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250cm9sbGVyLm9uR0Nhc3RBcGlBdmFpbGFibGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbG9nXzEubG9nKFwic2V0IG9uR0Nhc3RBcGlBdmFpbGFibGUgPC0gXCIsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLnNldEdDYXN0QXBpQXZhaWxhYmxlSGFuZGxlcih2YWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0pO1xuICAgIGxvZ18xLmxvZyhcIkNyZWF0ZWQgY2hyb21lY2FzdCBBUEkgc3R1YlwiLCBjb250cm9sbGVyLmNocm9tZSk7XG59XG5leHBvcnRzLmluaXQgPSBpbml0O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vY2FzdGFibGUgRXh0ZW5zaW9uL3RzL2luZGV4LnRzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==