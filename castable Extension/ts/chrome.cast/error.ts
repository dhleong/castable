export class CastError extends Error {
    constructor(
        public readonly code: string,
        public readonly description?: string,
        public readonly details?: any,
    ) {
        super(`chrome.cast.Error: [${code}] "${description}"`);
    }
}

