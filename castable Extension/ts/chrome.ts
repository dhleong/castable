import { log } from "./log";
import { proxy } from "./proxy";

import { AutoJoinPolicy } from "./chrome.cast/enums";
import { MediaStub } from "./chrome.cast/media";

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

    public readonly AutoJoinPolicy = AutoJoinPolicy;
    public readonly media = proxy(new MediaStub(), "chrome.cast.media");

    public initialize(
        apiConfig: any,
        onSuccess: () => void,
        onError: (e: CastError) => void,
    ) {
        log("INITIALIZE", apiConfig);
    }

    public requestSessionById(id: string) {
        log("chrome.cast.requestSessionById", id);
    }
}

export class ChromeStub {
    private readonly castStub = proxy(new ChromeCastStub(), "chrome.cast");

    get cast() {
        log("READ chrome.cast");
        return this.castStub;
    }
}

export type GCastApiAvailabilityHandler =
    ((isAvailable: boolean) => void)
    | null
    | undefined;

export class ChromeController {
    public readonly chrome = new ChromeStub();

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
