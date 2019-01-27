"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foxstorm_debuggable_1 = require("foxstorm-debuggable");
// Errors that can be thrown while working with Routing.
class RoutingError extends foxstorm_debuggable_1.Debuggable {
    constructor(identifier, reason) {
        super(reason);
        this.identifier = identifier;
        this.reason = reason;
    }
}
RoutingError.readableName = 'Routing Error';
exports.RoutingError = RoutingError;
//# sourceMappingURL=RoutingError.js.map