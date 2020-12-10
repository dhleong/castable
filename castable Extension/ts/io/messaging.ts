import { log } from "../log";

import { IClientIO } from "./model";

class Future<T> {
    constructor(
        public readonly resolve: (v: T) => void,
        public readonly reject: (e: any) => void,
    ) {}
}

export class RpcMessaging {
    private nextRequestId = 0;

    private pendingResolves: {[id: number]: Future<any>} = {};

    constructor(
        private readonly io: IClientIO,
    ) {
        this.io.registerEventListener(data => {
            if (data.args && data.args.castableRequestId !== undefined) {
                log("received rpc response:", data);
                const future = this.pendingResolves[data.args.castableRequestId];
                if (data.args.error) {
                    future.reject(data.args.error);
                } else {
                    future.resolve(data.args);
                }
            }
        });
    }

    public createRpc<TRequest, TResponse>(
        name: string,
    ): (req: TRequest) => Promise<TResponse> {
        return async (req: TRequest) => {
            const response = await this.request(name, req);
            return response as TResponse;
        };
    }

    private request(name: string, args?: any) {
        const id = this.nextRequestId++;
        return new Promise((resolve, reject) => {
            this.pendingResolves[id] = new Future(resolve, reject);

            this.io.dispatchMessage(name, {
                ...args,

                castableRequestId: id,
            });
        });
    }
}
