import { EventEmitter } from "events";

import { log } from "../log";

import { Image } from "./image";
import { Receiver } from "./receiver";
import { Listener } from "./generic-types";
import { MediaStub } from "./media";
import { callbackAsyncFunction } from "./util";
import { ClientIO } from "../client-io";

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
        private readonly io: ClientIO,
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
        this.events.on(namespace, listener);
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
            log("chrome.cast.Session.sendMessage:", namespace, message);
            await this.io.sessionSendMessage({
                namespace,
                stringMessage: typeof message === "string"
                    ? message
                    : JSON.stringify(message),
            });
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
