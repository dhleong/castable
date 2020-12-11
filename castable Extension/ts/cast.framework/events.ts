import { Media } from "../chrome.cast/media/media";
import { ActiveInputState } from "./enums";

export interface ActiveInputStateEventData {
    activeInputState: ActiveInputState;
}

export interface ApplicationMetadataEventData {
    metadata: any; // TODO
}

export interface ApplicationStatusEventData {
    status?: string;
}

export interface MediaSessionEventData {
    mediaSession: Media;
}

export interface VolumeEventData {
    isMute?: boolean;
    volume?: number;
}
