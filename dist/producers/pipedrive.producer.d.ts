import { RabbitmqProducer } from 'loopback-rabbitmq';
interface Gist {
    id: string;
    htmlURL: string;
    description: string;
}
export interface GistMessage {
    gist: Gist;
    dealID: number;
    userID: string;
}
export declare class PipedriveProducer {
    private rabbitmqProducer;
    constructor(rabbitmqProducer: RabbitmqProducer);
    createActivity(gistMsg: GistMessage): Promise<void>;
}
export {};
