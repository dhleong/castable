export enum CastState {
    NO_DEVICES_AVAILABLE = "NO_DEVICES_AVAILABLE",
    NOT_CONNECTED = "NOT_CONNECTED",
    CONNECTING = "CONNECTING",
    CONNECTED = "CONNECTED",
}

export enum SessionState {
    NO_SESSION = "NO_SESSION",
    SESSION_STARTING = "SESSION_STARTING",
    SESSION_STARTED = "SESSION_STARTED",
    SESSION_START_FAILED = "SESSION_START_FAILED",
    SESSION_ENDING = "SESSION_ENDING",
    SESSION_ENDED = "SESSION_ENDED",
    SESSION_RESUMED = "SESSION_RESUMED",
}

export enum CastContextEventType {
    CAST_STATE_CHANGED = "caststatechanged",
    SESSION_STATE_CHANGED = "sessionstatechanged"
}

export enum ActiveInputState {
    ACTIVE_INPUT_STATE_UNKNOWN,
    ACTIVE_INPUT_STATE_NO,
    ACTIVE_INPUT_STATE_YES,
}
