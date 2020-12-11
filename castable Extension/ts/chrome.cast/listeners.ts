import { ReceiverAction } from "./enums";
import { Receiver } from "./receiver";

export interface IMessageListener {
    (namespace: string, message: string): void;
}

export interface IReceiverActionListener {
    (receiver: Receiver, action: ReceiverAction): void;
}
