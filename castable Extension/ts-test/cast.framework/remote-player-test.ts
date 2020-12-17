import * as chai from "chai";
import { mock, SinonMock } from "sinon";

import { CastContext } from "../../ts/cast.framework/cast-context";
import { CastSession } from "../../ts/cast.framework/cast-session";
import { RemotePlayer } from "../../ts/cast.framework/remote-player";
import {
    RemotePlayerController,
} from "../../ts/cast.framework/remote-player-controller";
import { PlayerState } from "../../ts/chrome.cast/enums";
import { Media } from "../../ts/chrome.cast/media/media";
import { IClientIO } from "../../ts/io/model";
import { stubClientIO } from "../test-util";

chai.should();

describe("RemotePlayerController", () => {
    let controller: RemotePlayerController;
    let player: RemotePlayer;
    let io: IClientIO;
    let rpc: SinonMock;
    let media: Media;

    beforeEach(() => {
        io = stubClientIO();
        rpc = mock(io.rpc);
        media = new Media("session", "mediaSession", {} as any);

        const context = new CastContext(io as any);
        const session = new CastSession(io as any, {}, {} as any, "sessionId");
        session.getMediaSession = () => media;
        context.getCurrentSession = () => session;

        player = new RemotePlayer();
        controller = new RemotePlayerController(player, context);
    });

    afterEach(() => {
        rpc.verify();
    });

    describe("getFormattedTime", () => {
        it("Handles very small times", () => {
            controller.getFormattedTime(42).should.equal("00:00:42");
        });

        it("Handles full times", () => {
            const time = 3600 + (42 * 60) + 22;
            controller.getFormattedTime(time)
                .should.equal("01:42:22");
        });

        it("truncates times > 100", () => {
            controller.getFormattedTime(120 * 3600).should.equal("100:00:00");
        });
    });

    describe("media controls", () => {
        it("delegate to context session", async () => {
            rpc.expects("sendMediaCommand")
                .once()
                .withExactArgs({
                    type: "PLAY",
                    mediaSessionId: "mediaSession",
                })
                .resolves();

            await controller.playOrPause();
        });

        it("sends correct PLAY/PAUSE based on media state", async () => {
            media.playerState = PlayerState.PLAYING;

            rpc.expects("sendMediaCommand")
                .once()
                .withExactArgs({
                    type: "PAUSE",
                    mediaSessionId: "mediaSession",
                })
                .resolves();

            await controller.playOrPause();
        });
    });
});
