export interface IMessageListener {
    (namespace: string, message: string): void;
}

