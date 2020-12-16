import _debug from "debug";
import { EventEmitter } from "events";

import {
    ActiveInputState,
    SessionEventType,
    SessionState,
} from "./enums";

import { ClientIO } from "../client-io";
import { EventSpecIdentifier } from "../io/events";

import { ErrorCode } from "../chrome.cast/enums";
import { LoadRequest } from "../chrome.cast/media";
import { Receiver } from "../chrome.cast/receiver";
import { IMessageListener } from "../chrome.cast/listeners";
import { Listener } from "../chrome.cast/generic-types";
import {
    ActiveInputStateEventData,
    ApplicationMetadataEventData,
    ApplicationStatusEventData,
    MediaSessionEventData,
    VolumeEventData,
} from "./events";
import { Namespaces } from "./namespaces";
import { Media } from "../chrome.cast/media/media";
import { proxy } from "../proxy";

// NOTE: here instead of in events to avoid a circular dependency
export interface SessionStateEventData {
    session: CastSession;
    sessionState: SessionState;
    errorCode: ErrorCode;
}

const debug = _debug("castable:CastSession");

export class CastSession {
    private readonly events = new EventEmitter();

    private activeInputState = ActiveInputState.ACTIVE_INPUT_STATE_UNKNOWN;
    private sessionState = SessionState.SESSION_STARTED;
    private mediaSession?: Media;

    private onMediaMessage = (_: string, message: string) => {
        const parsed = JSON.parse(message);

        if (parsed.status && parsed.status.length) {
            for (const status of parsed.status) {
                debug("MEDIA STATUS = ", parsed.status[0]);
                const media = new Media(
                    this.getSessionId(),
                    status.mediaSessionId,
                    this,
                );

                // TODO this is lazy...
                Object.assign(media, {
                    media: null,
                    currentTime: 0,
                }, status);

                this.mediaSession = media;

                this.events.emit(SessionEventType.MEDIA_SESSION, {
                    mediaSession: proxy(media, "chrome.cast.media.Media()"),
                });
            }
        } else {
            debug("MEDIA MESSAGE = ", parsed);
        }
    };

    constructor(
        public readonly io: ClientIO,
        public readonly options: any,
        public readonly device: Receiver,
        private readonly sessionId: string,
    ) {}

    public addEventListener(
        event: SessionEventType.ACTIVE_INPUT_STATE_CHANGED,
        handler: Listener<ActiveInputStateEventData>,
    ): void;
    public addEventListener(
        event: SessionEventType.APPLICATION_METADATA_CHANGED,
        handler: Listener<ApplicationMetadataEventData>,
    ): void;
    public addEventListener(
        event: SessionEventType.APPLICATION_STATUS_CHANGED,
        handler: Listener<ApplicationStatusEventData>,
    ): void;
    public addEventListener(
        event: SessionEventType.MEDIA_SESSION,
        handler: Listener<MediaSessionEventData>,
    ): void;
    public addEventListener(
        event: SessionEventType.VOLUME_CHANGED,
        handler: Listener<VolumeEventData>,
    ): void;
    public addEventListener(event: string, handler: any) {
        debug("addEventListener", event, handler);
        const isFirst = !this.events.listenerCount(event);
        this.events.on(event, handler);
        if (!isFirst) return;

        switch (event) {
            case SessionEventType.MEDIA_SESSION:
                this.addMessageListener(Namespaces.MEDIA, this.onMediaMessage);
                break;

            default:
        }
    }

    public addMessageListener(namespace: string, listener: IMessageListener) {
        debug("addMessageListener", namespace, listener);
        this.io.events.on({
            id: EventSpecIdentifier.sessionMessage,
            param: namespace,
        }, listener);
    }

    public async endSession(stopCasting: boolean) {
        debug("endSession", stopCasting);
        try {
            this.sessionState = SessionState.SESSION_ENDING;
            await this.io.rpc.endCurrentSession({ stopCasting });

            this.sessionState = SessionState.SESSION_ENDED;

            // this should be the only event id we listen to here:
            await this.io.events.clearMatching(
                event => event.id === EventSpecIdentifier.sessionMessage,
            );
        } catch (e) {
            debug("endSession ERROR: ", e);
        }
    }

    public getActiveInputState() {
        debug("getActiveInputState");
        // ?
        return this.activeInputState;
    }

    public getApplicationMetadata() {
        // TODO get these from requestSession response
        return {
            applicationId: this.options.receiverApplicationId,
            images: [],
            name: this.options.receiverApplicationId,
            namespaces: [], // supported namespaces
        };
    }

    // eslint-disable-next-line class-methods-use-this
    public getApplicationStatus() {
        debug("getApplicationStatus");
        return null; // ?
    }

    public getCastDevice() {
        debug("getCastDevice", this.device);
        return this.device;
    }

    // eslint-disable-next-line class-methods-use-this
    public getMediaSession() {
        debug("getMediaSession");
        return this.mediaSession;
    }

    public getSessionId() {
        debug("getSessionId");
        return this.sessionId;
    }

    // eslint-disable-next-line class-methods-use-this
    public getSessionObj() {
        debug("getSessionObj");
        return {}; // chrome.cast.Session
    }

    public getSessionState() {
        debug("getSessionState", this.sessionState);
        return this.sessionState;
    }

    // eslint-disable-next-line class-methods-use-this
    public getVolume() {
        debug("getVolume");
        // TODO
        return 1;
    }

    // eslint-disable-next-line class-methods-use-this
    public isMute() {
        debug("isMute");
        // TODO
        return null;
    }

    public async loadMedia(loadRequest: LoadRequest) {
        debug("loadMedia", loadRequest);
        try {
            await this.io.rpc.loadMedia(loadRequest);
            debug("loadMedia: success!");
            return null;
        } catch (e) {
            debug("loadMedia: ERROR:", e);
            return ErrorCode.LOAD_MEDIA_FAILED;
        }
    }

    public removeEventListener(event: string, handler: any) {
        debug("removeEventListener", event, handler);
        this.events.off(event, handler);
        const isLast = !this.events.listenerCount(event);
        if (!isLast) return;

        switch (event) {
            case SessionEventType.MEDIA_SESSION:
                this.removeMessageListener(Namespaces.MEDIA, this.onMediaMessage);
                break;
        }
    }

    public removeMessageListener(namespace: string, listener: IMessageListener) {
        debug("removeMessageListener", namespace, listener);
        this.io.events.off({
            id: EventSpecIdentifier.sessionMessage,
            param: namespace,
        }, listener);
    }

    public async sendMessage(
        namespace: string,
        message: string | Record<string, unknown>,
    ) {
        debug("sendMessage", namespace, message);
        return this.io.rpc.sessionSendMessage({
            namespace,
            stringMessage: typeof message === "string"
                ? message
                : JSON.stringify(message),
        });
    }

    // eslint-disable-next-line class-methods-use-this
    public async setMute(isMute: boolean) {
        debug("setMute", isMute);
        // TODO
    }

    // eslint-disable-next-line class-methods-use-this
    public async setVolume(volume: number) {
        debug("setVolume", volume);
        // TODO
    }
}
