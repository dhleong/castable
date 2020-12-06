import { EventEmitter } from "events";

import { ActiveInputState, SessionState } from "./enums";

import { log } from "../log";
import { ClientIO } from "../client-io";

import { LoadRequest } from "../chrome.cast/media";

export class CastSession {
    private readonly events = new EventEmitter();
    private readonly messages = new EventEmitter();

    constructor(
        readonly io: ClientIO,
        readonly options: any,
        private readonly sessionId: String,
    ) {}

    public addEventListener(event: string, handler: any) {
        log("CastSession.addEventListener", event, handler);
        this.events.on(event, handler);
    }

    public addMessageListener(event: string, handler: any) {
        log("CastSession.addMessageListener", event, handler);
        this.messages.on(event, handler);
    }

    public async endSession(stopCasting: boolean) {
        log("CastSession.endSession", stopCasting);
        // TODO events ?
        try {
            await this.io.endCurrentSession({ stopCasting });
        } catch (e) {
            log("CastSession.endSession ERROR: ", e);
        }
    }

    public getActiveInputState() {
        log("CastSession.getActiveInputState");
        // ?
        return ActiveInputState.ACTIVE_INPUT_STATE_UNKNOWN;
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

    public getApplicationStatus() {
        log("CastSession.getApplicationStatus");
        return null; // ?
    }

    public getCastDevice() {
        log("CastSession.getCastDevice");
        return {
            // TODO chrome.cast.Receiver instance, from sessionRequest
        };
    }

    public getMediaSession() {
        log("CastSession.getMediaSession");
        // TODO
        return null;
    }

    public getSessionId() {
        log("CastSession.getSessionId");
        return this.sessionId;
    }

    public getSessionObj() {
        log("CastSession.getSessionObj");
        return {}; // chrome.cast.Session
    }

    public getSessionState() {
        log("CastSession.getSessionState");
        return SessionState.SESSION_STARTED;
    }

    public getVolume() {
        log("CastSession.getVolume");
        // TODO
        return 1;
    }

    public isMute() {
        log("CastSession.isMute");
        // TODO
        return null;
    }

    public async loadMedia(loadRequest: LoadRequest) {
        log("CastSession.loadMedia", loadRequest);
        // TODO
        return null;
    }

    public removeEventListener(event: string, handler: any) {
        log("CastSession.removeEventListener", event, handler);
        this.events.off(event, handler);
    }

    public removeMessageListener(event: string, handler: any) {
        log("CastSession.removeMessageListener", event, handler);
        this.messages.off(event, handler);
    }

    public async sendMessage(namespace: string, data: any) {
        log("CastSession.sendMessage", namespace, data);
        // TODO
    }

    public async setMute(isMute: boolean) {
        log("CastSession.setMute", isMute);
        // TODO
    }

    public async setVolume(volume: number) {
        log("CastSession.setVolume", volume);
        // TODO
    }
}
