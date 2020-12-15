import _debug from "debug";

import { EventEmitter } from "events";

import { ClientIO } from "../client-io";
import { ErrorCode } from "../chrome.cast/enums";
import { Listener } from "../chrome.cast/generic-types";
import { Receiver } from "../chrome.cast/receiver";

import { CastSession, SessionStateEventData } from "./cast-session";
import { CastState, SessionState, CastContextEventType } from "./enums";
import { CastStateEventData } from "./events";
import { proxy } from "../proxy";

const debug = _debug("castable:CastContext");

export class CastContext {
    private readonly events = new EventEmitter();

    private options: any | undefined;
    private castState = CastState.NOT_CONNECTED;
    private sessionState = SessionState.NO_SESSION;
    private currentSession: CastSession | null = null;

    constructor(
        private readonly io: ClientIO,
    ) {}

    public addEventListener(
        event: CastContextEventType.SESSION_STATE_CHANGED,
        handler: Listener<SessionStateEventData>,
    ): void;
    public addEventListener(
        event: CastContextEventType.CAST_STATE_CHANGED,
        handler: Listener<CastStateEventData>,
    ): void;
    public addEventListener(event: CastContextEventType, handler: any) {
        debug("addEventListener", event, handler);
        this.events.on(event, handler);
    }

    public async endCurrentSession(stopCasting: boolean) {
        debug("endCurrentSession", stopCasting);
        this.setCastState(CastState.NOT_CONNECTED);
        this.setSessionState(SessionState.SESSION_ENDING);
        this.currentSession = null;

        try {
            await this.io.rpc.endCurrentSession({ stopCasting });
        } catch (e) {
            debug("endCurrentSession ERROR: ", e);
        } finally {
            this.setCastState(CastState.NOT_CONNECTED);
            this.setSessionState(SessionState.SESSION_ENDED);
            this.setSessionState(SessionState.NO_SESSION);
        }
    }

    public getCastState() {
        debug("getCastState <- ", this.castState);
        return this.castState;
    }

    public getCurrentSession() {
        debug("getCurrentSession", this.currentSession);
        return this.currentSession;
    }

    public getSessionState() {
        debug("getSessionState <- ", this.sessionState);
        return this.sessionState;
    }

    public removeEventListener(event: CastContextEventType, handler: any) {
        debug("removeEventListener", event, handler);
        this.events.off(event, handler);
    }

    public async requestSession() {
        debug("requestSession");
        try {
            this.setCastState(CastState.CONNECTING);
            this.setSessionState(SessionState.SESSION_STARTING);

            const result = await this.io.rpc.requestSession(this.options);
            debug("requestSession -> ", result);

            this.currentSession = proxy(new CastSession(
                this.io,
                this.options,
                proxy(new Receiver(
                    result.device.id,
                    result.device.name,
                    result.device.capabilities,
                ), `chrome.cast.Receiver(${result.device.name})`),
                result.sessionId,
            ), `cast.framework.CastSession(${result.sessionId})`);

            this.setCastState(CastState.CONNECTED);
            this.setSessionState(SessionState.SESSION_STARTED);

            return null;
        } catch (e) {
            this.setSessionState(SessionState.SESSION_START_FAILED);
            this.setSessionState(SessionState.NO_SESSION);

            debug("requestSession ERROR: ", e);
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
        debug("setLaunchCredentialsData", data);
    }

    public setOptions(opts: any) {
        debug("setOptions", opts);
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
        debug("emit (to", receivers, ")", event, ...args);
        this.events.emit(event, ...args);
    }
}
