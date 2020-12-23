import * as chai from "chai";

import { EventEmitter } from "events";
import { RemotePlayerEventType } from "../../ts/cast.framework/enums";
import { RemotePlayer } from "../../ts/cast.framework/remote-player";

import {
    RemotePlayerChangedEvent,
    RemotePlayerEventTransformer,
} from "../../ts/cast.framework/remote-player-events";
import { Media } from "../../ts/chrome.cast/media/media";

chai.should();

describe("RemotePlayerEventTransformer", () => {
    let transformer: RemotePlayerEventTransformer;
    let emitter: EventEmitter;
    let events: RemotePlayerChangedEvent[];
    let media: Media;
    let player: RemotePlayer;

    beforeEach(() => {
        transformer = new RemotePlayerEventTransformer();
        emitter = new EventEmitter();
        events = [];

        media = new Media("", "", null as any);
        player = new RemotePlayer();

        const appendEvent = (event: RemotePlayerChangedEvent) => {
            events.push(event);
        };

        for (const type of Object.values(RemotePlayerEventType)) {
            emitter.on(type, appendEvent);
        }
    });

    it("dispatches appropriate events", () => {
        media.currentTime = 42;

        transformer.transform(media, player, emitter);

        events.should.deep.contain(
            new RemotePlayerChangedEvent(
                RemotePlayerEventType.CURRENT_TIME_CHANGED,
                "currentTime",
                42,
            ),
        );
    });

    it("dispatches an 'any' event", () => {
        media.currentTime = 42;

        transformer.transform(media, player, emitter);

        events.should.deep.contain(
            new RemotePlayerChangedEvent(
                RemotePlayerEventType.ANY_CHANGE,
                "currentTime",
                42,
            ),
        );
    });

    it("updates the player object", () => {
        media.currentTime = 42;

        transformer.transform(media, player, emitter);

        player.currentTime.should.equal(42);
    });

    it("does not emit events with null values", () => {
        media.media = null;

        transformer.transform(media, player, emitter);

        events.should.not.deep.contain(
            new RemotePlayerChangedEvent(
                RemotePlayerEventType.MEDIA_INFO_CHANGED,
                "mediaInfo",
                null,
            ),
        );
    });
});
