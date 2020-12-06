import { EventEmitter } from "events";

import { log } from "../log";
import { ErrorCode } from "../chrome.cast/enums";
import { ClientIO } from "../client-io";

import { CastState, SessionState, CastContextEventType } from "./enums";

export class CastContext {
    private readonly events = new EventEmitter();

    private options: any | undefined;
    private castState = CastState.NOT_CONNECTED;
    private sessionState = SessionState.NO_SESSION;

    constructor(
        private readonly io: ClientIO,
    ) {}

    public addEventListener(event: string, handler: any) {
        log("CastContext.addEventListener", event, handler);
        this.events.on(event, handler);
    }

    public async endCurrentSession(stopCasting: boolean) {
        log("CastContext.endCurrentSession", stopCasting);
        this.setCastState(CastState.NOT_CONNECTED);
        this.setSessionState(SessionState.SESSION_ENDING);

        try {
            await this.io.endCurrentSession({ stopCasting });
        } catch (e) {
            log("CastContext.endCurrentSession ERROR: ", e);
        } finally {
            this.setCastState(CastState.NOT_CONNECTED);
            this.setSessionState(SessionState.SESSION_ENDED);
            this.setSessionState(SessionState.NO_SESSION);
        }
    }

    public getCastState() {
        log("CastContext.getCastState <- ", this.castState);
        return this.castState;
    }

    public getCurrentSession() {
        log("CastContext.getCurrentSession");
        // TODO
        return null;
    }

    public getSessionState() {
        log("CastContext.getSessionState <- ", this.sessionState);
        return this.sessionState;
    }

    public removeEventListener(event: string, handler: any) {
        log("CastContext.removeEventListener", event, handler);
        this.events.off(event, handler);
    }

    public async requestSession() {
        log("CastContext.requestSession");
        try {
            this.setCastState(CastState.CONNECTING);
            this.setSessionState(SessionState.SESSION_STARTING);

            const result = await this.io.requestSession(this.options);
            log("requestSession -> ", result);

            this.setCastState(CastState.CONNECTED);
            this.setSessionState(SessionState.SESSION_STARTED);

            return null;
        } catch (e) {
            this.setSessionState(SessionState.SESSION_START_FAILED);
            this.setSessionState(SessionState.NO_SESSION);

            log("requestSession ERROR: ", e);
            if (e.id === "cancelled") {
                this.setCastState(CastState.NO_DEVICES_AVAILABLE);
                return ErrorCode.CANCEL;
            }

            this.setCastState(CastState.NOT_CONNECTED);
            return ErrorCode.SESSION_ERROR;
        }
    }

    public setLaunchCredentialsData(data: any) {
        log("CastContext.setLaunchCredentialsData", data);
    }

    public setOptions(opts: any) {
        log("CastContext.setOptions", opts);
        this.options = opts;
    }

    private setCastState(newState: CastState) {
        if (this.castState !== newState) {
            this.castState = newState;
            this.emit(CastContextEventType.CAST_STATE_CHANGED, newState);
        }
    }

    private setSessionState(newState: SessionState) {
        if (this.sessionState !== newState) {
            this.sessionState = newState;
            this.emit(CastContextEventType.SESSION_STATE_CHANGED, newState);
        }
    }

    private emit(event: string, ...args: any[]) {
        const receivers = this.events.listenerCount(event);
        log("CastContext.emit (to", receivers, ")", event, ...args);
        this.events.emit(event, ...args);
    }
}
