import { log } from "./log";
import { dispatchMessage, EventRegistrar } from "./extension";
import { init as initStub } from "./stub";

function registerCast() {
    log("registering cast stub");

    if (!document.head) {
        log("no document.head");
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
        log("ignoring non-top window:", window);
        return;
    }

    if (document.getElementById("castable.script")) {
        log("castable.script already enqueued");
        return;
    }

    // NOTE: in order for our stub to be loaded into the actual
    // page's context, we have to write a <script> into the DOM
    // with *just* the right timing...
    // Here, we wait until the DOM content has loaded, let the
    // Swift extension know, and wait for it to tell us it's safe
    // to register

    log(document.currentScript, safari, (window as any).chrome);
    log("init ext:", window);

    document.addEventListener("DOMContentLoaded", () => {
        log("content loaded...");

        const registrar = new EventRegistrar();
        registrar.on("register-cast", registerCast);

        dispatchMessage("content-loaded");
        log("dispatched content-loaded!");
    });
}

if (window.safari && window.safari.extension) {
    initExt();
} else {
    initStub();
}
