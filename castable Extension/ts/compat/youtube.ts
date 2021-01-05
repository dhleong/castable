import _debug from "debug";

import { CompatApplier, CompatContext } from "./model";

const debug = _debug("castable:compat:youtube");

export class YoutubeCompat implements CompatApplier {
    public apply({ actualUserAgent }: CompatContext) {
        const patchedUserAgent = window.navigator.userAgent;

        // it's the name of the var; not much we can do about the dangle:
        // eslint-disable-next-line no-underscore-dangle
        const yt = (window as any)._yt_player;
        if (yt) {
            YoutubeCompat.applyAgentBackport(
                yt,
                actualUserAgent,
                patchedUserAgent,
            );

            debug("Applied YT patch: ", patchedUserAgent);
        }
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
