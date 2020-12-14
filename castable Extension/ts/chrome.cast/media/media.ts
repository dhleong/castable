export class MediaInfo {
    constructor(
        public readonly contentId: string,
        public readonly contentType: string,
    ) {}
}

export class Media {
    public media: MediaInfo | undefined;

    constructor(
        public readonly sessionId: string,
        public readonly mediaSessionId: string,
    ) {}
}
