import _debug from "debug";
import { EventEmitter } from "events";

import { PlayerState } from "../chrome.cast/enums";
import { Listener } from "../chrome.cast/generic-types";
import { Media } from "../chrome.cast/media/media";
import { IPartialMediaCommand } from "../io/model";

import { CastContext } from "./cast-context";
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

function findCastableContext() {
    return (window as any).cast.framework.CastContext.getInstance();
}

export class RemotePlayerController {
    private readonly events = new EventEmitter();

    constructor(
        public readonly player: RemotePlayer,
        private readonly context: CastContext = findCastableContext(),
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

    public readonly muteOrUnmute = this.createMediaCommand(media => ({
        type: "SET_VOLUME",
        volume: {
            muted: media.volume?.muted === false,
        },
    }));

    public readonly playOrPause = this.createMediaCommand(media => ({
        type: media.playerState === PlayerState.PLAYING
            ? "PAUSE"
            : "PLAY",
    }));

    public readonly seek = this.createMediaCommand(() => ({
        type: "SEEK",
        currentTime: this.player.currentTime,
    }));

    public readonly setVolumeLevel = this.createMediaCommand(() => ({
        type: "SET_VOLUME",
        volume: {
            level: this.player.volumeLevel,
        },
    }));

    public skipAd = this.createSimpleMediaCommand("SKIP_AD");
    public stop = this.createSimpleMediaCommand("STOP");

    public removeEventListener(
        type: RemotePlayerEventType,
        handler: Listener<RemotePlayerChangedEvent>,
    ) {
        // TODO
        this.events.off(type, handler);
    }

    private createSimpleMediaCommand(type: string) {
        return this.createMediaCommand(() => ({ type }));
    }

    private createMediaCommand(
        build: (media: Media) => IPartialMediaCommand,
    ) {
        return () => {
            debug("media command send requested...");

            const session = this.context.getCurrentSession();
            if (!session) throw new Error("No session");

            const media = session.getMediaSession();
            if (!media) {
                debug("NO media session; abandon send request");
                return;
            }

            const command = build(media);

            debug("sending media command:", command);
            return session.io.rpc.sendMediaCommand({
                ...command,
                mediaSessionId: media.mediaSessionId,
            });
        };
    }
}
