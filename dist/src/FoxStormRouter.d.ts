import { ControllerResolvable } from './ControllerResolver/ControllerResolvable';
import { Response } from './Response';
import { Request } from './Request';
export declare type RequestHandler = {
    (req: Request, res: Response): void;
};
declare type RequestHandler = {
    (req: Request, res: Response): void | InvokableController;
};
export declare type InvokableController = {
    readonly __invoke: (req: Request, res: Response) => void;
};
export interface Routing {
    readonly router: any;
    root(requestHandler: RequestHandler): void;
    get(endpoint: any, controller?: (req: Request, res: Response) => void | InvokableController): void;
    post(endpoint: any, controller?: (req: Request, res: Response) => void | InvokableController): void;
    put(endpoint: any, controller?: (req: Request, res: Response) => void | InvokableController): void;
    delete(endpoint: any, controller?: (req: Request, res: Response) => void | InvokableController): void;
    resource(model: any): Promise<void>;
}
interface Logger {
    (message: string): void;
}
export declare const __invoke: (controller: any) => (req: Request, res: Response) => void;
export declare class FoxStormRouter implements Routing {
    private readonly logger;
    readonly router: any;
    private readonly routerCrudMap;
    private readonly controllerResolver;
    constructor(logger: Logger, router?: any, routerCrudMap?: {
        readonly [index: string]: {
            readonly action: string;
            readonly route: string;
        };
    }, controllerResolver?: ControllerResolvable);
    root(requestHandler: RequestHandler): void;
    get(path: string, requestHandler: RequestHandler): void;
    post(path: string, requestHandler: RequestHandler): void;
    put(path: string, requestHandler: RequestHandler): void;
    delete(path: string, requestHandler: RequestHandler): void;
    resource<T>(model: new () => T): Promise<void>;
}
export {};
