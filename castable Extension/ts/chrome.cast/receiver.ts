import { Capability } from "./enums";

export class Receiver {
    constructor(
        public readonly label: string,
        public readonly friendlyName: string,
        public readonly capabilities: Capability[] = [],
        // TODO volume ?
    ) {}
}
