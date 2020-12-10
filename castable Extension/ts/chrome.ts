import { log } from "./log";
import { proxy } from "./proxy";

import { CastStub } from "./cast";
import { CastContext } from "./cast.framework/cast-context";

import { ApiConfig } from "./chrome.cast/api-config";
import { DialRequest } from "./chrome.cast/dial-request";
import {
    AutoJoinPolicy,
    DefaultActionPolicy,
    ErrorCode,
    ReceiverType,
    ReceiverAvailability,
} from "./chrome.cast/enums";
import { MediaStub } from "./chrome.cast/media";
import { Receiver } from "./chrome.cast/receiver";
import { SessionRequest } from "./chrome.cast/session-request";
import { TimeoutStub } from "./chrome.cast/timeout";
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
    public readonly ErrorCode = ErrorCode;
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

    public initialize = callbackAsyncFunction(
        async (apiConfig: ApiConfig) => {
            log("INITIALIZE", apiConfig);
            this.config = apiConfig;

            // FIXME: get this state from the extension
            apiConfig.receiverListener(ReceiverAvailability.AVAILABLE);
        },
    );

    // eslint-disable-next-line class-methods-use-this
    public addReceiverActionListener(listener: any) {
        // TODO forward to cast.framework?
        log("chrome.cast.addReceiverActionListener:", listener);
    }

    // eslint-disable-next-line class-methods-use-this
    public logMessage(message: any) {
        log("chrome.cast.logMessage:", message);
    }

    // eslint-disable-next-line class-methods-use-this
    public precache(data: any) {
        log("chrome.cast.precache:", data);
    }

    // eslint-disable-next-line class-methods-use-this
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
            const session = await ChromeCastStub.requestSessionImpl(
                cast, request,
            );

            log("chrome.cast.requestSession success:", session);

            const listener = this.config?.sessionListener;
            if (listener) listener(session);

            return session;
        },
    );

    // eslint-disable-next-line class-methods-use-this
    public requestSessionById(id: string) {
        log("chrome.cast.requestSessionById", id);
    }

    // eslint-disable-next-line class-methods-use-this
    public setCustomReceivers(
        receivers: any[],
        successCallback: any,
        errorCallback: any,
    ) {
        log("chrome.cast.setCustomReceivers", receivers, successCallback, errorCallback);
    }

    // eslint-disable-next-line class-methods-use-this
    public setPageContext(win: any) {
        log("chrome.cast.setPageContext", win);
    }

    public setReceiverDisplayStatus = callbackAsyncFunction(
        async (receiver: Receiver) => {
            // TODO
            log("chrome.cast.setReceiverDisplayStatus", receiver);
        },
    );

    // eslint-disable-next-line class-methods-use-this
    public unescape(s: string) {
        log("chrome.cast.unescape", s);
        // ?!
        return unescape(s);
    }

    private static async requestSessionImpl(
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
        if (!s) throw new Error("No error, but no session created");

        const appMeta = s.getApplicationMetadata();

        return proxy(new Session(
            s.getSessionId(),
            request.appId,
            appMeta.name,
            appMeta.images,
            s.getCastDevice(),
            s,
        ), `Session(${appMeta.name}#${s.getSessionId()})`);
    }
}

export class ChromeStub {
    public readonly cast: ChromeCastStub;

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

    public onGCastApiAvailable = (isAvailable: boolean, err: any) => {
        log("received GCast API Availability: ", isAvailable, err);
    };

    public setGCastApiAvailableHandler(callback: GCastApiAvailabilityHandler) {
        this.receivedApiAvailableHandler = callback;
    }

    public notifyGCastAvailable(isAvailable: boolean) {
        if (this.receivedApiAvailableHandler) {
            this.receivedApiAvailableHandler(isAvailable);
        }
    }
}
