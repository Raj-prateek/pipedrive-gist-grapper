"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GistSyncConsumer = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/naming-convention */
const core_1 = require("@loopback/core");
const core_2 = require("@octokit/core");
const loopback_rabbitmq_1 = require("loopback-rabbitmq");
const producers_1 = require("../producers");
const gist_producer_1 = require("../producers/gist.producer");
let GistSyncConsumer = class GistSyncConsumer {
    constructor(pipedriveProducer, gistProducer) {
        this.pipedriveProducer = pipedriveProducer;
        this.gistProducer = gistProducer;
        this.PER_PAGE_LIMIT = 1;
    }
    async handle(message) {
        const octokit = new core_2.Octokit({ auth: process.env.GITHUB_TOKEN });
        const gists = await octokit.request(`GET /users/${message.userName}/gists`, {
            per_page: this.PER_PAGE_LIMIT,
            page: message.page,
        });
        const { data } = gists;
        // TO-DO: we can also add retry for failed request
        data.forEach((gist) => {
            return this.pipedriveProducer.createActivity({
                gist: {
                    id: gist.id,
                    htmlURL: gist.html_url,
                    description: gist.description,
                },
                dealID: message.dealId,
            });
        });
        if (data.length === this.PER_PAGE_LIMIT) {
            await this.gistProducer.fetchGist({ ...message, page: message.page + 1 });
            return;
        }
    }
};
tslib_1.__decorate([
    loopback_rabbitmq_1.rabbitConsume({
        exchange: (_a = process.env.RABBITMQ_EXCHANGE) !== null && _a !== void 0 ? _a : '',
        routingKey: (_b = process.env.RABBITMQ_QUEUE) !== null && _b !== void 0 ? _b : '',
        queue: process.env.RABBITMQ_QUEUE,
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GistSyncConsumer.prototype, "handle", null);
GistSyncConsumer = tslib_1.__decorate([
    tslib_1.__param(0, core_1.service(producers_1.PipedriveProducer)),
    tslib_1.__param(1, core_1.service(gist_producer_1.GistProducer)),
    tslib_1.__metadata("design:paramtypes", [producers_1.PipedriveProducer,
        gist_producer_1.GistProducer])
], GistSyncConsumer);
exports.GistSyncConsumer = GistSyncConsumer;
//# sourceMappingURL=gist-sync.consumer.js.map