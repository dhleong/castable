import _debug from "debug";
import { EventEmitter } from "events";

import { Listener } from "../chrome.cast/generic-types";
import { RemotePlayerEventType } from "./enums";

export class RemotePlayer {
    public controller: RemotePlayerController | undefined;

    public currentTime = 0;
    public volumeLevel = 1;
}

export class RemotePlayerChangedEvent {
    constructor(
        public readonly type: RemotePlayerEventType,
        public readonly field: string,
        public readonly value: any,
    ) {}
}

const debug = _debug("castable:cast.framework.RemotePlayerController");
const MAX_FORMATTABLE_TIME = 100 * 3600; // 100 hours

export class RemotePlayerController {
    private readonly events = new EventEmitter();

    constructor(
        public readonly player: RemotePlayer,
    ) {
        debug("NEW RemotePlayerController with:", player);
        this.player.controller = this;
    }

    public addEventListener(
        type: RemotePlayerEventType,
        handler: Listener<RemotePlayerChangedEvent>,
    ) {
        debug("TODO addEventListener(", type, ")");
        this.events.on(type, handler);
    }

    public getFormattedTime(timeInSec: number) {
        // NOTE: per docs, intervals > 100 hours get truncated
        const time = Math.min(MAX_FORMATTABLE_TIME, timeInSec);

        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time - (hours * 3600) - (minutes * 60);

        const hoursZero = hours < 10 ? "0" : "";
        const minutesZero = minutes < 10 ? "0" : "";
        const secondsZero = seconds < 10 ? "0" : "";

        return `${hoursZero}${hours}:${minutesZero}${minutes}:${secondsZero}${seconds}`;
    }

    public getSeekPosition(currentTime: number, duration: number) {
        if (duration <= 0) return 0;
        return currentTime / duration;
    }

    public getSeekTime(currentPosition: number, duration: number) {
        return currentPosition * duration;
    }

    public async muteOrUnmute() {
        debug("TODO: muteOrUnmute");
    }

    public async playOrPause() {
        debug("TODO: playOrPause");
    }

    public async seek() {
        debug("TODO: seek to:", this.player.currentTime);
    }

    public async setVolumeLevel() {
        debug("TODO: set volume to:", this.player.volumeLevel);
    }

    public async skipAd() {
        debug("TODO: skip ad");
    }

    public async stop() {
        debug("TODO: stop");
    }

    public removeEventListener(
        type: RemotePlayerEventType,
        handler: Listener<RemotePlayerChangedEvent>,
    ) {
        this.events.off(type, handler);
    }
}
