import { GistMessage } from '../producers';
export declare class PipedriveService {
    defaultClient: any;
    apiToken: any;
    activitiesAPIInstance: any;
    dealsAPIInstance: any;
    constructor();
    addActivity(message: GistMessage): Promise<void>;
    addDeal(userName: string): Promise<any>;
}
