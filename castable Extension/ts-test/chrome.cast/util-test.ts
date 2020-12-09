import * as chai from "chai";
import { stub } from "sinon";
import sinonChai from "sinon-chai";

import { callbackAsyncFunction } from "../../ts/chrome.cast/util";

chai.should();
chai.use(sinonChai);

const delay = () => new Promise<void>(resolve => {
    setTimeout(resolve);
});

describe("callbackAsyncFunction", () => {
    it("forwards args and success correctly", async () => {
        const success = stub();
        const error = stub();

        const multiply = callbackAsyncFunction(async (cargo: string) => {
            return cargo + " x2";
        });

        multiply("wobbly-headed dolls", success, error);

        await delay();

        success.should.be.calledOnceWithExactly("wobbly-headed dolls x2");
        error.should.not.have.been.called;
    });

    it("forwards errors correctly", async () => {
        const success = stub();
        const error = stub();

        const explode = callbackAsyncFunction(async () => {
            throw new Error("Explosion!");
        });

        explode(success, error);

        await delay();

        success.should.not.have.been.called;
        error.should.have.been.calledOnce
            .and.calledWithMatch({
                description: "Error: Explosion!",
            });
    });
});
