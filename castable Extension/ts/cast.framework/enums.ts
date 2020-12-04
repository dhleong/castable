export enum CastState {
    NO_DEVICES_AVAILABLE,
    NOT_CONNECTED,
    CONNECTING,
    CONNECTED,
}

export enum SessionState {
    NO_SESSION,
    SESSION_STARTING,
    SESSION_STARTED,
    SESSION_START_FAILED,
    SESSION_ENDING,
    SESSION_ENDED,
    SESSION_RESUMED,
}

export enum CastContextEventType {
    CAST_STATE_CHANGED = "caststatechanged",
    SESSION_STATE_CHANGED = "sessionstatechanged"
}
