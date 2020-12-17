import _debug from "debug";
import { EventEmitter } from "events";

import { SessionEventType } from "../../cast.framework/enums";
import { IClientIO } from "../../io/model";
import { MediaCommand, PlayerState } from "../enums";
import { Listener } from "../generic-types";
import { callbackAsyncFunction } from "../util";
import { Volume } from "../volume";

import { SeekRequest } from "./seek-request";
import { VolumeRequest } from "./volume-request";

export class MediaInfo {
    public duration?: number;
    public metadata?: any;

    constructor(
        public readonly contentId: string,
        public readonly contentType: string,
    ) {}
}

export interface MediaSessionDelegate {
    io: IClientIO;

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
    public playerState = PlayerState.IDLE;
    public volume?: Volume;

    // FIXME: the correct type here is an array of MediaCommand; we need to
    // transform this from what we get via the socket (an int mask)
    public supportedMediaCommands?: number;

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

    public readonly pause = this.createSimpleMediaCommand("PAUSE");
    public readonly play = this.createSimpleMediaCommand("PLAY");
    public readonly stop = this.createSimpleMediaCommand("STOP");

    public readonly queueNext = this.createSimpleMediaCommand("QUEUE_NEXT");
    public readonly queuePrev = this.createSimpleMediaCommand("QUEUE_PREV");

    public readonly seek = callbackAsyncFunction(
        async (request: SeekRequest) => {
            debug("seek:", request);
            return this.sendMediaCommand("SEEK", request);
        },
    );

    public readonly setVolume = callbackAsyncFunction(
        async (request: VolumeRequest) => {
            debug("volume:", request);
            return this.sendMediaCommand("SET_VOLUME", request.volume);
        },
    );

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

    private createSimpleMediaCommand(type: string) {
        return callbackAsyncFunction(
            async (request: any) => {
                debug("media command: ", type, request);
                return this.sendMediaCommand(type);
            },
        );
    }

    private async sendMediaCommand(type: string, extra?: {[key: string]: any}) {
        return this.delegate.io.rpc.sendMediaCommand({
            type,
            mediaSessionId: this.mediaSessionId,
            ...extra,
        });
    }
}
