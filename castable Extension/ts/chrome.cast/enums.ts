export enum AutoJoinPolicy {
    TAB_AND_ORIGIN_SCOPED,
    ORIGIN_SCOPED,
    PAGE_SCOPED,
}

export enum Capability {
    VIDEO_OUT = "VIDEO_OUT",
    AUDIO_OUT = "AUDIO_OUT",
    VIDEO_IN = "VIDEO_IN",
    AUDIO_IN = "AUDIO_IN",
    MULTIZONE_GROUP = "MULTIZONE_GROUP",
}

export enum DefaultActionPolicy {
    CREATE_SESSION = "CREATE_SESSION",
    CAST_THIS_TAB = "CAST_THIS_TAB",
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

export enum ReceiverAvailability {
    AVAILABLE = "AVAILABLE",
    UNAVAILABLE = "UNAVAILABLE",
}

export enum ReceiverType {
    CAST = "CAST",
    DIAL = "DIAL",
    HANGOUT = "HANGOUT",
    CUSTOM = "CUSTOM",
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
