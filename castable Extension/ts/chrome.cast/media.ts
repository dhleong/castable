export class MediaInfo {
    constructor(
        public readonly contentId: string,
        public readonly contentType: string,
    ) {}
}

export class LoadRequest {
    constructor(
        public readonly mediaInfo: MediaInfo,
    ) {}
}

export class MediaStub {
    public readonly DEFAULT_MEDIA_RECEIVER_APP_ID = "CC1AD845";
    public readonly MediaInfo = MediaInfo;
    public readonly LoadRequest = LoadRequest;
}
