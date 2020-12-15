import {
    StreamType,
    PlayerState,
    TrackType,
    ResumeState,
} from "./enums";

import {
    Media,
    MediaInfo,
} from "./media/media";
import { SeekRequest } from "./seek-request";

export class LoadRequest {
    public readonly type = "LOAD";

    constructor(
        public readonly media: MediaInfo,
    ) {}
}

export class AssignableContainer {
    // nop
}

export class MediaStub {
    public readonly DEFAULT_MEDIA_RECEIVER_APP_ID = "CC1AD845";
    public readonly StreamType = StreamType;
    public readonly PlayerState = PlayerState;
    public readonly TrackType = TrackType;
    public readonly ResumeState = ResumeState;

    public readonly Media = Media;
    public readonly MediaInfo = MediaInfo;
    public readonly LoadRequest = LoadRequest;
    public readonly SeekRequest = SeekRequest;

    public readonly GenericMediaMetadata = AssignableContainer;
    public readonly MovieMediaMetadata = AssignableContainer;
    public readonly TvShowMediaMetadata = AssignableContainer;
}
