"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const cron_1 = require("@loopback/cron");
const repository_1 = require("@loopback/repository");
const producers_1 = require("../producers");
const repositories_1 = require("../repositories");
let CronService = class CronService extends cron_1.CronJob {
    constructor(usersRepository, gistProducer) {
        super({
            name: 'sync-gists',
            onTick: async () => {
                const users = await usersRepository.find({
                    order: ['lastSyncAt asc'],
                });
                for (const user in users) {
                    users[user].lastSyncedAt = new Date().toString();
                    await this.usersRepository.save(users[user]);
                    await this.gistProducer.fetchGist({
                        userName: users[user].userName,
                        date: new Date(),
                        userId: users[user].id,
                        dealId: users[user].dealId,
                        page: 1,
                    });
                }
            },
            cronTime: '0 */12 * * *',
            start: true,
            runOnInit: true,
        });
        this.usersRepository = usersRepository;
        this.gistProducer = gistProducer;
    }
};
CronService = tslib_1.__decorate([
    cron_1.cronJob(),
    tslib_1.__param(0, repository_1.repository(repositories_1.UsersRepository)),
    tslib_1.__param(1, core_1.service(producers_1.GistProducer)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UsersRepository,
        producers_1.GistProducer])
], CronService);
exports.CronService = CronService;
//# sourceMappingURL=cron.service.js.map