import { CastStub } from "./cast";
import { ChromeController } from "./chrome";
import { ClientIO } from "./client-io";
import { log } from "./log";
import { proxy } from "./proxy";

/**
 * Initializes chromecast stubbing
 */
export function init() {
    log(
        "stub.init",
        safari.extension as any,
        document.currentScript,
        window.safari,
        (window as any).chrome,
    );

    const script = document.currentScript;
    if (!script || !(script instanceof HTMLScriptElement)) {
        log("ERROR: Unable to init cast stubs; unexpected currentScript:", script);
        return;
    }

    const cast = new CastStub(new ClientIO(script));
    const controller = new ChromeController(cast);

    Object.defineProperties(window, {
        chrome: {
            value: proxy(controller.chrome, "chrome"),
        },

        cast: {
            value: proxy(cast, "cast"),
        },

        __onGCastApiAvailable: {
            get() {
                log("READ onGCastApiAvailable <- ", typeof controller.onGCastApiAvailable);
                return controller.onGCastApiAvailable;
            },

            set(value) {
                log("set onGCastApiAvailable <- ", value);
                controller.setGCastApiAvailableHandler(value);
            },
        },
    });

    Object.defineProperties(window.navigator, {
        presentation: {
            get() {
                log("READ window.navigator.presentation");
                return {};
            },
        },
    });

    log("Created chromecast API stub", controller.chrome);
}
