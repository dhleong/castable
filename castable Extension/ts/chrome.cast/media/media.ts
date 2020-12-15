import _debug from "debug";
import { EventEmitter } from "events";

import { SessionEventType } from "../../cast.framework/enums";
import { Listener } from "../generic-types";

export class MediaInfo {
    constructor(
        public readonly contentId: string,
        public readonly contentType: string,
    ) {}
}

export interface MediaSessionDelegate {
    addEventListener(
        event: SessionEventType.MEDIA_SESSION,
        listener: Listener<{ mediaSession: Media }>,
    ): void;
    removeEventListener(
        event: SessionEventType.MEDIA_SESSION,
        listener: Listener<{ mediaSession: Media }>,
    ): void;
}

const debug = _debug("castable:chrome.cast.media.Media");
const UPDATE_EVENT = "update";

export class Media {
    public media: MediaInfo | undefined;
    public currentTime: number | undefined;

    private readonly events = new EventEmitter();
    private readonly onUpdate = ({ mediaSession }: { mediaSession: Media }) => {
        this.events.emit(UPDATE_EVENT, mediaSession.media);
    };

    constructor(
        public readonly sessionId: string,
        public readonly mediaSessionId: string,
        private readonly delegate: MediaSessionDelegate,
    ) {}

    public addUpdateListener(listener: Listener<Media>) {
        debug("addUpdateListener");

        const isFirst = !this.events.listenerCount(UPDATE_EVENT);
        this.events.on(UPDATE_EVENT, listener);

        if (isFirst) {
            this.delegate.addEventListener(
                SessionEventType.MEDIA_SESSION,
                this.onUpdate,
            );
        }
    }

    public getEstimatedTime() {
        debug("getEstimatedTime", this.currentTime);
        return this.currentTime ?? 0;
    }

    public removeUpdateListener(listener: Listener<Media>) {
        debug("removeUpdateListener");

        this.events.off(UPDATE_EVENT, listener);
        const isLast = !this.events.listenerCount(UPDATE_EVENT);

        if (isLast) {
            this.delegate.removeEventListener(
                SessionEventType.MEDIA_SESSION,
                this.onUpdate,
            );
        }
    }
}
