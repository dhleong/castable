import _debug from "debug";

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

const debug = _debug("castable:extension");

export function dispatchMessage(
    messageName: string,
    content?: any,
) {
    const e = safari.extension as unknown as MessagingSafariExtension;
    e.dispatchMessage(messageName, content);
}

function addEventListener(eventName: string, handler: MessageEventHandler) {
    const page = safari.self as unknown as MessagingSafariPage;
    page.addEventListener(eventName, handler);
}

function removeEventListener(eventName: string, handler: MessageEventHandler) {
    const page = safari.self as unknown as MessagingSafariPage;
    page.removeEventListener(eventName, handler);
}

/**
 * Supports listening to messages dispatched from the Safari extension.
 * Not available when in client script mode
 */
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

    public once(message: string, handler: MessageEventHandler) {
        this.register(message, (...args) => {
            this.unregister(message);
            handler(...args);
        });
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
            debug("No handler registered for:", event);
        }
    }
}
