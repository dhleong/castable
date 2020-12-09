import { log } from "./log";
import { proxy } from "./proxy";

import { CastStub } from "./cast";
import { CastContext } from "./cast.framework/cast-context";

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
import { CastError } from "./chrome.cast/error";
import { Listener } from "./chrome.cast/generic-types";
import { Session } from "./chrome.cast/session";
import {
    callbackAsyncFunction,
    optionalCallbackAsyncFunction,
} from "./chrome.cast/util";

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
        onError: Listener<CastError>,
    ) {
        log("INITIALIZE", apiConfig);
        this.config = apiConfig;

        setTimeout(() => {
            log("notifying API success:", apiConfig);
            onSuccess();

            // FIXME: get this state from the extension
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

    public readonly requestSession = optionalCallbackAsyncFunction(
        async (sessionRequest?: SessionRequest) => {
            const request = sessionRequest ?? this.config?.sessionRequest;
            if (!request) {
                throw new Error("No sessionRequest available");
            }

            log("chrome.cast.requestSession", sessionRequest, "->", request);
            const cast = this.cast.framework.CastContext.getInstance();
            return this.requestSessionImpl(cast, request);
        },
    );

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

    public setReceiverDisplayStatus = callbackAsyncFunction(
        async (receiver: Receiver) => {
            // TODO
            log("chrome.cast.setReceiverDisplayStatus", receiver);
        },
    );

    private async requestSessionImpl(
        cast: CastContext,
        request: SessionRequest,
    ) {
        cast.setOptions({
            receiverApplicationId: request.appId,
        });
        const errorCode = await cast.requestSession();
        if (errorCode) {
            throw new Error(`Session error: ${errorCode}`);
        }

        const s = cast.getCurrentSession();

        return new Session(
            s!.getSessionId(),
            request.appId,
            s!.getApplicationMetadata().name,
            s!.getApplicationMetadata().images,
            s!.getCastDevice(),
        );
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
