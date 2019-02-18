import * as express from 'express'
import * as pluralize from 'pluralize'
import { ControllerResolvable } from './ControllerResolver/ControllerResolvable'
import { ControllerResolver } from './ControllerResolver/ControllerResolver'
import { Response } from './Response'
import { Request } from './Request'

export type RequestHandler = {
  (req: Request, res: Response): void
}

type RequestHandler = {
  (req: Request, res: Response): void | InvokableController
}

export type InvokableController = {
  readonly __invoke: (req: Request, res: Response) => void
}

export interface Routing {
  readonly router: any
  root (requestHandler: RequestHandler): void
  get (endpoint: any, controller?: (req: Request, res: Response) => void | InvokableController): void
  post (endpoint: any, controller?: (req: Request, res: Response) => void | InvokableController): void
  put (endpoint: any, controller?: (req: Request, res: Response) => void | InvokableController): void
  delete (endpoint: any, controller?: (req: Request, res: Response) => void | InvokableController): void
  resource (model: any): Promise<void>
}

interface Logger {
  (message: string): void
}

// export type Crud = {
//   index(req: Request, res: Response): void
//   create(req: Request, res: Response): void
//   update(req: Request, res: Response): void
//   delete(req: Request, res: Response): void
// }

type CrudMap = {
  readonly [index: string]: { readonly action: string, readonly route: string}
}

export const __invoke = (controller: any) => { // tslint:disable-line
  return (controller as InvokableController).__invoke
}

export class FoxStormRouter implements Routing {
  constructor (
    private readonly logger: Logger,
    readonly router: any = express.Router(),
    private readonly routerCrudMap: CrudMap = {
      'get': { action: 'index', route: `/%model%` },
      'post': { action: 'create', route: `/%model%` },
      'put': { action: 'update', route: `/%model%/:id` },
      'delete': { action: 'delete', route: `/%model%/:id` }
    },
    private readonly controllerResolver: ControllerResolvable = new ControllerResolver(
      pluralize,
      Object.keys(routerCrudMap).map(key => routerCrudMap[key].action)
    )
  ) {
    this.logger(`\n ${'*'.repeat(10)} Router Initialized ${'*'.repeat(10)} \n`)
  }

  root (requestHandler: RequestHandler) {
    const controllerAction = this.controllerResolver.retrieveAction(requestHandler)
    this.router.get('/', controllerAction)
    this.logger(`-- Registered GET route /`)
  }

  get (path: string, requestHandler: RequestHandler) {
    const controllerAction = this.controllerResolver.retrieveAction(requestHandler)
    this.router.get(path, controllerAction)
    this.logger(`-- Registered GET route ${path}`)
  }

  post (path: string, requestHandler: RequestHandler) {
    const controllerAction = this.controllerResolver.retrieveAction(requestHandler)
    this.router.post(path, controllerAction)
    this.logger(`-- Registered POST route ${path}`)
  }

  put (path: string, requestHandler: RequestHandler) {
    const controllerAction = this.controllerResolver.retrieveAction(requestHandler)
    this.router.get(path, controllerAction)
    this.logger(`-- Registered PUT route ${path}`)
  }

  delete (path: string, requestHandler: RequestHandler) {
    const controllerAction = this.controllerResolver.retrieveAction(requestHandler)
    this.router.get(path, controllerAction)
    this.logger(`-- Registered DELETE route ${path}`)
  }

  async resource<T> (model: new () => T) {
    if (typeof model !== 'function') {
      throw new Error('Model has to be a valid class')
    }

    try {
      const controllerInstance: any = await this.controllerResolver.retrieveControllerInstanceFromModelName(model.name)
      const modelName = model.name.toLowerCase()

      for (const method in this.routerCrudMap) {
        const config = this.routerCrudMap[method]
        this.router[method](config.route.replace('%model%', modelName), controllerInstance[config.action])
        this.logger(`-- Registered ${method.toUpperCase()} route ${config.route.replace('%model%', modelName)}`)
      }
    } catch (error) {
      throw error
    }
  }
}
