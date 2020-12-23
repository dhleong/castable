export enum CastState {
    NO_DEVICES_AVAILABLE = "NO_DEVICES_AVAILABLE",
    NOT_CONNECTED = "NOT_CONNECTED",
    CONNECTING = "CONNECTING",
    CONNECTED = "CONNECTED",
}

export enum RemotePlayerEventType {
    ANY_CHANGE = "anyChanged",
    BREAK_CLIP_ID_CHANGED = "breakClipIdChanged",
    BREAK_ID_CHANGED = "breakIdChanged",
    CAN_CONTROL_VOLUME_CHANGED = "canControlVolumeChanged",
    CAN_PAUSE_CHANGED = "canPauseChanged",
    CAN_SEEK_CHANGED = "canSeekChanged",
    CURRENT_BREAK_CLIP_NUMBER_CHANGED = "currentBreakClipNumberChanged",
    CURRENT_BREAK_CLIP_TIME_CHANGED = "currentBreakClipTimeChanged",
    CURRENT_BREAK_TIME_CHANGED = "currentBreakTimeChanged",
    CURRENT_TIME_CHANGED = "currentTimeChanged",
    DISPLAY_NAME_CHANGED = "displayNameChanged",
    DISPLAY_STATUS_CHANGED = "displayStatusChanged",
    DURATION_CHANGED = "durationChanged",
    IMAGE_URL_CHANGED = "imageUrlChanged",
    IS_CONNECTED_CHANGED = "isConnectedChanged",
    IS_MEDIA_LOADED_CHANGED = "isMediaLoadedChanged",
    IS_MUTED_CHANGED = "isMutedChanged",
    IS_PAUSED_CHANGED = "isPausedChanged",
    IS_PLAYING_BREAK_CHANGED = "isPlayingBreakChanged",
    LIVE_SEEKABLE_RANGE_CHANGED = "liveSeekableRangeChanged",
    MEDIA_INFO_CHANGED = "mediaInfoChanged",
    NUMBER_BREAK_CLIPS_CHANGED = "numberBreakClipsChanged",
    PLAYER_STATE_CHANGED = "playerStateChanged",
    QUEUE_DATA_CHANGED = "queueDataChanged",
    STATUS_TEXT_CHANGED = "statusTextChanged",
    TITLE_CHANGED = "titleChanged",
    VIDEO_INFO_CHANGED = "videoInfoChanged",
    VOLUME_LEVEL_CHANGED = "volumeLevelChanged",
    WHEN_SKIPPABLE_CHANGED = "whenSkippableChanged",
}

export enum SessionEventType {
    APPLICATION_STATUS_CHANGED = "APPLICATION_STATUS_CHANGED",
    APPLICATION_METADATA_CHANGED = "APPLICATION_METADATA_CHANGED",
    ACTIVE_INPUT_STATE_CHANGED = "ACTIVE_INPUT_STATE_CHANGED",
    VOLUME_CHANGED = "VOLUME_CHANGED",
    MEDIA_SESSION = "MEDIA_SESSION",
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
    SESSION_STATE_CHANGED = "sessionstatechanged",
}

export enum ActiveInputState {
    ACTIVE_INPUT_STATE_UNKNOWN,
    ACTIVE_INPUT_STATE_NO,
    ACTIVE_INPUT_STATE_YES,
}
