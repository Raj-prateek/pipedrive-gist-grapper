/* eslint-disable @typescript-eslint/naming-convention */
import {service} from '@loopback/core';
import {Octokit} from '@octokit/core';
import {rabbitConsume} from 'loopback-rabbitmq';
import {PipedriveProducer} from '../producers';
import {FetchGistMessage, GistProducer} from '../producers/gist.producer';

interface ResponseGist {
  id: string;
  html_url: string;
  description: string;
}

export class GistSyncConsumer {
  PER_PAGE_LIMIT = 1;

  constructor(
    @service(PipedriveProducer)
    private pipedriveProducer: PipedriveProducer,
    @service(GistProducer)
    private gistProducer: GistProducer,
  ) {}

  @rabbitConsume({
    exchange: process.env.RABBITMQ_EXCHANGE ?? '',
    routingKey: process.env.RABBITMQ_QUEUE ?? '',
    queue: process.env.RABBITMQ_QUEUE,
  })
  async handle(message: FetchGistMessage) {
    const octokit = new Octokit({auth: process.env.GITHUB_TOKEN});
    const gists = await octokit.request(
      `GET /users/${message.userName}/gists`,
      {
        per_page: this.PER_PAGE_LIMIT,
        page: message.page,
      },
    );
    const {data} = gists;
    // TO-DO: we can also add retry for failed request

    data.forEach((gist: ResponseGist) => {
      return this.pipedriveProducer.createActivity({
        gist: {
          id: gist.id,
          htmlURL: gist.html_url,
          description: gist.description,
        },
        dealID: message.dealId,
      });
    });

    if (data.length === this.PER_PAGE_LIMIT) {
      await this.gistProducer.fetchGist({...message, page: message.page + 1});
      return;
    }
  }
}
