export enum AutoJoinPolicy {
    TAB_AND_ORIGIN_SCOPED,
    ORIGIN_SCOPED,
    PAGE_SCOPED,
}

export enum ErrorCode {
    CANCEL,
    TIMEOUT,
    API_NOT_INITIALIZED,
    INVALID_PARAMETER,
    EXTENSION_NOT_COMPATIBLE,
    EXTENSION_MISSING,
    RECEIVER_UNAVAILABLE,
    SESSION_ERROR,
    CHANNEL_ERROR,
    LOAD_MEDIA_FAILED,
}

export enum PlayerState {
    IDLE = "IDLE",
    PLAYING = "PLAYING",
    PAUSED = "PAUSED",
    BUFFERING = "BUFFERING",
}

export enum StreamType {
    BUFFERED = "BUFFERED",
    LIVE = "LIVE",
    OTHER = "OTHER",
}

export enum TrackType {
    TEXT = "TEXT",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
}
