export interface CompatContext {
    actualUserAgent: string;
    host: string;
    window: Window;
}

export interface CompatMatcher {
    (context: CompatContext): boolean;
}

export interface CompatApplier {
    apply(context: CompatContext): void;
}
