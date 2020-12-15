import { Listener } from "../chrome.cast/generic-types";

export interface ClientEvent {
    name: string,
    args?: any,
}

export interface IMediaCommand {
    type: string;
    mediaSessionId: string;
    [key: string]: any;
}

export interface IRpc {
    sendMediaCommand(command: IMediaCommand): Promise<void>;
}

export interface IClientIO {
    rpc: IRpc;

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
