interface SafariExtension {
    // NOTE: if we put this in a @types file it'll override
    // the existing methods, instead of augmenting...
    dispatchMessage(messageName: string, content?: any): void;
}

function log(...args: any) {
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
    } else {
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

    log(document.currentScript, safari, (window as any).chrome);
    log("init ext:", window);

    document.addEventListener("DOMContentLoaded", event => {
        log("content loaded...");

        (safari.self as any).addEventListener("message", (event: any) => {
            log("received:", event);

            switch (event.name) {
            case "register-cast": registerCast(); break;
            }
        });

        (safari.extension as SafariExtension).dispatchMessage("content-loaded");
        log("dispatched content-loaded!");
    });
}

namespace castable {
    function initEmbed() {
        log("ext", (safari.extension as any));
        (window as any).chrome = ChromeStub;
        log("Created chrome", window);
    };

    if (window.safari && window.safari.extension) {
        initExt();
    } else {
        log(document.currentScript, window.safari, (window as any).chrome);
        initEmbed();
    }
}
