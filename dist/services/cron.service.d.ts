import { CronJob } from '@loopback/cron';
import { GistProducer } from '../producers';
import { UsersRepository } from '../repositories';
export declare class CronService extends CronJob {
    usersRepository: UsersRepository;
    private gistProducer;
    constructor(usersRepository: UsersRepository, gistProducer: GistProducer);
}
