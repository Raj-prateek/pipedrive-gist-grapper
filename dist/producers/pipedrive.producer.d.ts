import { RabbitmqProducer } from 'loopback-rabbitmq';
interface Gist {
    id: string;
    htmlURL: string;
    description: string;
}
interface GistMessage {
    gist: Gist;
    dealID: number;
}
export declare class PipedriveProducer {
    private rabbitmqProducer;
    constructor(rabbitmqProducer: RabbitmqProducer);
    createActivity(gistMsg: GistMessage): Promise<void>;
}
export {};
