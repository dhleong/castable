import { EventEmitter } from "events";

import { ActiveInputState, SessionState } from "./enums";

import { log } from "../log";
import { ClientIO } from "../client-io";
import { EventSpecIdentifier } from "../io/events";

import { ErrorCode } from "../chrome.cast/enums";
import { LoadRequest } from "../chrome.cast/media";
import { Receiver } from "../chrome.cast/receiver";
import { IMessageListener } from "../chrome.cast/listeners";

export class CastSession {
    private readonly events = new EventEmitter();

    private activeInputState = ActiveInputState.ACTIVE_INPUT_STATE_UNKNOWN;

    constructor(
        public readonly io: ClientIO,
        public readonly options: any,
        public readonly device: Receiver,
        private readonly sessionId: string,
    ) {}

    public addEventListener(event: string, handler: any) {
        log("CastSession.addEventListener", event, handler);
        this.events.on(event, handler);
    }

    public addMessageListener(namespace: string, listener: IMessageListener) {
        log("CastSession.addMessageListener", namespace, listener);
        this.io.events.on({
            id: EventSpecIdentifier.sessionMessage,
            param: namespace,
        }, listener);
    }

    public async endSession(stopCasting: boolean) {
        log("CastSession.endSession", stopCasting);
        try {
            await this.io.rpc.endCurrentSession({ stopCasting });

            // this should be the only event id we listen to here:
            await this.io.events.clearMatching(
                event => event.id === EventSpecIdentifier.sessionMessage,
            );
        } catch (e) {
            log("CastSession.endSession ERROR: ", e);
        }
    }

    public getActiveInputState() {
        log("CastSession.getActiveInputState");
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
        log("CastSession.getApplicationStatus");
        return null; // ?
    }

    public getCastDevice() {
        log("CastSession.getCastDevice", this.device);
        return this.device;
    }

    // eslint-disable-next-line class-methods-use-this
    public getMediaSession() {
        log("CastSession.getMediaSession");
        // TODO
        return null;
    }

    public getSessionId() {
        log("CastSession.getSessionId");
        return this.sessionId;
    }

    // eslint-disable-next-line class-methods-use-this
    public getSessionObj() {
        log("CastSession.getSessionObj");
        return {}; // chrome.cast.Session
    }

    // eslint-disable-next-line class-methods-use-this
    public getSessionState() {
        log("CastSession.getSessionState");
        return SessionState.SESSION_STARTED;
    }

    // eslint-disable-next-line class-methods-use-this
    public getVolume() {
        log("CastSession.getVolume");
        // TODO
        return 1;
    }

    // eslint-disable-next-line class-methods-use-this
    public isMute() {
        log("CastSession.isMute");
        // TODO
        return null;
    }

    public async loadMedia(loadRequest: LoadRequest) {
        log("CastSession.loadMedia", loadRequest);
        try {
            await this.io.rpc.loadMedia(loadRequest);
            log("CastSession.loadMedia: success!");
            return null;
        } catch (e) {
            log("CastSession.loadMedia: ERROR:", e);
            return ErrorCode.LOAD_MEDIA_FAILED;
        }
    }

    public removeEventListener(event: string, handler: any) {
        log("CastSession.removeEventListener", event, handler);
        this.events.off(event, handler);
    }

    public removeMessageListener(namespace: string, listener: IMessageListener) {
        log("CastSession.removeMessageListener", namespace, listener);
        this.io.events.off({
            id: EventSpecIdentifier.sessionMessage,
            param: namespace,
        }, listener);
    }

    public async sendMessage(
        namespace: string,
        message: string | Record<string,
        unknown>,
    ) {
        log("CastSession.sendMessage", namespace, message);
        return this.io.rpc.sessionSendMessage({
            namespace,
            stringMessage: typeof message === "string"
                ? message
                : JSON.stringify(message),
        });
    }

    // eslint-disable-next-line class-methods-use-this
    public async setMute(isMute: boolean) {
        log("CastSession.setMute", isMute);
        // TODO
    }

    // eslint-disable-next-line class-methods-use-this
    public async setVolume(volume: number) {
        log("CastSession.setVolume", volume);
        // TODO
    }
}
