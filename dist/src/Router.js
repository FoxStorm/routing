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
const express = require("express");
const ControllerResolver_1 = require("./ControllerResolver/ControllerResolver");
// export type Crud = {
//   index(req: Request, res: Response): void
//   create(req: Request, res: Response): void
//   update(req: Request, res: Response): void
//   delete(req: Request, res: Response): void
// }
exports.__invoke = (controller) => {
    return controller.__invoke;
};
class Router {
    constructor(logger, router = express(), routerCrudMap = {
        'get': { action: 'index', route: `/%model%` },
        'post': { action: 'create', route: `/%model%` },
        'put': { action: 'update', route: `/%model%/:id` },
        'delete': { action: 'delete', route: `/%model%/:id` }
    }, controllerResolver = new ControllerResolver_1.ControllerResolver(Object.keys(routerCrudMap).map(key => routerCrudMap[key].action))) {
        this.logger = logger;
        this.router = router;
        this.routerCrudMap = routerCrudMap;
        this.controllerResolver = controllerResolver;
    }
    get(path, requestHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            const controllerAction = this.controllerResolver.retrieveAction(requestHandler);
            this.router.get(path, controllerAction);
            this.logger.log(`Registered route: ${path}`);
        });
    }
    post(path, requestHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            const controllerAction = this.controllerResolver.retrieveAction(requestHandler);
            this.router.post(path, controllerAction);
        });
    }
    put(path, requestHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            const controllerAction = this.controllerResolver.retrieveAction(requestHandler);
            this.router.get(path, controllerAction);
        });
    }
    delete(path, requestHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            const controllerAction = this.controllerResolver.retrieveAction(requestHandler);
            this.router.get(path, controllerAction);
        });
    }
    resource(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const controllerInstance = yield this.controllerResolver.retrieveControllerInstanceFromModel(model);
                const modelName = model.name.toLowerCase();
                for (const method in this.routerCrudMap) {
                    const config = this.routerCrudMap[method];
                    this.router[method](config.route.replace('%model%', modelName), controllerInstance[config.action]);
                    this.logger.log(`Registered route: ${config.route.replace('%model%', modelName)}`);
                }
                // this.router.get(`/${modelName}`, controllerInstance.index)
                // this.router.post(`/${modelName}`, controllerInstance.create)
                // this.router.put(`/${modelName}/:id`, controllerInstance.update)
                // this.router.delete(`/${modelName}/:id`, controllerInstance.delete)
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.Router = Router;
//# sourceMappingURL=Router.js.map