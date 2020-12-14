import _debug from "debug";
import { EventEmitter } from "events";
import { v4 as uuid } from "uuid";

import { IClientIO } from "./model";

export enum EventSpecIdentifier {
    sessionMedia = "sessionMedia",
    sessionMessage = "sessionMessage",
}

export interface EventSpec {
    id: EventSpecIdentifier;
    param?: string;
}

export interface EventListener<T extends unknown[]> {
    (...params: T): void;
}

interface ListenRequest {
    event: EventSpec;
    listenerId: string;
}

const debug = _debug("castable:RpcEventEmitter");

/**
 * Convenient interface for registering event emitters that
 * get fulfilled by the extension via RPC.
 */
export class RpcEventEmitter {
    private bridge = new EventEmitter();
    private listenerIds = new Map<EventListener<any>, string>();
    private registeredEvents = new Set<ListenRequest>();

    constructor(
        private readonly io: IClientIO,
    ) {
        this.io.registerEventListener(event => {
            if (event.args && event.args.listenerId) {
                debug(
                    "dispatching event:",
                    event.args.listenerId,
                    this.bridge.listenerCount(event.args.listenerId),
                    event.args.params,
                );
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

        const request = { event, listenerId };
        this.registeredEvents.add(request);

        await this.io.dispatchMessage("listen", request);
    }

    public async off<T extends unknown[]>(event: EventSpec, listener: EventListener<T>) {
        const listenerId = this.listenerIds.get(listener);
        if (!listenerId) {
            debug(`WARN provided unknown listener: ${listener}`);
            return;
        }
        this.bridge.off(listenerId, listener as any);

        const request = { event, listenerId };
        this.registeredEvents.delete(request);

        await this.io.dispatchMessage("unlisten", request);
    }

    /**
     * Clear registered listeners matching the given predicate
     */
    public async clearMatching(predicate: (event: EventSpec) => boolean) {
        const toClear = Array.from(this.registeredEvents)
            .filter(request => predicate(request.event));
        const toClearIds = new Set(toClear.map(request => request.listenerId));

        // clean up state
        for (const request of toClear) {
            this.registeredEvents.delete(request);
            this.bridge.removeAllListeners(request.listenerId);

            for (const [listener, id] of this.listenerIds.entries()) {
                if (toClearIds.has(id)) {
                    toClearIds.delete(id);
                    this.listenerIds.delete(listener);

                    // short-circuit:
                    if (!toClearIds.size) break;
                }
            }
        }

        // notify the extension
        await Promise.all(
            toClear.map(request => this.io.dispatchMessage(
                "unlisten",
                request,
            )),
        );
    }
}
