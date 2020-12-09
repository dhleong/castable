import { EventEmitter } from "events";

import { ClientIO } from "../client-io";
import { log } from "../log";
import { ErrorCode } from "../chrome.cast/enums";
import { Receiver } from "../chrome.cast/receiver";

import { CastState, SessionState, CastContextEventType } from "./enums";
import { CastSession } from "./cast-session";

export class CastContext {
    private readonly events = new EventEmitter();

    private options: any | undefined;
    private castState = CastState.NOT_CONNECTED;
    private sessionState = SessionState.NO_SESSION;
    private currentSession: CastSession | null = null;

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
        this.currentSession = null;

        try {
            await this.io.rpc.endCurrentSession({ stopCasting });
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
        log("CastContext.getCurrentSession", this.currentSession);
        return this.currentSession;
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

            const result = await this.io.rpc.requestSession(this.options);
            log("requestSession -> ", result);

            this.currentSession = new CastSession(
                this.io,
                this.options,
                new Receiver(
                    result.device.id,
                    result.device.name,
                ),
                result.sessionId,
            );

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

    // eslint-disable-next-line class-methods-use-this
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
            this.emit(CastContextEventType.CAST_STATE_CHANGED, {
                castState: newState,
            });
        }
    }

    private setSessionState(
        newState: SessionState,
        errorCode?: ErrorCode,
    ) {
        if (this.sessionState !== newState) {
            this.sessionState = newState;
            this.emit(CastContextEventType.SESSION_STATE_CHANGED, {
                session: this.getCurrentSession(),
                sessionState: newState,
                errorCode,
            });
        }
    }

    private emit(event: string, ...args: any[]) {
        const receivers = this.events.listenerCount(event);
        log("CastContext.emit (to", receivers, ")", event, ...args);
        this.events.emit(event, ...args);
    }
}
