import { RoutingError } from '../RoutingError'
import { InvokableController } from '../FoxStormRouter'
import { ControllerResolvable } from './ControllerResolvable'
import { Response } from '../Response'
import { Request } from '../Request'

export class ControllerResolver implements ControllerResolvable {
  constructor (readonly pluralise: any, readonly crudActions: string[]) {}

  retrieveAction (controller: (req: Request, res: Response) => void | InvokableController): (req: Request, res: Response) => void {
    if (typeof controller === 'function') {
      return controller
    }

    const invokableController = controller as InvokableController
    if (invokableController.__invoke !== undefined) {
      return invokableController.__invoke
    }

    throw new RoutingError('Invalid route', 'Invalid Controller or Controller action passed')
  }

  async retrieveControllerInstanceFromModelName (modelName: string): Promise<any> {
    const controllerName = `${this.pluralise(modelName)}Controller`

    try {
      const controller: any = await import(`${process.cwd()}/http/controllers/${controllerName}`)
      const constructorName = Object.keys(controller)[0]

      const controllerInstance = new controller[constructorName]()

      this.crudActions.forEach(action => {
        if (controllerInstance[action] === undefined) {
          throw new Error(`${action} not implemented`)
        }
      })

      return controllerInstance
    } catch (error) {
      throw new Error(error)
    }
  }
}
