import { ErrorCode } from "./enums";

export class CastError extends Error {
    constructor(
        public readonly code: ErrorCode,
        public readonly description?: string,
        public readonly details?: any,
    ) {
        super(`chrome.cast.Error: [${code}] "${description}"`);
    }
}
