import { AgentAndPresentationCompat } from "./compat/agent";
import { onHost } from "./compat/matchers";
import { CompatApplier, CompatContext, CompatMatcher } from "./compat/model";
import { YoutubeCompat } from "./compat/youtube";

const compats: [CompatMatcher, CompatApplier][] = [
    [onHost("hulu.com"), new AgentAndPresentationCompat()],

    [onHost("youtube.com"), new AgentAndPresentationCompat()],
    [onHost("youtube.com"), new YoutubeCompat()],
];

export function applyCompat() {
    const context: CompatContext = {
        actualUserAgent: window.navigator.userAgent,
        host: window.location.host,
        window,
    };

    for (const [matcher, compat] of compats) {
        if (matcher(context)) {
            compat.apply(context);
        }
    }
}
