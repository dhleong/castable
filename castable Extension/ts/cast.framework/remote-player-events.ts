import _debug from "debug";
import { EventEmitter } from "events";

import { PlayerState } from "../chrome.cast/enums";
import { Media } from "../chrome.cast/media/media";

import { RemotePlayerEventType } from "./enums";
import { RemotePlayer } from "./remote-player";

export class RemotePlayerChangedEvent {
    constructor(
        public readonly type: RemotePlayerEventType,
        public readonly field: keyof RemotePlayer,
        public readonly value: any,
    ) {}
}

interface RemotePlayerTransform {
    (media: Media): any | undefined;
}

const MEDIA_COMMAND_PAUSE = 0x01;
const MEDIA_COMMAND_SEEK = 0x02;
const MEDIA_COMMAND_VOLUME = 0x04;

function supports(media: Media, mask: number) {
    /* eslint-disable no-bitwise */
    return ((media.supportedMediaCommands ?? 0) & mask) !== 0;
}

/**
 * A map of RemotePlayer keys to transform functions, which return
 * a new value for that key (or undefined to not change it)
 */
const transforms: {[key: string]: RemotePlayerTransform} = {
    // To be restored when supportedMediaCommands has the proper type:
    // canControlVolume: m => m.supportedMediaCommands?.includes(MediaCommand.STREAM_VOLUME),
    // canPause: m => m.supportedMediaCommands?.includes(MediaCommand.PAUSE),
    // canSeek: m => m.supportedMediaCommands?.includes(MediaCommand.SEEK),

    canControlVolume: m => supports(m, MEDIA_COMMAND_VOLUME),
    canPause: m => supports(m, MEDIA_COMMAND_PAUSE),
    canSeek: m => supports(m, MEDIA_COMMAND_SEEK),

    currentTime: m => m.currentTime,
    duration: m => m.media?.duration,
    isMediaLoaded: m => m.media !== undefined,
    isMuted: m => m.volume?.muted,
    isPaused: m => m.playerState === PlayerState.PAUSED,
    mediaInfo: m => m.media,
    playerState: m => m.playerState,
    title: m => m.media?.metadata?.title,
    volumeLevel: m => m.volume?.level,
};

const debug = _debug("castable:cast.framework.RemotePlayerEventTransformer");

export class RemotePlayerEventTransformer {
    private static keyToChangedEvent = Object.keys(RemotePlayerEventType)
        .reduce((m, key) => {
            const value = (RemotePlayerEventType as any)[key];
            // eslint-disable-next-line no-param-reassign
            m[value.replace(/Changed/, "")] = value;
            return m;
        }, {} as {[key: string]: RemotePlayerEventType});

    public transform(
        media: Media,
        player: RemotePlayer,
        events: EventEmitter,
    ) {
        /* eslint-disable no-param-reassign */
        const keys = Object.keys(transforms) as (keyof RemotePlayer)[];

        for (const key of keys) {
            const transform = transforms[key];
            const value = transform(media);
            if (value === undefined || value === null) {
                // NOTE: disney+, at least, barfs if a `null` value is
                // emitted as a ChangedEvent for MediaInfo; the docs
                // don't explicitly say the event value property isn't
                // nullable, but until we find this to be problematic,
                // let's be defensive.
                continue;
            }

            const oldValue = player[key];
            if (oldValue === value) continue;

            (player as any)[key] = value;
            const type = RemotePlayerEventTransformer.keyToChangedEvent[key];

            this.emit(events, RemotePlayerEventType.ANY_CHANGE, key, value);
            this.emit(events, type, key, value);
        }
    }

    private emit(
        events: EventEmitter,
        type: RemotePlayerEventType,
        key: keyof RemotePlayer,
        value: any,
    ) {
        try {
            events.emit(type, new RemotePlayerChangedEvent(type, key, value));
        } catch (e) {
            debug("WARN error dispatching", type, key, value);
        }
    }
}
