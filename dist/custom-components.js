"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomComponent = void 0;
const core_1 = require("@loopback/core");
const producers_1 = require("./producers");
const services_1 = require("./services");
class CustomComponent {
    constructor() {
        this.bindings = [
            core_1.createServiceBinding(producers_1.PipedriveProducer),
            core_1.createServiceBinding(producers_1.GistProducer),
            core_1.createServiceBinding(services_1.PipedriveService),
        ];
    }
}
exports.CustomComponent = CustomComponent;
//# sourceMappingURL=custom-components.js.map