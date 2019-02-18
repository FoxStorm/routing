import { InvokableController } from '../FoxStormRouter';
import { ControllerResolvable } from './ControllerResolvable';
import { Response } from '../Response';
import { Request } from '../Request';
export declare class ControllerResolver implements ControllerResolvable {
    readonly pluralise: any;
    readonly crudActions: string[];
    constructor(pluralise: any, crudActions: string[]);
    retrieveAction(controller: (req: Request, res: Response) => void | InvokableController): (req: Request, res: Response) => void;
    retrieveControllerInstanceFromModelName(modelName: string): Promise<any>;
}
