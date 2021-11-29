import {inject} from '@loopback/core';
import {RabbitmqBindings, RabbitmqProducer} from 'loopback-rabbitmq';

export interface FetchGistMessage {
  userName: string;
  date: Date;
  userId: string;
  dealId: number;
  page: number;
}

export class GistProducer {
  constructor(
    @inject(RabbitmqBindings.RABBITMQ_PRODUCER)
    private rabbitmqProducer: RabbitmqProducer,
  ) {}

  async fetchGist(fetchGistMessage: FetchGistMessage) {
    await this.rabbitmqProducer.publish(
      process.env.RABBITMQ_EXCHANGE ?? '',
      process.env.RABBITMQ_QUEUE ?? '',
      Buffer.from(JSON.stringify(fetchGistMessage)),
    );
    return;
  }
}
