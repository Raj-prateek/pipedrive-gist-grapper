import {service} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {repository} from '@loopback/repository';
import {GistProducer} from '../producers';
import {UsersRepository} from '../repositories';

@cronJob()
export class CronService extends CronJob {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @service(GistProducer)
    private gistProducer: GistProducer,
  ) {
    super({
      name: 'sync-gists',
      onTick: async () => {
        const users = await usersRepository.find({
          order: ['lastSyncAt asc'],
        });
        for (const user in users) {
          users[user].lastSyncedAt = new Date().toString();
          await this.usersRepository.save(users[user]);
          await this.gistProducer.fetchGist({
            userName: users[user].userName,
            date: new Date(),
            userId: users[user].id,
            dealId: users[user].dealId,
            page: 1,
          });
        }
      },
      cronTime: '0 */12 * * *',
      start: true,
      runOnInit: true,
    });
  }
}
