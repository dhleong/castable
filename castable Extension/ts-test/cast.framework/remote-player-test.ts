import * as chai from "chai";
import { RemotePlayer, RemotePlayerController } from "../../ts/cast.framework/remote-player";

chai.should();

describe("RemotePlayerController", () => {
    let controller: RemotePlayerController;
    let player: RemotePlayer;

    beforeEach(() => {
        player = new RemotePlayer();
        controller = new RemotePlayerController(player);
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
});
