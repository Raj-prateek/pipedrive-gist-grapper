"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipedriveConsumer = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const loopback_rabbitmq_1 = require("loopback-rabbitmq");
const producers_1 = require("../producers");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
let PipedriveConsumer = class PipedriveConsumer {
    constructor(pipedriveProducer, pipedriveService, gistsLogsRepository) {
        this.pipedriveProducer = pipedriveProducer;
        this.pipedriveService = pipedriveService;
        this.gistsLogsRepository = gistsLogsRepository;
    }
    async handle(message) {
        try {
            await this.pipedriveService.addActivity(message);
            await this.gistsLogsRepository.create({
                gistID: message.gist.id,
                htmlURL: message.gist.htmlURL,
                description: message.gist.description,
                userId: message.userID,
                created: new Date().toString(),
            });
        }
        catch (e) {
            console.error(e);
            await this.pipedriveProducer.createActivity(message);
        }
    }
};
tslib_1.__decorate([
    loopback_rabbitmq_1.rabbitConsume({
        exchange: (_a = process.env.RABBITMQ_EXCHANGE_PIPEDRIVE) !== null && _a !== void 0 ? _a : '',
        routingKey: (_b = process.env.RABBITMQ_QUEUE_PIPEDRIVE) !== null && _b !== void 0 ? _b : '',
        queue: process.env.RABBITMQ_QUEUE_PIPEDRIVE,
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PipedriveConsumer.prototype, "handle", null);
PipedriveConsumer = tslib_1.__decorate([
    tslib_1.__param(0, core_1.service(producers_1.PipedriveProducer)),
    tslib_1.__param(1, core_1.service(services_1.PipedriveService)),
    tslib_1.__param(2, repository_1.repository(repositories_1.GistsLogsRepository)),
    tslib_1.__metadata("design:paramtypes", [producers_1.PipedriveProducer,
        services_1.PipedriveService,
        repositories_1.GistsLogsRepository])
], PipedriveConsumer);
exports.PipedriveConsumer = PipedriveConsumer;
//# sourceMappingURL=pipedrive.consumer.js.map