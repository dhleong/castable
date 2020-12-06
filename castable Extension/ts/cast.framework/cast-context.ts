import { log } from "../log";
import { ErrorCode } from "../chrome.cast/enums";
import { ClientIO } from "../client-io";

import { CastState, SessionState } from "./enums";

export class CastContext {
    private options: any | undefined;

    constructor(
        private readonly io: ClientIO,
    ) {}

    public addEventListener(event: string, handler: any) {
        log("CastContext.addEventListener", event, handler);
    }

    public getCastState() {
        log("CastContext.getCastState");
        // TODO
        return CastState[CastState.NO_DEVICES_AVAILABLE];
    }

    public getCurrentSession() {
        log("CastContext.getCurrentSession");
        // TODO
        return null;
    }

    public getSessionState() {
        log("CastContext.getSessionState");
        // TODO
        return SessionState[SessionState.NO_SESSION];
    }

    public removeEventListener(event: string, handler: any) {
        log("CastContext.removeEventListener", event, handler);
    }

    public async requestSession() {
        log("CastContext.requestSession");
        try {
            const result = await this.io.requestSession(this.options);
            log("requestSession -> ", result);

            return null;
        } catch (e) {
            log("requestSession ERROR: ", e);
            if (e.id === "cancelled") {
                return ErrorCode[ErrorCode.CANCEL];
            }

            return ErrorCode[ErrorCode.SESSION_ERROR];
        }
    }

    public setLaunchCredentialsData(data: any) {
        log("CastContext.setLaunchCredentialsData", data);
    }

    public setOptions(opts: any) {
        log("CastContext.setOptions", opts);
        this.options = opts;
    }
}
