import { RpcMessaging } from "../ts/io/messaging";
import { IClientIO, IRpc } from "../ts/io/model";
import { Rpc } from "../ts/io/rpc";

export function stubRpc(): IRpc {
    return new Rpc({
        createRpc(name: string) {
            return async () => {
                throw new Error(`Called un-mocked ${name}`);
            };
        },
    } as unknown as RpcMessaging);
}

export function stubClientIO(): IClientIO {
    return {
        rpc: stubRpc(),

        dispatchMessage() {
            throw new Error("Not implemented");
        },

        registerEventListener() {
            throw new Error("Not implemented");
        },
    };
}
