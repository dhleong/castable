import {
    STUB_ELEMENT_ID,
    IPC_OUTGOING_EVENT,
    IPC_INCOMING_EVENT,
} from "./consts";
import { dispatchMessage, EventRegistrar } from "./extension";
import { log } from "./log";
import { init as initStub } from "./stub";
import { ClientEvent } from "./client-io";

function registerCast(registrar: EventRegistrar) {
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
    newElement.id = STUB_ELEMENT_ID;
    newElement.charset = 'utf-8';
    newElement.addEventListener(IPC_OUTGOING_EVENT, event => {
        const data = (event as CustomEvent<ClientEvent>).detail;
        log("forwarding message:", data);

        dispatchMessage(data.name, data.args);
    });

    registrar.on(IPC_INCOMING_EVENT, event => {
        log("ext received ipc message", event);
        newElement.dispatchEvent(new CustomEvent(IPC_INCOMING_EVENT, {
            detail: {
                name: event.name,
                args: (event as any).message,
            },
            bubbles: false,
            cancelable: false,
        }));
    });

    if (document.head.hasChildNodes()) {
        document.head.insertBefore(newElement, document.head.childNodes[0]);
    } else {
        document.head.appendChild(newElement);
    }
}

function initExt() {
    if (window.top !== window) {
        log("ignoring non-top window:", window);
        return;
    }

    if (document.getElementById(STUB_ELEMENT_ID)) {
        log("castable.script already enqueued");
        return;
    }

    // NOTE: in order for our stub to be loaded into the actual
    // page's context, we have to write a <script> into the DOM
    // with *just* the right timing...
    // Here, we wait until the DOM content has loaded, let the
    // Swift extension know, and wait for it to tell us it's safe
    // to register

    log("initExt", document.currentScript, safari, (window as any).chrome);

    document.addEventListener("DOMContentLoaded", () => {
        log("content loaded...");

        const registrar = new EventRegistrar();
        registrar.once("register-cast", () => {
            registerCast(registrar);
        });

        dispatchMessage("content-loaded");
        log("dispatched content-loaded!");
    });
}

if (window.safari && window.safari.extension) {
    initExt();
} else {
    initStub();
}
