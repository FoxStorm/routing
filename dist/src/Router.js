"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const RoutingError_1 = require("./RoutingError");
exports.__invoke = (controller) => {
    return controller.__invoke;
};
class Router {
    constructor(router = express.Router()) {
        this.router = router;
    }
    get(endpoint, controller) {
        const action = this.retrieveAction(controller);
        this.router.get(endpoint, action);
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
}
exports.Router = Router;
//# sourceMappingURL=Router.js.map