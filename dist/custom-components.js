"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomComponent = void 0;
const core_1 = require("@loopback/core");
const producers_1 = require("./producers");
const gist_producer_1 = require("./producers/gist.producer");
class CustomComponent {
    constructor() {
        this.bindings = [
            core_1.createServiceBinding(producers_1.PipedriveProducer),
            core_1.createServiceBinding(gist_producer_1.GistProducer),
        ];
    }
}
exports.CustomComponent = CustomComponent;
//# sourceMappingURL=custom-components.js.map