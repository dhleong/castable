import _debug from "debug";

import { CompatApplier, CompatContext } from "./model";

// NOTE: this extra agent stuff convinces Youtube's JS
// to initialize its chromecast support
const extraAgentConfig = " + Chrome/80+Android";

const debug = _debug("castable:compat:youtube");

export class YoutubeCompat implements CompatApplier {
    public apply({ actualUserAgent, host }: CompatContext) {
        if (!host.endsWith("youtube.com")) return; // nop

        const patchedUserAgent = actualUserAgent + extraAgentConfig;

        // it's the name of the var; not much we can do about the dangle:
        // eslint-disable-next-line no-underscore-dangle
        const yt = (window as any)._yt_player;
        if (yt) {
            YoutubeCompat.applyAgentBackport(
                yt,
                actualUserAgent,
                patchedUserAgent,
            );
        }

        // patch the userAgent in case it hasn't already been read
        Object.defineProperties(window.navigator, {
            userAgent: {
                value: patchedUserAgent,
            },
        });

        debug("Applied YT user agent patch: ", patchedUserAgent);
    }

    private static applyAgentBackport(
        yt: any,
        actualUserAgent: string,
        patchedUserAgent: string,
    ) {
        const v = yt;
        for (const key of Object.keys(yt)) {
            if (v[key] === actualUserAgent) {
                v[key] = patchedUserAgent;
                debug("Back-ported user agent patch to _yt_player");
                break;
            }
        }
    }
}
