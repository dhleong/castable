import {
    IPC_INCOMING_EVENT,
    IPC_OUTGOING_EVENT,
} from "./consts";
import { log } from "./log";

export interface ClientEvent {
    name: string,
    args?: any,
}

class Future<T> {
    constructor(
        public readonly resolve: (v: T) => void,
        public readonly reject: (e: any) => void,
    ) {}
}

export class ClientIO {
    private nextRequestId = 0

    private pendingResolves: {[id: number]: Future<any>} = {};

    constructor(
        private readonly script: HTMLScriptElement,
    ) {
        script.addEventListener(IPC_INCOMING_EVENT, event => {
            const data = (event as CustomEvent<ClientEvent>).detail;
            log("stub received ipc message", data);

            if (data.args && data.args.requestId !== undefined) {
                const future = this.pendingResolves[data.args.requestId];
                if (data.args.error) {
                    future.reject(data.args.error);
                } else {
                    future.resolve(data.args);
                }
            }
        });
    }

    public readonly requestSession = this.createRpc<
        void,
        {
            cancelled?: boolean,
        }
    >("requestSession");

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

    private request(name: string, args?: any) {
        const id = this.nextRequestId++;
        return new Promise((resolve, reject) => {
            this.pendingResolves[id] = new Future(resolve, reject);

            this.dispatchMessage(name, {
                ...args,

                requestId: id,
            });
        });
    }

    private createRpc<TRequest, TResponse>(
        name: string,
    ): (req: TRequest) => Promise<TResponse> {
        return async (req: TRequest) => {
            const response = await this.request(name, req);
            return response as TResponse;
        };
    }
}
