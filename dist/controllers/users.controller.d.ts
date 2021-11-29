import { Filter, FilterExcludingWhere } from '@loopback/repository';
import { Users } from '../models';
import { GistProducer } from '../producers/gist.producer';
import { UsersRepository } from '../repositories';
export declare class UsersController {
    private gistProducer;
    usersRepository: UsersRepository;
    constructor(gistProducer: GistProducer, usersRepository: UsersRepository);
    create(users: Omit<Users, 'id'>): Promise<Users>;
    find(filter?: Filter<Users>): Promise<Users[]>;
    findById(id: string, filter?: FilterExcludingWhere<Users>): Promise<Users>;
    startSyncById(id: string): Promise<{
        status: string;
    }>;
}
