import { InvokableController } from '../Router';
import { Response } from '../Response';
import { Request } from '../Request';
export interface ControllerResolvable {
    retrieveAction(controller: (req: Request, res: Response) => void | InvokableController): (req: Request, res: Response) => void;
    retrieveControllerInstanceFromModel<T>(model: new () => T): Promise<any>;
}
