import { RoutingError } from '../RoutingError'
import { InvokableController } from '../FoxStormRouter'
import { ControllerResolvable } from './ControllerResolvable'
import { Response } from '../Response'
import { Request } from '../Request'

export class ControllerResolver implements ControllerResolvable {
  constructor (readonly crudActions: string[]) {}

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

  async retrieveControllerInstanceFromModel<T> (model: new () => T): Promise<any> {
    if (typeof model !== 'function') {
      throw new Error('Model has to be a valid class')
    }

    const modelName = model.name
    const controllerName = `${modelName}sController`

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
