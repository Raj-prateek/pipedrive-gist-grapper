import { Entity } from '@loopback/repository';
export declare class Users extends Entity {
    userName: string;
    id?: string;
    lastSyncedAt?: string;
    dealId: number;
    constructor(data?: Partial<Users>);
}
export interface UsersRelations {
}
export declare type UsersWithRelations = Users & UsersRelations;
