import { log } from "./log";

export function proxy<T extends object>(actual: T, name?: string): T {
    const proxy = new Proxy(actual, {
        get: function(target, prop, receiver) {
            const got = Reflect.get(target, prop, receiver);
            const had = got !== undefined;
            log("READ ", name ?? actual, ".", prop, `(found ${had})`);
            return got;
        }
    })
    return proxy as unknown as T;
}
