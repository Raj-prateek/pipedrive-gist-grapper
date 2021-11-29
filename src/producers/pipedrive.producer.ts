import {inject} from '@loopback/core';
import {RabbitmqBindings, RabbitmqProducer} from 'loopback-rabbitmq';

interface Gist {
  id: string;
  htmlURL: string;
  description: string;
}

interface GistMessage {
  gist: Gist;
  dealID: number;
}

export class PipedriveProducer {
  constructor(
    @inject(RabbitmqBindings.RABBITMQ_PRODUCER)
    private rabbitmqProducer: RabbitmqProducer,
  ) {}

  async createActivity(gistMsg: GistMessage) {
    await this.rabbitmqProducer.publish(
      process.env.RABBITMQ_EXCHANGE_PIPEDRIVE ?? '',
      process.env.RABBITMQ_QUEUE_PIPEDRIVE ?? '',
      Buffer.from(JSON.stringify(gistMsg)),
    );
    return;
  }
}
