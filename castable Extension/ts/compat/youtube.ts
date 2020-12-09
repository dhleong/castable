import { log } from "../log";

import { CompatApplier, CompatContext } from "./model";

// NOTE: this extra agent stuff convinces Youtube's JS
// to initialize its chromecast support
const extraAgentConfig = " + Chrome/80+Android";

export class YoutubeCompat implements CompatApplier {
    public apply({ actualUserAgent, host }: CompatContext) {
        if (!host.endsWith("youtube.com")) return; // nop

        const patchedUserAgent = actualUserAgent + extraAgentConfig;

        const yt = (window as any)._yt_player
        if (yt) this.applyAgentBackport(yt, actualUserAgent, patchedUserAgent);

        // patch the userAgent in case it hasn't already been read
        Object.defineProperties(window.navigator, {
            userAgent: {
                value: patchedUserAgent,
            },
        });

        log("Applied YT user agent patch: ", patchedUserAgent);
    }

    private applyAgentBackport(
        yt: any,
        actualUserAgent: string,
        patchedUserAgent: string,
    ) {
        for (const key of Object.keys(yt)) {
            if (yt[key] === actualUserAgent) {
                yt[key] += extraAgentConfig;
                log("Back-ported user agent patch to _yt_player");
                break;
            }
        }
    }
}
