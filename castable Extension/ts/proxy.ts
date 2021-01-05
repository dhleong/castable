import _debug from "debug";

const debug = _debug("castable:proxy");

// eslint-disable-next-line @typescript-eslint/ban-types
export function proxy<T extends object>(
    actual: T,
    name?: string,
): T {
    const proxyObject = new Proxy(actual, {
        get(target, prop, receiver) {
            const got = Reflect.get(target, prop, receiver);
            const had = got !== undefined;

            // NOTE: we may want to show this in some verbose mode...
            if (!had) {
                debug("READ ", name ?? actual, ".", prop, `(found ${had})`);
            }

            return got;
        },

        set(target, prop, value, receiver) {
            const got = Reflect.get(target, prop, receiver);
            const had = got !== undefined;

            if (!had) {
                debug("WRITE ", name ?? actual, ".", prop, `(found ${had})`, " <- ", value);
                Reflect.set(target, prop, value, receiver);
            }

            return true;
        },
    });
    return proxyObject as unknown as T;
}
