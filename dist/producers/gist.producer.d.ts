import { RabbitmqProducer } from 'loopback-rabbitmq';
export interface FetchGistMessage {
    userName: string;
    date: Date;
    userId: string;
    dealId: number;
    page: number;
}
export declare class GistProducer {
    private rabbitmqProducer;
    constructor(rabbitmqProducer: RabbitmqProducer);
    fetchGist(fetchGistMessage: FetchGistMessage): Promise<void>;
}
