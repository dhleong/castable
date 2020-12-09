import { log } from "../log";

import { ErrorCode } from "./enums";
import { CastError } from "./error";
import { Listener } from "./generic-types";

type Arr = readonly unknown[];

type WithListeners<T, Args extends Arr> = [
    ...Args,
    Listener<T>,
    Listener<CastError>,
];

function isErrorCode(v: any): v is ErrorCode {
    if (typeof v !== "string") return false;
    const lookup: any = (ErrorCode as any)[v];
    return lookup !== undefined;
}

function wrappingError(
    errorCallback: Listener<CastError>,
): (e: any) => void {
    return e => {
        log("received error:", e);
        if (e instanceof CastError) {
            errorCallback(e);
        } else if (isErrorCode(e)) {
            errorCallback(new CastError(e));
        } else {
            // ?
            errorCallback(new CastError(ErrorCode.SESSION_ERROR, `${e}`));
        }
    };
}

/**
 * Wraps an async function `promiseFactory` with a new function that
 * expects the same args as `promiseFactory` plus two callbacks for
 * success and error, and forwards the value or error to which the
 * Promise resolves to the appropriate callback.
 *
 * This is a convenience to simplify the implementation of the not-so
 * ergonomic chrome.cast APIs
 */
export function callbackAsyncFunction<T, Args extends Arr>(
    promiseFactory: (...args: [...Args]) => Promise<T>,
): (...args: WithListeners<T, Args>) => void {
    return (...args: WithListeners<T, Args>) => {
        if (args.length < 2) {
            throw new Error("Insufficient args");
        }
        const successCallback = args[args.length - 2] as Listener<T>;
        const errorCallback = args[args.length - 1] as Listener<CastError>;
        promiseFactory(...(args as unknown as Args))
            .then(successCallback)
            .catch(wrappingError(errorCallback));
    };
}

/**
 * This is like [callbackAsyncFunction], but with the callbacks provided
 * before the arguments.
 */
export function optionalCallbackAsyncFunction<T, Args extends Arr>(
    promiseFactory: (...args: [...Args]) => Promise<T>,
): (
        successCallback: Listener<T>,
        errorCallback: Listener<CastError>,
        ...args: [...Args]
    ) => void {
    return (successCallback, errorCallback, ...args) => {
        promiseFactory(...args)
            .then(successCallback)
            .catch(wrappingError(errorCallback));
    };
}
