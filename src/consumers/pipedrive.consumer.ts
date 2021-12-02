import {service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {rabbitConsume} from 'loopback-rabbitmq';
import {GistMessage, PipedriveProducer} from '../producers';
import {GistsLogsRepository} from '../repositories';
import {PipedriveService} from '../services';

export class PipedriveConsumer {
  constructor(
    @service(PipedriveProducer)
    private pipedriveProducer: PipedriveProducer,
    @service(PipedriveService)
    private pipedriveService: PipedriveService,
    @repository(GistsLogsRepository)
    public gistsLogsRepository: GistsLogsRepository,
  ) {}

  @rabbitConsume({
    exchange: process.env.RABBITMQ_EXCHANGE_PIPEDRIVE ?? '',
    routingKey: process.env.RABBITMQ_QUEUE_PIPEDRIVE ?? '',
    queue: process.env.RABBITMQ_QUEUE_PIPEDRIVE,
  })
  async handle(message: GistMessage) {
    try {
      await this.pipedriveService.addActivity(message);
      await this.gistsLogsRepository.create({
        gistID: message.gist.id,
        htmlURL: message.gist.htmlURL,
        description: message.gist.description,
        userId: message.userID,
        created: new Date().toString(),
      });
    } catch (e) {
      console.error(e);
      await this.pipedriveProducer.createActivity(message);
    }
  }
}
