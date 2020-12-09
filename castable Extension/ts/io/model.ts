import { Listener } from "../chrome.cast/generic-types";

export interface ClientEvent {
    name: string,
    args?: any,
}

export interface IClientIO {
    /**
     * Dispatch a one-off IPC message to the extension.
     */
    dispatchMessage(name: string, args?: any): void;

    /**
     * Register a listener that will be called every time any IPC
     * message is received.
     */
    registerEventListener(listener: Listener<ClientEvent>): void;
}
