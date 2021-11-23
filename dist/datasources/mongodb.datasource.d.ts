import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class MongodbDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        url: string;
        database: string;
        host: string;
        port: number;
        user: string;
        password: string;
        useNewUrlParser: boolean;
    };
    constructor(dsConfig?: object);
}
