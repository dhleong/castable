import {
    IPC_INCOMING_EVENT,
    IPC_OUTGOING_EVENT,
} from "./consts";
import { log } from "./log";

export interface ClientEvent {
    name: string,
    args?: any,
}

export class ClientIO {
    constructor(
        private readonly script: HTMLScriptElement,
    ) {
        script.addEventListener(IPC_INCOMING_EVENT, event => {
            const data = (event as CustomEvent<ClientEvent>).detail;
            log("stub received ipc message", data);
        });
    }

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
