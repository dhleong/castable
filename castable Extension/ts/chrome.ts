import { MediaStub } from "./chrome.cast/media";
import { log } from "./log";
import { AutoJoinPolicy } from "./chrome.cast/enums";

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
    public readonly AutoJoinPolicy = AutoJoinPolicy;
    public readonly media = new MediaStub();

    public initialize(
        apiConfig: any,
        onSuccess: () => void,
        onError: (e: CastError) => void,
    ) {
        log("INITIALIZE", apiConfig);
    }
}

export class ChromeStub {
    private readonly castStub = new ChromeCastStub();

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
