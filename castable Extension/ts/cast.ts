import { ClientIO } from "./client-io";
import { proxy } from "./proxy";

import { CastContext } from "./cast.framework/cast-context";
import {
    ActiveInputState,
    CastContextEventType,
    CastState,
    RemotePlayerEventType,
    SessionEventType,
    SessionState,
} from "./cast.framework/enums";
import {
    RemotePlayer,
    RemotePlayerController,
} from "./cast.framework/remote-player";

class StaticClassContext {
    constructor(
        private readonly myInstance: CastContext,
    ) {}

    public getInstance() {
        return this.myInstance;
    }
}

class FrameworkStub {
    public readonly VERSION = "1.0.14";

    public readonly ActiveInputState = ActiveInputState;
    public readonly CastState = CastState;
    public readonly SessionState = SessionState;
    public readonly CastContextEventType = CastContextEventType;
    public readonly CastContext: StaticClassContext;
    public readonly RemotePlayer = RemotePlayer;
    public readonly RemotePlayerController = RemotePlayerController;
    public readonly RemotePlayerEventType = RemotePlayerEventType;
    public readonly SessionEventType = SessionEventType;

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
        this.framework = proxy(new FrameworkStub(io), "cast.framework");
    }
}
