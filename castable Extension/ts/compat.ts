import { YoutubeCompat } from "./compat/youtube";
import { CompatContext } from "./compat/model";

const compats = [
    new YoutubeCompat(),
];

export function applyCompat() {
    const context: CompatContext = {
        actualUserAgent: window.navigator.userAgent,
        host: window.location.host,
        window,
    };
    for (const compat of compats) {
        compat.apply(context);
    }
}
