import { Filter, FilterExcludingWhere } from '@loopback/repository';
import { Users } from '../models';
import { GistProducer } from '../producers/gist.producer';
import { UsersRepository } from '../repositories';
import { PipedriveService } from '../services';
export declare class UsersController {
    private gistProducer;
    usersRepository: UsersRepository;
    private pipedriveService;
    constructor(gistProducer: GistProducer, usersRepository: UsersRepository, pipedriveService: PipedriveService);
    create(users: Omit<Users, 'id'>): Promise<Users>;
    find(filter?: Filter<Users>): Promise<Users[]>;
    findById(id: string, filter?: FilterExcludingWhere<Users>): Promise<Users>;
    startSyncById(id: string): Promise<{
        status: string;
    }>;
}
