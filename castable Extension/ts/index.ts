import {
    STUB_ELEMENT_ID,
    IPC_OUTGOING_EVENT,
    IPC_INCOMING_EVENT,
} from "./consts";
import { dispatchMessage, EventRegistrar } from "./extension";
import { log } from "./log";
import { init as initStub } from "./stub";
import { ClientEvent } from "./client-io";

function createScriptElement(url: string) {
    const newElement = document.createElement("script");
    newElement.src = url;
    newElement.id = STUB_ELEMENT_ID;
    newElement.charset = "utf-8";
    return newElement;
}

function registerCast(registrar: EventRegistrar) {
    log("registering cast stub");

    const scriptContainer = document.head ?? document.documentElement;

    if (!window.safari) {
        throw new Error("registerCast MUST NOT be called from page context");
    }

    // insert script into the page's context so it has access to
    // our chromecast stubs
    const script = createScriptElement(
        `${safari.extension.baseURI}castable-script.js`,
    );
    script.addEventListener(IPC_OUTGOING_EVENT, event => {
        const data = (event as CustomEvent<ClientEvent>).detail;
        log("forwarding message:", data);

        dispatchMessage(data.name, data.args);
    });

    registrar.on(IPC_INCOMING_EVENT, event => {
        log("ext received ipc message", event);
        script.dispatchEvent(new CustomEvent(IPC_INCOMING_EVENT, {
            detail: {
                name: event.name,
                args: (event as any).message,
            },
            bubbles: false,
            cancelable: false,
        }));
    });

    if (scriptContainer.hasChildNodes()) {
        scriptContainer.insertBefore(script, scriptContainer.childNodes[0]);
    } else {
        scriptContainer.appendChild(script);
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

    log("initExt", document.currentScript, safari, (window as any).chrome);
    const registrar = new EventRegistrar();
    registerCast(registrar);
}

if (window.safari && window.safari.extension) {
    initExt();
} else {
    initStub();
}
