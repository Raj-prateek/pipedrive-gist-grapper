import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { GistsLogs, GistsLogsRelations } from '../models';
export declare class GistsLogsRepository extends DefaultCrudRepository<GistsLogs, typeof GistsLogs.prototype.id, GistsLogsRelations> {
    constructor(dataSource: MongodbDataSource);
}
