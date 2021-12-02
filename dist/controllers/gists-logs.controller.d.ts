import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { GistsLogs } from '../models';
import { GistsLogsRepository } from '../repositories';
export declare class GistsLogsController {
    gistsLogsRepository: GistsLogsRepository;
    constructor(gistsLogsRepository: GistsLogsRepository);
    create(gistsLogs: Omit<GistsLogs, 'id'>): Promise<GistsLogs>;
    count(where?: Where<GistsLogs>): Promise<Count>;
    find(filter?: Filter<GistsLogs>): Promise<GistsLogs[]>;
    updateAll(gistsLogs: GistsLogs, where?: Where<GistsLogs>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<GistsLogs>): Promise<GistsLogs>;
    updateById(id: string, gistsLogs: GistsLogs): Promise<void>;
    replaceById(id: string, gistsLogs: GistsLogs): Promise<void>;
    deleteById(id: string): Promise<void>;
}
