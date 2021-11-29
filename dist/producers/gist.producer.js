"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GistProducer = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const loopback_rabbitmq_1 = require("loopback-rabbitmq");
let GistProducer = class GistProducer {
    constructor(rabbitmqProducer) {
        this.rabbitmqProducer = rabbitmqProducer;
    }
    async fetchGist(fetchGistMessage) {
        var _a, _b;
        await this.rabbitmqProducer.publish((_a = process.env.RABBITMQ_EXCHANGE) !== null && _a !== void 0 ? _a : '', (_b = process.env.RABBITMQ_QUEUE) !== null && _b !== void 0 ? _b : '', Buffer.from(JSON.stringify(fetchGistMessage)));
        return;
    }
};
GistProducer = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject(loopback_rabbitmq_1.RabbitmqBindings.RABBITMQ_PRODUCER)),
    tslib_1.__metadata("design:paramtypes", [loopback_rabbitmq_1.RabbitmqProducer])
], GistProducer);
exports.GistProducer = GistProducer;
//# sourceMappingURL=gist.producer.js.map