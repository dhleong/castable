import _debug from "debug";

import { CastStub } from "./cast";
import { ChromeController } from "./chrome";
import { ClientIO } from "./client-io";
import { applyCompat } from "./compat";
import { proxy } from "./proxy";

const debug = _debug("castable:stub");

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

    Object.defineProperties(window, {
        chrome: {
            get() {
                if (controller.receivedApiAvailableHandler) {
                    return chromeProxy;
                }
            },
        },

        cast: {
            get() {
                if (controller.receivedApiAvailableHandler) {
                    return castProxy;
                }
            },
        },

        __onGCastApiAvailable: {
            get() {
                debug("READ onGCastApiAvailable <- ", typeof controller.onGCastApiAvailable);
                return controller.onGCastApiAvailable;
            },

            set(value) {
                debug("set onGCastApiAvailable <- ", value);
                controller.setGCastApiAvailableHandler(value);
            },
        },
    });

    // not all sites work nicely out of the box. for now, at least,
    // this is primarily aimed at youtube:
    applyCompat();

    debug("Created chromecast API stub");
}
