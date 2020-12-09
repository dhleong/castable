export interface CompatContext {
    actualUserAgent: string;
    host: string;
    window: Window;
}

export interface CompatApplier {
    apply(context: CompatContext): void;
}
