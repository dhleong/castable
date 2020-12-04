import { ChromeController } from "./chrome";
import { log } from "./log";

/**
 * Initializes chromecast stubbing
 */
export function init() {
    log("ext", (safari.extension as any));
    log(document.currentScript, window.safari, (window as any).chrome);

    const controller = new ChromeController();

    Object.defineProperties(window, {
        chrome: {
            value: controller.chrome,
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

    log("Created chromecast API stub", controller.chrome);
}
