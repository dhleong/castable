import _debug from "debug";

import { proxy } from "./proxy";

import { CastStub } from "./cast";
import { CastContext } from "./cast.framework/cast-context";
import { CastContextEventType, SessionState } from "./cast.framework/enums";

import { ApiConfig } from "./chrome.cast/api-config";
import { DialRequest } from "./chrome.cast/dial-request";
import {
    AutoJoinPolicy,
    DefaultActionPolicy,
    ErrorCode,
    ReceiverType,
    ReceiverAvailability,
    ReceiverAction,
    SessionStatus,
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
import { IReceiverActionListener } from "./chrome.cast/listeners";
import { CastError } from "./chrome.cast/error";
import { Volume } from "./chrome.cast/volume";

const debug = _debug("castable:chrome.cast");

class ChromeCastStub {
    public readonly VERSION = [1, 2];

    public readonly ApiConfig = ApiConfig;
    public readonly AutoJoinPolicy = AutoJoinPolicy;
    public readonly DialRequest = DialRequest;
    public readonly DefaultActionPolicy = DefaultActionPolicy;
    public readonly ErrorCode = ErrorCode;
    public readonly Receiver = Receiver;
    public readonly ReceiverAction = ReceiverAction;
    public readonly ReceiverAvailability = ReceiverAvailability;
    public readonly ReceiverType = ReceiverType;
    public readonly SessionRequest = SessionRequest;
    public readonly SessionStatus = SessionStatus;
    public readonly Volume = Volume;

    public readonly media = proxy(new MediaStub(), "chrome.cast.media");
    public readonly timeout = proxy(new TimeoutStub(), "chrome.cast.timeout");

    public readonly isAvailable = true;
    public readonly usingPresentationApi = false;

    private config: ApiConfig | undefined;

    private readonly listenerWrappers = new Map<IReceiverActionListener, any>();

    constructor(
        private readonly cast: CastStub,
    ) {}

    public initialize = callbackAsyncFunction(
        async (apiConfig: ApiConfig) => {
            debug("INITIALIZE", apiConfig);
            this.config = apiConfig;

            // FIXME: get this state from the extension
            // NOTE: for best compat, we wait until after this function
            // returns to notify the receiver
            setTimeout(() => {
                apiConfig.receiverListener(ReceiverAvailability.AVAILABLE);
            });
        },
    );

    public addReceiverActionListener(listener: IReceiverActionListener) {
        debug("addReceiverActionListener:", listener);
        const context = this.cast.framework.CastContext.getInstance();
        const wrapper = ({ sessionState }: {sessionState: SessionState}) => {
            const device = context.getCurrentSession()?.device;
            debug("dispatch receiverAction:", device, sessionState);
            if (!device) return;

            if (sessionState === SessionState.SESSION_STARTED) {
                debug("dispatch receiverAction:", device, ReceiverAction.CAST);
                listener(device, ReceiverAction.CAST);
            } else if (sessionState === SessionState.SESSION_ENDING) {
                debug("dispatch receiverAction:", device, ReceiverAction.STOP);
                listener(device, ReceiverAction.STOP);
            }
        };

        this.listenerWrappers.set(listener, wrapper);
        context.addEventListener(CastContextEventType.SESSION_STATE_CHANGED, wrapper);
    }

    public logMessage(message: any) {
        debug("logMessage:", message);
    }

    public precache(data: any) {
        debug("precache:", data);
    }

    public removeReceiverActionListener(listener: IReceiverActionListener) {
        debug("removeReceiverActionListener:", listener);
        const wrapper = this.listenerWrappers.get(listener);
        if (wrapper) {
            const context = this.cast.framework.CastContext.getInstance();
            context.removeEventListener(CastContextEventType.SESSION_STATE_CHANGED, wrapper);
        }
    }

    public readonly requestSession = optionalCallbackAsyncFunction(
        async (sessionRequest?: SessionRequest) => {
            const request = sessionRequest ?? this.config?.sessionRequest;
            if (!request) {
                throw new Error("No sessionRequest available");
            }

            debug("requestSession", sessionRequest, "->", request);
            const cast = this.cast.framework.CastContext.getInstance();
            const session = await ChromeCastStub.requestSessionImpl(
                cast, request,
            );

            debug("requestSession success:", session);

            const listener = this.config?.sessionListener;
            if (listener) listener(session);

            return session;
        },
    );

    public requestSessionById(id: string) {
        debug("TODO requestSessionById", id);
    }

    public setCustomReceivers = callbackAsyncFunction(
        async (receivers: any[]) => {
            debug("setCustomReceivers", receivers);
            if (receivers.length) {
                throw new Error("Unsupported: what does setCustomReceivers mean?");
            }
        },
    );

    public setPageContext(win: any) {
        debug("TODO setPageContext", win);
    }

    public setReceiverDisplayStatus = callbackAsyncFunction(
        async (receiver: Receiver) => {
            // TODO
            debug("TODO setReceiverDisplayStatus", receiver);
        },
    );

    public unescape(s: string) {
        debug("unescape", s);
        return unescape(s); // ?!
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
            throw new CastError(errorCode);
        }

        const s = cast.getCurrentSession();
        if (!s) throw new Error("No error, but no session created");

        const appMeta = s.getApplicationMetadata();
        const device = s.getCastDevice();
        debug("create session on", appMeta, device, "from:", s);

        return proxy(new Session(
            s.getSessionId(),
            request.appId,
            appMeta.name,
            appMeta.images,
            device,
            cast,
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

    private readonly debug = _debug("castable:chrome");

    constructor(cast: CastStub) {
        this.chrome = new ChromeStub(cast);
    }

    public receivedApiAvailableHandler: GCastApiAvailabilityHandler;

    public onGCastApiAvailable = (isAvailable: boolean, err: any) => {
        this.debug("received GCast API Availability: ", isAvailable, err);
    };

    public setGCastApiAvailableHandler(callback: GCastApiAvailabilityHandler) {
        this.debug("requested GCast API Availability: ", callback);
        this.receivedApiAvailableHandler = callback;

        if (callback) callback(true);
    }

    public notifyGCastAvailable(isAvailable: boolean) {
        if (this.receivedApiAvailableHandler) {
            this.receivedApiAvailableHandler(isAvailable);
        }
    }
}
