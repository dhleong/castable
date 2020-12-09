import { EventEmitter } from "events";

import { log } from "../log";

import { Image } from "./image";
import { Receiver } from "./receiver";
import { Listener } from "./generic-types";
import { MediaStub } from "./media";
import { callbackAsyncFunction } from "./util";

const MEDIA_EVENT = ".media";
const UPDATE_EVENT = ".update";

export interface IMessageListener {
    (namespace: string, message: string): void;
}

export class Session {

    private readonly events = new EventEmitter();

    constructor(
        public readonly sessionId: string,
        public readonly appId: string,
        public readonly displayName: string,
        public readonly appImages: Image[],
        public readonly receiver: Receiver,
    ) {}

    public addMediaListener(listener: Listener<MediaStub>) {
        this.events.on(MEDIA_EVENT, listener);
    }

    public addMessageListener(
        namespace: string,
        listener: IMessageListener,
    ) {
        this.events.on(namespace, listener);
    }

    /**
     * Notified when `statusText`, `namespaces`, `status`, or
     * `receiver.volume` have changed
     */
    public addUpdateListener(listener: Listener<boolean>) {
        this.events.on(UPDATE_EVENT, listener);
    }

    public readonly leave = callbackAsyncFunction(
        async () => {
            // TODO
            log("chrome.cast.Session.leave");
        },
    );

    public readonly loadMedia = callbackAsyncFunction(
        async (media: MediaStub) => {
            // TODO
            log("chrome.cast.Session.loadMedia:", media);
        },
    );

    public readonly queueLoad = callbackAsyncFunction(
        async (queue: any) => {
            // TODO
            log("chrome.cast.Session.queueLoad:", queue);
        },
    );

    public removeMediaListener(listener: Listener<MediaStub>) {
        this.events.off(MEDIA_EVENT, listener);
    }

    public removeMessageListener(
        namespace: string,
        listener: IMessageListener,
    ) {
        this.events.off(namespace, listener);
    }

    public removeUpdateListener(listener: Listener<boolean>) {
        this.events.off(UPDATE_EVENT, listener);
    }

    public readonly sendMessage = callbackAsyncFunction(
        async (
            namespace: string,
            message: object | string,
        ) => {
            // TODO
            throw "SESSION_ERROR";
        },
    );

    public readonly setReceiverMuted = callbackAsyncFunction(
        async (
            muted: boolean,
        ) => {
            // TODO
        },
    );

    public readonly setReceiverVolumeLevel = callbackAsyncFunction(
        async (
            newLevel: boolean,
        ) => {
            // TODO
        },
    );

    public readonly stop = callbackAsyncFunction(
        async () => {
            // TODO
        },
    );
}
