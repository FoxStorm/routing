import { InvokableController } from '../Router';
import { ControllerResolvable } from './ControllerResolvable';
import { Response } from '../Response';
import { Request } from '../Request';
export declare class ControllerResolver implements ControllerResolvable {
    readonly crudActions: string[];
    constructor(crudActions: string[]);
    retrieveAction(controller: (req: Request, res: Response) => void | InvokableController): (req: Request, res: Response) => void;
    retrieveControllerInstanceFromModel<T>(model: new () => T): Promise<any>;
}
