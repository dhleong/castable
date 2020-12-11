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
    CANCEL = "CANCEL",
    TIMEOUT = "TIMEOUT",
    API_NOT_INITIALIZED = "API_NOT_INITIALIZED",
    INVALID_PARAMETER = "INVALID_PARAMETER",
    EXTENSION_NOT_COMPATIBLE = "EXTENSION_NOT_COMPATIBLE",
    EXTENSION_MISSING = "EXTENSION_MISSING",
    RECEIVER_UNAVAILABLE = "RECEIVER_UNAVAILABLE",
    SESSION_ERROR = "SESSION_ERROR",
    CHANNEL_ERROR = "CHANNEL_ERROR",
    LOAD_MEDIA_FAILED = "LOAD_MEDIA_FAILED",
}

export enum PlayerState {
    IDLE = "IDLE",
    PLAYING = "PLAYING",
    PAUSED = "PAUSED",
    BUFFERING = "BUFFERING",
}

export enum ReceiverAction {
    CAST = "CAST",
    STOP = "STOP",
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

export enum SessionStatus {
    CONNECTED = "CONNECTED",
    DISCONNECTED = "DISCONNECTED",
    STOPPED = "STOPPED",
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
