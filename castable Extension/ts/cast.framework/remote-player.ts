import { PlayerState } from "../chrome.cast/enums";
import { MediaInfo } from "../chrome.cast/media/media";

export class RemotePlayer {
    // NOTE: can only be RemotePlayerController, but we're using
    // unknown here to avoid a circular dependency
    public controller: any | undefined;

    public breakClipId?: string;
    public breakId?: string;
    public canControlVolume = true;
    public canPause = true;
    public canSeek = true;
    public currentBreakClipNumber?: number;
    public currentBreakClipTime?: number;
    public currentBreakTime?: number;
    public currentTime = 0;
    public displayName = "";
    public displayStatus = "";
    public duration = 0;
    public imageUrl?: string;
    public isConnected = true;
    public isMediaLoaded = false;
    public isMuted = false;
    public isPaused = false;
    public isPlayingBreak = false;
    public liveSeekableRange = undefined; // TODO
    public mediaInfo?: MediaInfo;
    public numberBreakClips = 0;
    public playerState?: PlayerState;
    public queueData = undefined; // TODO
    public savedPlayerState = undefined; // TODO
    public statusText = "";
    public title?: string;
    public videoInfo = undefined; // TODO
    public volumeLevel = 1;
    public whenSkippable?: number;
}
