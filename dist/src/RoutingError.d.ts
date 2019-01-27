import { Debuggable } from 'foxstorm-debuggable';
export declare class RoutingError extends Debuggable {
    static readonly readableName: string;
    readonly identifier: string;
    readonly reason: string;
    constructor(identifier: string, reason: string);
}
