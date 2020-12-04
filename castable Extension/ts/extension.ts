import { warn } from "./log";

export interface SafariMessageEvent {
    name: string;
}

export type MessageEventHandler = (event: SafariMessageEvent) => void;

interface MessagingSafariExtension {
    // NOTE: if we put this in a @types file it'll override
    // the existing methods, instead of augmenting...
    dispatchMessage(messageName: string, content?: any): void;
}

interface MessagingSafariPage {
    addEventListener(
        eventName: string,
        handler: MessageEventHandler,
    ): void;

    removeEventListener(
        eventName: string,
        handler: MessageEventHandler,
    ): void;
}

export function dispatchMessage(
    messageName: string,
    content?: any,
) {
    const e = safari.extension as unknown as MessagingSafariExtension;
    e.dispatchMessage("content-loaded");
}

export function addEventListener(eventName: string, handler: MessageEventHandler) {
    const page = safari.self as unknown as MessagingSafariPage;
    page.addEventListener("message", handler);
}

export function removeEventListener(eventName: string, handler: MessageEventHandler) {
    const page = safari.self as unknown as MessagingSafariPage;
    page.removeEventListener("message", handler);
}

export class EventRegistrar {
    private handlers: {[name: string]: MessageEventHandler} = {};

    public register(message: string, handler: MessageEventHandler) {
        if (!Object.keys(this.handlers).length) {
            addEventListener("message", this.boundOnEvent);
        }

        this.handlers[message] = handler;
    }

    public on(message: string, handler: MessageEventHandler) {
        this.register(message, handler);
    }

    public unregister(message: string) {
        delete this.handlers[message];

        if (!Object.keys(this.handlers).length) {
            removeEventListener("message", this.boundOnEvent);
        }
    }

    private boundOnEvent = this.onEvent.bind(this);

    private onEvent(event: SafariMessageEvent) {
        const handler = this.handlers[event.name];
        if (handler) {
            handler(event);
        } else {
            warn("No handler registered for:", event);
        }
    }
}
