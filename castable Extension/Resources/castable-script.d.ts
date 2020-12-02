declare namespace castable {
    class CastStub {
    }
    export const ChromeStub: {
        readonly cast: CastStub;
    };
    export {};
}
interface SafariExtension {
    dispatchMessage(messageName: string, content?: any): void;
}
declare function log(...args: any): void;
declare function registerCast(): void;
declare function initExt(): void;
declare namespace castable {
}
