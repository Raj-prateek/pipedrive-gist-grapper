import { GistMessage, PipedriveProducer } from '../producers';
import { GistsLogsRepository } from '../repositories';
import { PipedriveService } from '../services';
export declare class PipedriveConsumer {
    private pipedriveProducer;
    private pipedriveService;
    gistsLogsRepository: GistsLogsRepository;
    constructor(pipedriveProducer: PipedriveProducer, pipedriveService: PipedriveService, gistsLogsRepository: GistsLogsRepository);
    handle(message: GistMessage): Promise<void>;
}
