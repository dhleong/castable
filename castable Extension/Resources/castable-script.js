/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./castable Extension/ts/chrome.ts":
/*!*****************************************!*\
  !*** ./castable Extension/ts/chrome.ts ***!
  \*****************************************/
/*! flagged exports */
/*! export ChromeStub [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChromeStub = void 0;
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
exports.ChromeStub = {
    get cast() {
        log_1.log("READ chrome.cast");
        return castStub;
    }
};


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
const chrome_1 = __webpack_require__(/*! ./chrome */ "./castable Extension/ts/chrome.ts");
const log_1 = __webpack_require__(/*! ./log */ "./castable Extension/ts/log.ts");
function registerCast() {
    log_1.log("registering cast stub");
    if (!document.head) {
        log_1.log("no document.head");
        return;
    }
    // Insert Assistant
    const newElement = document.createElement("script");
    newElement.src = safari.extension.baseURI + "castable-script.js";
    newElement.id = "castable.script";
    newElement.charset = 'utf-8';
    if (document.head.children.length) {
        document.head.insertBefore(newElement, document.head.childNodes[0]);
    }
    else {
        document.head.appendChild(newElement);
    }
}
function initExt() {
    if (document.getElementById("castable.script")) {
        log_1.log("castable.script already enqueued");
        return;
    }
    if (window.top !== window) {
        log_1.log("ignoring non-top window:", window);
        return;
    }
    log_1.log(document.currentScript, safari, window.chrome);
    log_1.log("init ext:", window);
    document.addEventListener("DOMContentLoaded", event => {
        log_1.log("content loaded...");
        safari.self.addEventListener("message", (event) => {
            log_1.log("received:", event);
            switch (event.name) {
                case "register-cast":
                    registerCast();
                    break;
            }
        });
        safari.extension.dispatchMessage("content-loaded");
        log_1.log("dispatched content-loaded!");
    });
}
function initEmbed() {
    log_1.log("ext", safari.extension);
    window.chrome = chrome_1.ChromeStub;
    log_1.log("Created chrome", window);
}
;
if (window.safari && window.safari.extension) {
    initExt();
}
else {
    log_1.log(document.currentScript, window.safari, window.chrome);
    initEmbed();
}


/***/ }),

