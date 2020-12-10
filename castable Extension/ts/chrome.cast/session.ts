import { EventEmitter } from "events";

import { log } from "../log";

import { Image } from "./image";
import { Receiver } from "./receiver";
import { Listener } from "./generic-types";
import { IMessageListener } from "./listeners";
import { LoadRequest, MediaStub } from "./media";
import { callbackAsyncFunction } from "./util";

import { CastSession } from "../cast.framework/cast-session";

const MEDIA_EVENT = ".media";
const UPDATE_EVENT = ".update";

export class Session {
    private readonly events = new EventEmitter();

    constructor(
        public readonly sessionId: string,
        public readonly appId: string,
        public readonly displayName: string,
        public readonly appImages: Image[],
        public readonly receiver: Receiver,
        private readonly castSession: CastSession,
    ) {}

    public addMediaListener(listener: Listener<MediaStub>) {
        log("chrome.cast.Session.addMediaListener");
        this.events.on(MEDIA_EVENT, listener);
    }

    public addMessageListener(
        namespace: string,
        listener: IMessageListener,
    ) {
        log("chrome.cast.Session.addMessageListener", namespace);
        this.castSession.addMessageListener(namespace, listener);
    }

    /**
     * Notified when `statusText`, `namespaces`, `status`, or
     * `receiver.volume` have changed
     */
    public addUpdateListener(listener: Listener<boolean>) {
        log("chrome.cast.Session.addUpdateListener");
        this.events.on(UPDATE_EVENT, listener);
    }

    public readonly leave = callbackAsyncFunction(
        async () => {
            log("chrome.cast.Session.leave");
            await this.castSession.endSession(false);
        },
    );

    public readonly loadMedia = callbackAsyncFunction(
        async (loadRequest: LoadRequest) => {
            log("chrome.cast.Session.loadMedia:", loadRequest);
            return this.castSession.loadMedia(loadRequest);
        },
    );

    public readonly queueLoad = callbackAsyncFunction(
        async (queue: any) => {
            // TODO
            log("chrome.cast.Session.queueLoad:", queue);
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
        log("chrome.cast.Session.removeMessageListener", namespace);
        this.castSession.removeMessageListener(namespace, listener);
    }

    public removeUpdateListener(listener: Listener<boolean>) {
        this.events.off(UPDATE_EVENT, listener);
    }

    public readonly sendMessage = callbackAsyncFunction(
        async (
            namespace: string,
            message: Record<string, unknown> | string,
        ) => {
            log("chrome.cast.Session.sendMessage:", namespace, message);
            return this.castSession.sendMessage(namespace, message);
        },
    );

    public readonly setReceiverMuted = callbackAsyncFunction(
        async (
            muted: boolean,
        ) => {
            log("chrome.cast.Session.setReceiverMuted:", muted);
            await this.castSession.setMute(muted);
        },
    );

    public readonly setReceiverVolumeLevel = callbackAsyncFunction(
        async (
            newLevel: number,
        ) => {
            log("chrome.cast.Session.setReceiverVolumeLevel:", newLevel);
            await this.castSession.setVolume(newLevel);
        },
    );

    public readonly stop = callbackAsyncFunction(
        async () => {
            log("chrome.cast.Session.stop");
            await this.castSession.endSession(true);
        },
    );
}
