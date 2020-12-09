import { EventEmitter } from "events";
import { v4 as uuid } from "uuid";

import { warn } from "../log";

import { IClientIO } from "./model";

export enum EventSpecIdentifier {
    sessionMessage = "sendMessage",
}

export interface EventSpec {
    id: EventSpecIdentifier;
    param?: string;
}

export interface EventListener<T extends unknown[]> {
    (...params: T): void;
}

/**
 * Convenient interface for registering event emitters that
 * get fulfilled by the extension via RPC.
 */
export class RpcEventEmitter {
    private bridge = new EventEmitter();
    private listenerIds = new Map<EventListener<any>, string>();

    constructor(
        private readonly io: IClientIO,
    ) {
        this.io.registerEventListener(event => {
            if (event.args && event.args.listenerId) {
                this.bridge.emit(
                    event.args.listenerId,
                    ...(event.args.params || []),
                );
            }
        });
    }

    public async on<T extends unknown[]>(event: EventSpec, listener: EventListener<T>) {
        const listenerId = uuid();
        this.bridge.on(listenerId, listener as any);
        this.listenerIds.set(listener, listenerId);

        await this.io.dispatchMessage("listen", {
            event,
            listenerId,
        });
    }

    public async off<T extends unknown[]>(event: EventSpec, listener: EventListener<T>) {
        const listenerId = this.listenerIds.get(listener);
        if (!listenerId) {
            warn(`provided unknown listener: ${listener}`);
            return;
        }
        this.bridge.off(listenerId, listener as any);

        await this.io.dispatchMessage("unlisten", {
            event,
            listenerId,
        });
    }
}
