import _debug from "debug";
import { proxy } from "../proxy";

import { CompatApplier, CompatContext } from "./model";

// NOTE: this extra agent stuff convinces the cast_sender.js
// to initialize its chromecast support
const extraAgentConfig = " + Chrome/80+Android";

const debug = _debug("castable:compat:agent");

/**
 * AgentAndPresentationCompat stubs the `navigator.userAgent` and
 * `.presentation` vars to make the page believe it is on Chrome
 */
export class AgentAndPresentationCompat implements CompatApplier {
    public apply({ actualUserAgent }: CompatContext) {
        const patchedUserAgent = actualUserAgent + extraAgentConfig;

        // patch the userAgent in case it hasn't already been read
        Object.defineProperties(window.navigator, {
            userAgent: {
                value: patchedUserAgent,
            },

            presentation: {
                get() {
                    debug("READ window.navigator.presentation");
                    return proxy({}, "window.navigator.presentation");
                },
            },
        });

        debug("Applied user agent patch: ", patchedUserAgent);
    }
}
