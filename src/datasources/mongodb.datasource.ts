import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './mongodb.datasource.config.json';
import * as prodConfig from './mongodb.datasource.config.production.json';

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'mongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('mongodb.datasources.config', {optional: true})
    dsConfig: object = process.env.NODE_ENV === 'production'
      ? prodConfig
      : config,
  ) {
    super(dsConfig);
  }
}
