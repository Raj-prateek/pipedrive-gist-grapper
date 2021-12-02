import { Entity } from '@loopback/repository';
import { Users } from '.';
export declare class GistsLogs extends Entity {
    id?: string;
    gistID: string;
    htmlURL: string;
    description?: string;
    created: string;
    userId: string;
    constructor(data?: Partial<GistsLogs>);
}
export interface GistsLogsRelations {
    users?: Users;
}
export declare type GistsLogsWithRelations = GistsLogs & GistsLogsRelations;
