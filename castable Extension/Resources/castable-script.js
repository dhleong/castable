"use strict";
var castable;
(function (castable) {
    class CastStub {
    }
    const castStub = new CastStub();
    castable.ChromeStub = {
        get cast() {
            log("READ chrome.cast");
            return castStub;
        }
    };
})(castable || (castable = {}));
function log(...args) {
    console.log("CASTABLE:", ...args);
}
function registerCast() {
    log("registering cast stub");
    if (!document.head) {
        log("no document.head");
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
        log("castable.script already enqueued");
        return;
    }
    if (window.top !== window) {
        log("ignoring non-top window:", window);
        return;
    }
    log(document.currentScript, safari, window.chrome);
    log("init ext:", window);
    document.addEventListener("DOMContentLoaded", event => {
        log("content loaded...");
        safari.self.addEventListener("message", (event) => {
            log("received:", event);
            switch (event.name) {
                case "register-cast":
                    registerCast();
                    break;
            }
        });
        safari.extension.dispatchMessage("content-loaded");
        log("dispatched content-loaded!");
    });
}
var castable;
(function (castable) {
    function initEmbed() {
        log("ext", safari.extension);
        window.chrome = castable.ChromeStub;
        log("Created chrome", window);
    }
    ;
    if (window.safari && window.safari.extension) {
        initExt();
    }
    else {
        log(document.currentScript, window.safari, window.chrome);
        initEmbed();
    }
})(castable || (castable = {}));