/***/ "./castable Extension/ts/log.ts":
/*!**************************************!*\
  !*** ./castable Extension/ts/log.ts ***!
  \**************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export log [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.log = void 0;
function log(...args) {
    console.log("CASTABLE:", ...args);
}
exports.log = log;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXN0YWJsZS8uL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9jaHJvbWUudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vY2FzdGFibGUvLi9jYXN0YWJsZSBFeHRlbnNpb24vdHMvbG9nLnRzIiwid2VicGFjazovL2Nhc3RhYmxlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nhc3RhYmxlL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxrQkFBa0I7QUFDbEIsY0FBYyxtQkFBTyxDQUFDLDZDQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxpQkFBaUIsbUJBQU8sQ0FBQyxtREFBVTtBQUNuQyxjQUFjLG1CQUFPLENBQUMsNkNBQU87QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRGE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7Ozs7Ozs7VUNOWDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7O1VDckJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImNhc3RhYmxlLXNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DaHJvbWVTdHViID0gdm9pZCAwO1xuY29uc3QgbG9nXzEgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5jbGFzcyBGcmFtZXdvcmtTdHViIHtcbn1cbmNsYXNzIENhc3RTdHViIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gVE9ETyA/XG4gICAgICAgIHRoaXMuZnJhbWUgPSBuZXcgRnJhbWV3b3JrU3R1YigpO1xuICAgIH1cbiAgICBnZXQgZnJhbWV3b3JrKCkge1xuICAgICAgICBsb2dfMS5sb2coXCJSRUFEIGNocm9tZS5jYXN0LmZyYW1ld29ya1wiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJhbWU7XG4gICAgfVxufVxuY29uc3QgY2FzdFN0dWIgPSBuZXcgQ2FzdFN0dWIoKTtcbmV4cG9ydHMuQ2hyb21lU3R1YiA9IHtcbiAgICBnZXQgY2FzdCgpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiUkVBRCBjaHJvbWUuY2FzdFwiKTtcbiAgICAgICAgcmV0dXJuIGNhc3RTdHViO1xuICAgIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNocm9tZV8xID0gcmVxdWlyZShcIi4vY2hyb21lXCIpO1xuY29uc3QgbG9nXzEgPSByZXF1aXJlKFwiLi9sb2dcIik7XG5mdW5jdGlvbiByZWdpc3RlckNhc3QoKSB7XG4gICAgbG9nXzEubG9nKFwicmVnaXN0ZXJpbmcgY2FzdCBzdHViXCIpO1xuICAgIGlmICghZG9jdW1lbnQuaGVhZCkge1xuICAgICAgICBsb2dfMS5sb2coXCJubyBkb2N1bWVudC5oZWFkXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIEluc2VydCBBc3Npc3RhbnRcbiAgICBjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICBuZXdFbGVtZW50LnNyYyA9IHNhZmFyaS5leHRlbnNpb24uYmFzZVVSSSArIFwiY2FzdGFibGUtc2NyaXB0LmpzXCI7XG4gICAgbmV3RWxlbWVudC5pZCA9IFwiY2FzdGFibGUuc2NyaXB0XCI7XG4gICAgbmV3RWxlbWVudC5jaGFyc2V0ID0gJ3V0Zi04JztcbiAgICBpZiAoZG9jdW1lbnQuaGVhZC5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5pbnNlcnRCZWZvcmUobmV3RWxlbWVudCwgZG9jdW1lbnQuaGVhZC5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobmV3RWxlbWVudCk7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdEV4dCgpIHtcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXN0YWJsZS5zY3JpcHRcIikpIHtcbiAgICAgICAgbG9nXzEubG9nKFwiY2FzdGFibGUuc2NyaXB0IGFscmVhZHkgZW5xdWV1ZWRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy50b3AgIT09IHdpbmRvdykge1xuICAgICAgICBsb2dfMS5sb2coXCJpZ25vcmluZyBub24tdG9wIHdpbmRvdzpcIiwgd2luZG93KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsb2dfMS5sb2coZG9jdW1lbnQuY3VycmVudFNjcmlwdCwgc2FmYXJpLCB3aW5kb3cuY2hyb21lKTtcbiAgICBsb2dfMS5sb2coXCJpbml0IGV4dDpcIiwgd2luZG93KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBldmVudCA9PiB7XG4gICAgICAgIGxvZ18xLmxvZyhcImNvbnRlbnQgbG9hZGVkLi4uXCIpO1xuICAgICAgICBzYWZhcmkuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGxvZ18xLmxvZyhcInJlY2VpdmVkOlwiLCBldmVudCk7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwicmVnaXN0ZXItY2FzdFwiOlxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlckNhc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzYWZhcmkuZXh0ZW5zaW9uLmRpc3BhdGNoTWVzc2FnZShcImNvbnRlbnQtbG9hZGVkXCIpO1xuICAgICAgICBsb2dfMS5sb2coXCJkaXNwYXRjaGVkIGNvbnRlbnQtbG9hZGVkIVwiKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGluaXRFbWJlZCgpIHtcbiAgICBsb2dfMS5sb2coXCJleHRcIiwgc2FmYXJpLmV4dGVuc2lvbik7XG4gICAgd2luZG93LmNocm9tZSA9IGNocm9tZV8xLkNocm9tZVN0dWI7XG4gICAgbG9nXzEubG9nKFwiQ3JlYXRlZCBjaHJvbWVcIiwgd2luZG93KTtcbn1cbjtcbmlmICh3aW5kb3cuc2FmYXJpICYmIHdpbmRvdy5zYWZhcmkuZXh0ZW5zaW9uKSB7XG4gICAgaW5pdEV4dCgpO1xufVxuZWxzZSB7XG4gICAgbG9nXzEubG9nKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQsIHdpbmRvdy5zYWZhcmksIHdpbmRvdy5jaHJvbWUpO1xuICAgIGluaXRFbWJlZCgpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmxvZyA9IHZvaWQgMDtcbmZ1bmN0aW9uIGxvZyguLi5hcmdzKSB7XG4gICAgY29uc29sZS5sb2coXCJDQVNUQUJMRTpcIiwgLi4uYXJncyk7XG59XG5leHBvcnRzLmxvZyA9IGxvZztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL2Nhc3RhYmxlIEV4dGVuc2lvbi90cy9pbmRleC50c1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=