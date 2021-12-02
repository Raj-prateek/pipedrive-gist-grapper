import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {GistsLogs, GistsLogsRelations} from '../models';

export class GistsLogsRepository extends DefaultCrudRepository<
  GistsLogs,
  typeof GistsLogs.prototype.id,
  GistsLogsRelations
> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(GistsLogs, dataSource);
  }
}
