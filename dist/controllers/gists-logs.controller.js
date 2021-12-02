"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GistsLogsController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let GistsLogsController = class GistsLogsController {
    constructor(gistsLogsRepository) {
        this.gistsLogsRepository = gistsLogsRepository;
    }
    async create(gistsLogs) {
        return this.gistsLogsRepository.create(gistsLogs);
    }
    async count(where) {
        return this.gistsLogsRepository.count(where);
    }
    async find(filter) {
        return this.gistsLogsRepository.find(filter);
    }
    async updateAll(gistsLogs, where) {
        return this.gistsLogsRepository.updateAll(gistsLogs, where);
    }
    async findById(id, filter) {
        return this.gistsLogsRepository.findById(id, filter);
    }
    async updateById(id, gistsLogs) {
        await this.gistsLogsRepository.updateById(id, gistsLogs);
    }
    async replaceById(id, gistsLogs) {
        await this.gistsLogsRepository.replaceById(id, gistsLogs);
    }
    async deleteById(id) {
        await this.gistsLogsRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/gists-logs'),
    rest_1.response(200, {
        description: 'GistsLogs model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.GistsLogs) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.GistsLogs, {
                    title: 'NewGistsLogs',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GistsLogsController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/gists-logs/count'),
    rest_1.response(200, {
        description: 'GistsLogs model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.GistsLogs)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GistsLogsController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/gists-logs'),
    rest_1.response(200, {
        description: 'Array of GistsLogs model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.GistsLogs, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.GistsLogs)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GistsLogsController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/gists-logs'),
    rest_1.response(200, {
        description: 'GistsLogs PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.GistsLogs, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.GistsLogs)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.GistsLogs, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GistsLogsController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/gists-logs/{id}'),
    rest_1.response(200, {
        description: 'GistsLogs model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.GistsLogs, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.GistsLogs, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GistsLogsController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/gists-logs/{id}'),
    rest_1.response(204, {
        description: 'GistsLogs PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.GistsLogs, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.GistsLogs]),
    tslib_1.__metadata("design:returntype", Promise)
], GistsLogsController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/gists-logs/{id}'),
    rest_1.response(204, {
        description: 'GistsLogs PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.GistsLogs]),
    tslib_1.__metadata("design:returntype", Promise)
], GistsLogsController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/gists-logs/{id}'),
    rest_1.response(204, {
        description: 'GistsLogs DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GistsLogsController.prototype, "deleteById", null);
GistsLogsController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.GistsLogsRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.GistsLogsRepository])
], GistsLogsController);
exports.GistsLogsController = GistsLogsController;
//# sourceMappingURL=gists-logs.controller.js.map