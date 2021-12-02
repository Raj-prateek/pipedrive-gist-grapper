"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const gist_producer_1 = require("../producers/gist.producer");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
let UsersController = class UsersController {
    constructor(gistProducer, usersRepository, pipedriveService) {
        this.gistProducer = gistProducer;
        this.usersRepository = usersRepository;
        this.pipedriveService = pipedriveService;
    }
    async create(users) {
        const dealId = await this.pipedriveService.addDeal(users.userName);
        return this.usersRepository.create({ ...users, dealId });
    }
    async find(filter) {
        return this.usersRepository.find(filter);
    }
    async findById(id, filter) {
        return this.usersRepository.findById(id, filter);
    }
    async startSyncById(id) {
        const user = await this.usersRepository.findById(id);
        user.lastSyncedAt = new Date().toString();
        await this.usersRepository.save(user);
        await this.gistProducer.fetchGist({
            userName: user.userName,
            date: new Date(),
            userId: id,
            dealId: user.dealId,
            page: 1,
        });
        return {
            status: 'success',
        };
    }
};
tslib_1.__decorate([
    rest_1.post('/users'),
    rest_1.response(200, {
        description: 'Users model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Users) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Users, {
                    title: 'NewUsers',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/users'),
    rest_1.response(200, {
        description: 'Array of Users model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.Users, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Users)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.get('/users/{id}'),
    rest_1.response(200, {
        description: 'Users model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Users, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Users, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.get('/users/{id}/start-sync'),
    rest_1.response(204, {
        description: 'User Start Sync',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "startSyncById", null);
UsersController = tslib_1.__decorate([
    tslib_1.__param(0, core_1.service(gist_producer_1.GistProducer)),
    tslib_1.__param(1, repository_1.repository(repositories_1.UsersRepository)),
    tslib_1.__param(2, core_1.service(services_1.PipedriveService)),
    tslib_1.__metadata("design:paramtypes", [gist_producer_1.GistProducer,
        repositories_1.UsersRepository,
        services_1.PipedriveService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map