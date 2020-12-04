import { log } from "../log";
import { ErrorCode } from "../chrome.cast/enums";

import { CastState, SessionState } from "./enums";

export class CastContext {
    public static getInstance() {
        // TODO
        return new CastContext();
    }

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
        return ErrorCode[ErrorCode.CANCEL];
    }

    public setLaunchCredentialsData(data: any) {
        log("CastContext.setLaunchCredentialsData", data);
    }

    public setOptions(opts: any) {
        log("CastContext.setOptions", opts);
    }
}
