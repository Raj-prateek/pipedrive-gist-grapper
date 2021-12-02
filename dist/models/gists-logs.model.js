"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GistsLogs = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const _1 = require(".");
let GistsLogs = class GistsLogs extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", String)
], GistsLogs.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], GistsLogs.prototype, "gistID", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], GistsLogs.prototype, "htmlURL", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], GistsLogs.prototype, "description", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], GistsLogs.prototype, "created", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => _1.Users),
    tslib_1.__metadata("design:type", String)
], GistsLogs.prototype, "userId", void 0);
GistsLogs = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], GistsLogs);
exports.GistsLogs = GistsLogs;
//# sourceMappingURL=gists-logs.model.js.map