import { log } from "./log";
import { CastContext } from "./cast.framework/cast-context";
import {
    CastState,
    SessionState,
    CastContextEventType,
} from "./cast.framework/enums";

class FrameworkStub {
    public readonly CastState = CastState;
    public readonly SessionState = SessionState;
    public readonly CastContext = CastContext;
    public readonly CastContextEventType = CastContextEventType;
}

export class CastStub {
    private frameworkStub = new FrameworkStub();

    public get framework() {
        log("READ cast.framework");
        return this.frameworkStub;
    }
}
