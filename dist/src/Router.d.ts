import * as express from 'express';
export interface Request extends express.Request {
}
export interface Response extends express.Response {
}
interface ApplicationRouter {
    get(endpoint: string, controller: (req: Request, res: Response) => void | InvokableController): void;
}
declare type InvokableController = {
    readonly __invoke: (req: Request, res: Response) => void;
};
export declare const __invoke: (controller: any) => (req: Request, res: Response) => void;
export declare class Router implements ApplicationRouter {
    readonly router: import("express-serve-static-core").Router;
    constructor(router?: import("express-serve-static-core").Router);
    get(endpoint: string, controller: (req: Request, res: Response) => void | InvokableController): void;
    private retrieveAction;
}
export {};
