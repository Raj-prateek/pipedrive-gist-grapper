"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApplication = void 0;
const testlab_1 = require("@loopback/testlab");
const __1 = require("../..");
async function setupApplication() {
    const restConfig = testlab_1.givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
    });
    const app = new __1.GistGrapperApplication({
        rest: restConfig,
    });
    await app.boot();
    await app.start();
    const client = testlab_1.createRestAppClient(app);
    return { app, client };
}
exports.setupApplication = setupApplication;
//# sourceMappingURL=test-helper.js.map