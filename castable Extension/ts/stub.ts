import _debug from "debug";

import { CastStub } from "./cast";
import { ChromeController } from "./chrome";
import { ClientIO } from "./client-io";
import { applyCompat } from "./compat";
import { proxy } from "./proxy";

const debug = _debug("castable:stub");

function isInCastFramework() {
    const script = document.currentScript;
    if (!(script instanceof HTMLScriptElement)) {
        // definitely not
        return false;
    }

    return script.src.endsWith("/cast_framework.js");
}

/**
 * Initializes chromecast stubbing
 */
export function init() {
    debug(
        "init",
        safari.extension as any,
        document.currentScript,
        window.safari,
        (window as any).chrome,
    );

    const script = document.currentScript;
    if (!script || !(script instanceof HTMLScriptElement)) {
        debug("ERROR: Unable to init cast stubs; unexpected currentScript:", script);
        return;
    }

    const cast = new CastStub(new ClientIO(script));
    const controller = new ChromeController(cast);

    const chromeProxy = proxy(controller.chrome, "chrome");
    const castProxy = proxy(cast, "cast");

    let providedCast: any | undefined;

    Object.defineProperties(window, {
        chrome: {
            get() {
                if (controller.receivedApiAvailableHandler) {
                    return chromeProxy;
                }
            },

            set(value) {
                debug("SET window.chrome <-", value);
            },
        },

        cast: {
            get() {
                if (providedCast) {
                    return providedCast;
                }

                if (isInCastFramework()) {
                    // when accessed from cast_framework.js, we should
                    // ONLY reflect whatever value they're providing
                    // (via providedCast)
                    return;
                }

                if (controller.receivedApiAvailableHandler) {
                    return castProxy;
                }
            },

            set(value) {
                debug("SET window.cast <-", value);
                providedCast = proxy(value, "cast");
                return true;
            },
        },

        __onGCastApiAvailable: {
            get() {
                debug("READ onGCastApiAvailable <- ", typeof controller.receivedApiAvailableHandler);
                return controller.receivedApiAvailableHandler;
            },

            set(value) {
                debug("SET onGCastApiAvailable <- ", value);
                // NOTE: for now, at least, we don't use this method
                // to allow applications to propagate API availability
                // as normal
                // controller.setGCastApiAvailableHandler(value);
                controller.receivedApiAvailableHandler = value;
            },
        },
    });

    // not all sites work nicely out of the box. for now, at least,
    // this is primarily aimed at youtube:
    applyCompat();

    debug("Created chromecast API stub");
}
