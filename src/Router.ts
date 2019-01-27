import * as express from 'express'
import { RoutingError } from './RoutingError'

export interface Request extends express.Request {}
export interface Response extends express.Response {}

interface ApplicationRouter {
  get (endpoint: string, controller: (req: Request, res: Response) => void | InvokableController): void
}

type InvokableController = {
  readonly __invoke: (req: Request, res: Response) => void
}

export const __invoke = (controller: any) => { // tslint:disable-line
  return (controller as InvokableController).__invoke
}

export class Router implements ApplicationRouter {
  constructor (readonly router = express.Router()) {}

  get (endpoint: string, controller: (req: Request, res: Response) => void | InvokableController): void {
    const action = this.retrieveAction(controller)
    this.router.get(endpoint, action)
  }

  private retrieveAction (controller: (req: Request, res: Response) => void | InvokableController): (req: Request, res: Response) => void {
    if (typeof controller === 'function') {
      return controller
    }

    const invokableController = controller as InvokableController
    if (invokableController.__invoke !== undefined) {
      return invokableController.__invoke
    }

    throw new RoutingError('Invalid route', 'Invalid Controller or Controller action passed')
  }
}
