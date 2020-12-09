import { SessionRequest } from "./session-request";
import { ReceiverAvailability } from "./enums";
import { Listener } from "./generic-types";
import { Session } from "./session";

export class ApiConfig {
    constructor(
        public sessionRequest: SessionRequest,
        public sessionListener: Listener<Session>,
        public receiverListener: Listener<ReceiverAvailability>,
    ) {}
}
