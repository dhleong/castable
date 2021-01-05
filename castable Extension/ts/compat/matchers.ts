import { CompatContext } from "./model";

export function onHost(desiredHost: string) {
    return ({ host }: CompatContext) => host.endsWith(desiredHost);
}
