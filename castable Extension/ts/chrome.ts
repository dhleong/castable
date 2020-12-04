import { log } from "./log";

class FrameworkStub {
    // TODO ?
}

class CastStub {
    // TODO ?

    private frame = new FrameworkStub();

    get framework() {
        log("READ chrome.cast.framework");
        return this.frame;
    }
}

const castStub = new CastStub();

export class ChromeStub {
    get cast() {
        log("READ chrome.cast");
        return castStub;
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
