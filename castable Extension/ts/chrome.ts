import { log } from "./log";
import { proxy } from "./proxy";

import { ApiConfig } from "./chrome.cast/api-config";
import { DialRequest } from "./chrome.cast/dial-request";
import {
    AutoJoinPolicy,
    DefaultActionPolicy,
    ReceiverType,
    ReceiverAvailability,
} from "./chrome.cast/enums";
import { MediaStub } from "./chrome.cast/media";
import { Receiver } from "./chrome.cast/receiver";
import { SessionRequest } from "./chrome.cast/session-request";
import { TimeoutStub } from "./chrome.cast/timeout";
import { CastStub } from "./cast";

class CastError extends Error {
    constructor(
        public readonly code: string,
        public readonly opt_description?: string,
        public readonly opt_details?: any,
    ) {
        super(`chrome.cast.Error: ${code}`);
    }
}

class ChromeCastStub {
    public readonly VERSION = [1, 2];

    public readonly ApiConfig = ApiConfig;
    public readonly AutoJoinPolicy = AutoJoinPolicy;
    public readonly DialRequest = DialRequest;
    public readonly DefaultActionPolicy = DefaultActionPolicy;
    public readonly SessionRequest = SessionRequest;
    public readonly Receiver = Receiver;
    public readonly ReceiverAvailability = ReceiverAvailability;
    public readonly ReceiverType = ReceiverType;

    public readonly media = proxy(new MediaStub(), "chrome.cast.media");
    public readonly timeout = proxy(new TimeoutStub(), "chrome.cast.timeout");

    public readonly isAvailable = true;

    private config: ApiConfig | undefined;

    constructor(
        private readonly cast: CastStub,
    ) {}

    public initialize(
        apiConfig: ApiConfig,
        onSuccess: () => void,
        onError: (e: CastError) => void,
    ) {
        log("INITIALIZE", apiConfig);
        this.config = apiConfig;

        setTimeout(() => {
            log("notifying API success:", apiConfig);
            onSuccess();

            // FIXME: get this from the extension
            apiConfig.receiverListener(ReceiverAvailability.AVAILABLE);
        });
    }

    public addReceiverActionListener(listener: any) {
        // TODO forward to cast.framework?
        log("chrome.cast.addReceiverActionListener:", listener);
    }

    public logMessage(message: any) {
        log("chrome.cast.logMessage:", message);
    }

    public precache(data: any) {
        log("chrome.cast.precache:", data);
    }

    public removeReceiverActionListener(listener: any) {
        // TODO forward to cast.framework?
        log("chrome.cast.removeReceiverActionListener:", listener);
    }

    public requestSession(
        successCallback: any,
        errorCallback: any,
        sessionRequest?: SessionRequest,
    ) {
        const request = sessionRequest ?? this.config?.sessionRequest;
        if (!request) {
            throw new Error("No sessionRequest available");
        }

        log("chrome.cast.requestSession", sessionRequest, "->", request);
        const cast = this.cast.framework.CastContext.getInstance();

        (async () => {
            cast.setOptions({
                receiverApplicationId: request.appId,
            });
            const errorCode = await cast.requestSession();
            if (errorCode) {
                throw new Error(`Session error: ${errorCode}`);
            }

            // TODO ?

        })().then(result => {
            log("requestSession result: ", result);
            // TODO forward to successCallback
        }).catch(e => {
            log("requestSession error: ", e);
            errorCallback(e);
        });
    }

    public requestSessionById(id: string) {
        log("chrome.cast.requestSessionById", id);
    }

    public setCustomReceivers(
        receivers: any[],
        successCallback: any,
        errorCallback: any,
    ) {
        log("chrome.cast.setCustomReceivers", receivers);
    }

    public setPageContext(win: any) {
        log("chrome.cast.setPageContext", win);
    }

    public setReceiverDisplayStatus(
        receiver: Receiver,
        successCallback: any,
        errorCallback: any,
    ) {
        log("chrome.cast.setReceiverDisplayStatus", receiver);
        // TODO
    }

}

export class ChromeStub {
    public readonly cast: ChromeCastStub

    constructor(
        cast: CastStub,
    ) {
        this.cast = proxy(new ChromeCastStub(cast), "chrome.cast");
    }
}

export type GCastApiAvailabilityHandler =
    ((isAvailable: boolean) => void)
    | null
    | undefined;

export class ChromeController {
    public readonly chrome: ChromeStub;

    constructor(cast: CastStub) {
        this.chrome = new ChromeStub(cast);
    }

    private receivedApiAvailableHandler: GCastApiAvailabilityHandler;

    public onGCastApiAvailable = (isAvailable: Boolean, err: any) => {
        log("received GCast API Availability: ", isAvailable, err);
    }

    public setGCastApiAvailableHandler(callback: GCastApiAvailabilityHandler) {
        this.receivedApiAvailableHandler = callback;
    }

    public notifyGCastAvailable(isAvailable: boolean) {
        if (this.receivedApiAvailableHandler) {
            this.receivedApiAvailableHandler(isAvailable);
        }
    }
}
