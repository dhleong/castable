import { StreamType, PlayerState, TrackType } from "./enums";

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

export class AssignableContainer {
    // nop
}

export class MediaStub {
    public readonly DEFAULT_MEDIA_RECEIVER_APP_ID = "CC1AD845";
    public readonly PlayerState = PlayerState;
    public readonly StreamType = StreamType;
    public readonly TrackType = TrackType;

    public readonly MediaInfo = MediaInfo;
    public readonly LoadRequest = LoadRequest;
    public readonly SeekRequest = AssignableContainer;

    public readonly GenericMediaMetadata = AssignableContainer;
    public readonly MovieMediaMetadata = AssignableContainer;
    public readonly TvShowMediaMetadata = AssignableContainer;
}
