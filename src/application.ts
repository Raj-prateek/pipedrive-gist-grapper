import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import {
  ConsumersBooter,
  MessageHandlerErrorBehavior,
  QueueComponent,
  RabbitmqBindings,
  RabbitmqComponent,
  RabbitmqComponentConfig,
} from 'loopback-rabbitmq';
import path from 'path';
import {CustomComponent} from './custom-components';
import {MongodbDataSource} from './datasources';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class GistGrapperApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.dataSource(
      new MongodbDataSource({
        name: 'mongodb',
        connector: 'mongodb',
        url: process.env.DB_URL,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        useNewUrlParser: true,
      }),
    );

    this.configure<RabbitmqComponentConfig>(RabbitmqBindings.COMPONENT).to({
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
        retries: 0, // number of retries, 0 is forever
        interval: 1500, // retry interval in ms
      },
      defaultConsumerErrorBehavior: MessageHandlerErrorBehavior.ACK,
      prefetchCount: 10,
      exchanges: [
        {
          name: process.env.RABBITMQ_EXCHANGE ?? '',
          type: 'direct',
          queues: [
            {
              routingKey: process.env.RABBITMQ_QUEUE ?? '',
              queue: process.env.RABBITMQ_QUEUE,
              allowNonJsonMessages: true,
            },
          ],
        },
        {
          name: process.env.RABBITMQ_EXCHANGE_PIPEDRIVE ?? '',
          type: 'direct',
          queues: [
            {
              routingKey: process.env.RABBITMQ_QUEUE_PIPEDRIVE ?? '',
              queue: process.env.RABBITMQ_QUEUE_PIPEDRIVE,
              allowNonJsonMessages: true,
            },
          ],
        },
      ],
    });

    this.component(RabbitmqComponent);
    this.booters(ConsumersBooter);
    this.component(QueueComponent);
    this.component(CustomComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      consumers: {
        dirs: ['consumers'],
        extensions: ['.consumer.js'],
        nested: true,
      },
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
