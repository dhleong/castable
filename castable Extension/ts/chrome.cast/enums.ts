export enum AutoJoinPolicy {
    TAB_AND_ORIGIN_SCOPED = "tab_and_origin_scoped",
    ORIGIN_SCOPED = "origin_scoped",
    PAGE_SCOPED = "page_scoped",
}

export enum Capability {
    VIDEO_OUT = "video_out",
    AUDIO_OUT = "audio_out",
    VIDEO_IN = "video_in",
    AUDIO_IN = "audio_in",
    MULTIZONE_GROUP = "multizone_group",
}

export enum DefaultActionPolicy {
    CREATE_SESSION = "create_session",
    CAST_THIS_TAB = "cast_this_tab",
}

export enum ErrorCode {
    CANCEL = "cancel",
    TIMEOUT = "timeout",
    API_NOT_INITIALIZED = "api_not_initialized",
    INVALID_PARAMETER = "invalid_parameter",
    EXTENSION_NOT_COMPATIBLE = "extension_not_compatible",
    EXTENSION_MISSING = "extension_missing",
    RECEIVER_UNAVAILABLE = "receiver_unavailable",
    SESSION_ERROR = "session_error",
    CHANNEL_ERROR = "channel_error",
    LOAD_MEDIA_FAILED = "load_media_failed",
}

export enum PlayerState {
    IDLE = "IDLE",
    PLAYING = "PLAYING",
    PAUSED = "PAUSED",
    BUFFERING = "BUFFERING",
}

export enum ReceiverAction {
    CAST = "cast",
    STOP = "stop",
}

export enum ReceiverAvailability {
    AVAILABLE = "available",
    UNAVAILABLE = "unavailable",
}

export enum ReceiverType {
    CAST = "cast",
    DIAL = "dial",
    HANGOUT = "hangout",
    CUSTOM = "custom",
}

export enum ResumeState {
    PLAYBACK_START = "PLAYBACK_START",
    PLAYBACK_PAUSE = "PLAYBACK_PAUSE",
}

export enum SessionStatus {
    CONNECTED = "connected",
    DISCONNECTED = "disconnected",
    STOPPED = "stopped",
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
