import {
    IPC_INCOMING_EVENT,
    IPC_OUTGOING_EVENT,
} from "./consts";
import { log } from "./log";
import { Listener } from "./chrome.cast/generic-types";

import { RpcEventEmitter } from "./io/events";
import { RpcMessaging } from "./io/messaging";
import { ClientEvent, IClientIO } from "./io/model";
import { Rpc } from "./io/rpc";

export class ClientIO implements IClientIO {
    public rpc: Rpc;
    public events: RpcEventEmitter;

    constructor(
        private readonly script: HTMLScriptElement,
    ) {
        this.rpc = new Rpc(new RpcMessaging(this));
        this.events = new RpcEventEmitter(this);
    }

    public registerEventListener(listener: Listener<ClientEvent>) {
        this.script.addEventListener(IPC_INCOMING_EVENT, event => {
            const data = (event as CustomEvent<ClientEvent>).detail;
            log("stub received ipc message", data);
            listener(data);
        });
    }

    /**
     * Dispatch a one-off IPC message to the extension.
     */
    public dispatchMessage(name: string, args?: any) {
        this.script.dispatchEvent(new CustomEvent(IPC_OUTGOING_EVENT, {
            detail: {
                name,
                args,
            },
            bubbles: true,
            cancelable: false,
        }));
    }
}
