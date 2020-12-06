import { CastContext } from "./cast.framework/cast-context";
import {
    ActiveInputState,
    CastContextEventType,
    CastState,
    SessionState,
} from "./cast.framework/enums";
import { ClientIO } from "./client-io";

class StaticClassContext {
    constructor(
        private readonly myInstance: CastContext,
    ) {}

    public getInstance() {
        return this.myInstance;
    }
}

class FrameworkStub {
    public readonly ActiveInputState = ActiveInputState;
    public readonly CastState = CastState;
    public readonly SessionState = SessionState;
    public readonly CastContextEventType = CastContextEventType;
    public readonly CastContext: StaticClassContext;

    constructor(
        io: ClientIO,
    ) {
        this.CastContext = new StaticClassContext(new CastContext(io));
    }
}

export class CastStub {
    public readonly framework: FrameworkStub;

    constructor(
        io: ClientIO,
    ) {
        this.framework = new FrameworkStub(io);
    }
}
