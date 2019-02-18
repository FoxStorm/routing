import { InvokableController } from '../FoxStormRouter';
import { Response } from '../Response';
import { Request } from '../Request';
export interface ControllerResolvable {
    retrieveAction(controller: (req: Request, res: Response) => void | InvokableController): (req: Request, res: Response) => void;
    retrieveControllerInstanceFromModelName(model: string): Promise<any>;
}
