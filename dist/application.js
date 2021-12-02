"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GistGrapperApplication = void 0;
const tslib_1 = require("tslib");
const boot_1 = require("@loopback/boot");
const core_1 = require("@loopback/core");
const cron_1 = require("@loopback/cron");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const loopback_rabbitmq_1 = require("loopback-rabbitmq");
const path_1 = tslib_1.__importDefault(require("path"));
const custom_components_1 = require("./custom-components");
const datasources_1 = require("./datasources");
const sequence_1 = require("./sequence");
const services_1 = require("./services");
class GistGrapperApplication extends boot_1.BootMixin(service_proxy_1.ServiceMixin(repository_1.RepositoryMixin(rest_1.RestApplication))) {
    constructor(options = {}) {
        var _a, _b, _c, _d;
        super(options);
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.dataSource(new datasources_1.MongodbDataSource({
            name: 'mongodb',
            connector: 'mongodb',
            url: process.env.DB_URL,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            useNewUrlParser: true,
        }));
        this.configure(loopback_rabbitmq_1.RabbitmqBindings.COMPONENT).to({
            options: {
                protocol: 'amqp',
                hostname: process.env.RABBITMQ_HOST,
                port: 5672,
                username: process.env.RABBITMQ_USERNAME,
                password: process.env.RABBITMQ_PASSWORD,
                vhost: process.env.RABBITMQ_VHOST,
            },
            // configurations below are optional, (Default values)
            producer: {
                idleTimeoutMillis: 10000,
            },
            consumer: {
                retries: 0,
                interval: 1500, // retry interval in ms
            },
            defaultConsumerErrorBehavior: loopback_rabbitmq_1.MessageHandlerErrorBehavior.ACK,
            prefetchCount: 10,
            exchanges: [
                {
                    name: (_a = process.env.RABBITMQ_EXCHANGE) !== null && _a !== void 0 ? _a : '',
                    type: 'direct',
                    queues: [
                        {
                            routingKey: (_b = process.env.RABBITMQ_QUEUE) !== null && _b !== void 0 ? _b : '',
                            queue: process.env.RABBITMQ_QUEUE,
                        },
                    ],
                },
                {
                    name: (_c = process.env.RABBITMQ_EXCHANGE_PIPEDRIVE) !== null && _c !== void 0 ? _c : '',
                    type: 'direct',
                    queues: [
                        {
                            routingKey: (_d = process.env.RABBITMQ_QUEUE_PIPEDRIVE) !== null && _d !== void 0 ? _d : '',
                            queue: process.env.RABBITMQ_QUEUE_PIPEDRIVE,
                        },
                    ],
                },
            ],
        });
        this.component(loopback_rabbitmq_1.RabbitmqComponent);
        this.booters(loopback_rabbitmq_1.ConsumersBooter);
        this.component(loopback_rabbitmq_1.QueueComponent);
        this.component(custom_components_1.CustomComponent);
        this.component(cron_1.CronComponent);
        const jobBinding = core_1.createBindingFromClass(services_1.CronService);
        this.add(jobBinding);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
}
exports.GistGrapperApplication = GistGrapperApplication;
//# sourceMappingURL=application.js.map