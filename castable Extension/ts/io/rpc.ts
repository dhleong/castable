import { Capability } from "../chrome.cast/enums";
import { LoadRequest } from "../chrome.cast/media";
import { RpcMessaging } from "./messaging";

export class Rpc {
    /* eslint-disable @typescript-eslint/indent */
    // NOTE: the default indent rules make this very difficult to read

    constructor(
        private readonly messaging: RpcMessaging,
    ) {}

    public readonly endCurrentSession = this.messaging.createRpc<
        {
            stopCasting: boolean,
        },
        void
    >("endCurrentSession");

    public readonly loadMedia = this.messaging.createRpc<
        LoadRequest,
        void
    >("loadMedia");

    public readonly requestSession = this.messaging.createRpc<
        any,
        {
            cancelled?: boolean,
            app: {
                appId: string,
                displayName: string,
            },
            device: {
                id: string,
                name: string,
                model: string,
                capabilities: Capability[],
            },
            sessionId: string,
        }
    >("requestSession");

    public readonly sessionSendMessage = this.messaging.createRpc<
        {
            namespace: string,
            stringMessage?: string,
            dictMessage?: any,
        },
        void
    >("sessionSendMessage");

    public readonly sessionListen = this.messaging.createRpc<
        {
            namespace: string,
        },
        void
    >("sessionListen");
}
