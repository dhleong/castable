namespace castable {
    class CastStub {
        // TODO ?
    }

    const castStub = new CastStub();

    export const ChromeStub = {
        get cast() {
            log("READ chrome.cast");
            return castStub;
        }
    }
}
