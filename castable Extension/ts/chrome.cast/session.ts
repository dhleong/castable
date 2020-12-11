import _debug from "debug";
import { EventEmitter } from "events";

import { SessionStatus } from "./enums";
import { Image } from "./image";
import { Receiver } from "./receiver";
import { Listener } from "./generic-types";
import { IMessageListener } from "./listeners";
import { LoadRequest, MediaStub } from "./media";
import { callbackAsyncFunction } from "./util";

import { CastContext } from "../cast.framework/cast-context";
import { CastSession } from "../cast.framework/cast-session";
import { CastContextEventType, SessionState } from "../cast.framework/enums";

const MEDIA_EVENT = ".media";
const UPDATE_EVENT = ".update";

const debug = _debug("castable:chrome.cast.Session");

export class Session {
    private readonly events = new EventEmitter();

    private sessionStateListener = () => {
        this.events.emit(UPDATE_EVENT, this.status === SessionStatus.CONNECTED);
    };

    constructor(
        public readonly sessionId: string,
        public readonly appId: string,
        public readonly displayName: string,
        public readonly appImages: Image[],
        public readonly receiver: Receiver,
        private readonly castContext: CastContext,
        private readonly castSession: CastSession,
    ) {}

    public get status() {
        switch (this.castSession.getSessionState()) {
            case SessionState.NO_SESSION:
            case SessionState.SESSION_START_FAILED:
                return SessionStatus.STOPPED;

            case SessionState.SESSION_RESUMED:
            case SessionState.SESSION_STARTING:
            case SessionState.SESSION_STARTED:
                return SessionStatus.CONNECTED;

            case SessionState.SESSION_ENDING:
            case SessionState.SESSION_ENDED:
                return SessionStatus.DISCONNECTED;
        }
    }

    public addMediaListener(listener: Listener<MediaStub>) {
        debug("addMediaListener");
        this.events.on(MEDIA_EVENT, listener);
    }

    public addMessageListener(
        namespace: string,
        listener: IMessageListener,
    ) {
        debug("addMessageListener", namespace);
        this.castSession.addMessageListener(namespace, listener);
    }

    /**
     * Notified when `statusText`, `namespaces`, `status`, or
     * `receiver.volume` have changed
     */
    public addUpdateListener(listener: Listener<boolean>) {
        debug("addUpdateListener");
        const oldCount = this.events.listenerCount(UPDATE_EVENT);
        this.events.on(UPDATE_EVENT, listener);

        if (!oldCount) {
            this.castContext.addEventListener(
                CastContextEventType.SESSION_STATE_CHANGED,
                this.sessionStateListener,
            );
        }
    }

    public readonly leave = callbackAsyncFunction(
        async () => {
            debug("leave");
            await this.castSession.endSession(false);
        },
    );

    public readonly loadMedia = callbackAsyncFunction(
        async (loadRequest: LoadRequest) => {
            debug("loadMedia:", loadRequest);
            return this.castSession.loadMedia(loadRequest);
        },
    );

    public readonly queueLoad = callbackAsyncFunction(
        async (queue: any) => {
            // TODO
            debug("queueLoad:", queue);
            throw new Error("Unsupported: queueLoad");
        },
    );

    public removeMediaListener(listener: Listener<MediaStub>) {
        this.events.off(MEDIA_EVENT, listener);
    }

    public removeMessageListener(
        namespace: string,
        listener: IMessageListener,
    ) {
        debug("removeMessageListener", namespace);
        this.castSession.removeMessageListener(namespace, listener);
    }

    public removeUpdateListener(listener: Listener<boolean>) {
        this.events.off(UPDATE_EVENT, listener);

        if (!this.events.listenerCount(UPDATE_EVENT)) {
            this.castContext.removeEventListener(
                CastContextEventType.SESSION_STATE_CHANGED,
                this.sessionStateListener,
            );
        }
    }

    public readonly sendMessage = callbackAsyncFunction(
        async (
            namespace: string,
            message: Record<string, unknown> | string,
        ) => {
            debug("sendMessage:", namespace, message);
            return this.castSession.sendMessage(namespace, message);
        },
    );

    public readonly setReceiverMuted = callbackAsyncFunction(
        async (
            muted: boolean,
        ) => {
            debug("setReceiverMuted:", muted);
            await this.castSession.setMute(muted);
        },
    );

    public readonly setReceiverVolumeLevel = callbackAsyncFunction(
        async (
            newLevel: number,
        ) => {
            debug("setReceiverVolumeLevel:", newLevel);
            await this.castSession.setVolume(newLevel);
        },
    );

    public readonly stop = callbackAsyncFunction(
        async () => {
            debug("stop");
            await this.castSession.endSession(true);
        },
    );
}
