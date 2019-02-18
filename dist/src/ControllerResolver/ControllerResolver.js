"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const RoutingError_1 = require("../RoutingError");
class ControllerResolver {
    constructor(pluralise, crudActions) {
        this.pluralise = pluralise;
        this.crudActions = crudActions;
    }
    retrieveAction(controller) {
        if (typeof controller === 'function') {
            return controller;
        }
        const invokableController = controller;
        if (invokableController.__invoke !== undefined) {
            return invokableController.__invoke;
        }
        throw new RoutingError_1.RoutingError('Invalid route', 'Invalid Controller or Controller action passed');
    }
    retrieveControllerInstanceFromModelName(modelName) {
        return __awaiter(this, void 0, void 0, function* () {
            const controllerName = `${this.pluralise(modelName)}Controller`;
            try {
                const controller = yield Promise.resolve().then(() => require(`${process.cwd()}/http/controllers/${controllerName}`));
                const constructorName = Object.keys(controller)[0];
                const controllerInstance = new controller[constructorName]();
                this.crudActions.forEach(action => {
                    if (controllerInstance[action] === undefined) {
                        throw new Error(`${action} not implemented`);
                    }
                });
                return controllerInstance;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.ControllerResolver = ControllerResolver;
//# sourceMappingURL=ControllerResolver.js.map