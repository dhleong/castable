import { Capability, ReceiverType } from "./enums";

export class Receiver {
    constructor(
        public readonly label: string,
        public readonly friendlyName: string,
        public readonly capabilities: Capability[] = [],
        // TODO volume ?
    ) {}

    public receiverType: ReceiverType = ReceiverType.CAST;
}
