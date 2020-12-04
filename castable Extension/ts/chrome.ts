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

export const ChromeStub = {
    get cast() {
        log("READ chrome.cast");
        return castStub;
    }
}
