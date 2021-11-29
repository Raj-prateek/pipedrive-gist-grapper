import { PipedriveProducer } from '../producers';
import { FetchGistMessage, GistProducer } from '../producers/gist.producer';
export declare class GistSyncConsumer {
    private pipedriveProducer;
    private gistProducer;
    PER_PAGE_LIMIT: number;
    constructor(pipedriveProducer: PipedriveProducer, gistProducer: GistProducer);
    handle(message: FetchGistMessage): Promise<void>;
}
