import { EventEmitter } from "events";
import { MediaCommand, PlayerState } from "../chrome.cast/enums";

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

/**
 * A map of RemotePlayer keys to transform functions, which return
 * a new value for that key (or undefined to not change it)
 */
const transforms: {[key: string]: RemotePlayerTransform} = {
    canControlVolume: m => m.supportedMediaCommands?.includes(MediaCommand.STREAM_VOLUME),
    canPause: m => m.supportedMediaCommands?.includes(MediaCommand.PAUSE),
    canSeek: m => m.supportedMediaCommands?.includes(MediaCommand.SEEK),
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
            if (value === undefined) continue;

            (player as any)[key] = value;
            const type = RemotePlayerEventTransformer.keyToChangedEvent[key];

            events.emit(type, new RemotePlayerChangedEvent(type, key, value));
            events.emit(
                RemotePlayerEventType.ANY_CHANGE,
                new RemotePlayerChangedEvent(
                    RemotePlayerEventType.ANY_CHANGE,
                    key,
                    value,
                ),
            );
        }
    }
}
