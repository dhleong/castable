import { SessionRequest } from "./session-request";
import { ReceiverAvailability } from "./enums";

export type ReceiverListener = (availability: ReceiverAvailability) => void;

export class ApiConfig {
    constructor(
        public sessionRequest: SessionRequest,
        public sessionListener: any,
        public receiverListener: ReceiverListener,
    ) {}
}
