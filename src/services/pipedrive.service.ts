/* eslint-disable @typescript-eslint/no-explicit-any */
import * as pipedrive from 'pipedrive';
import {GistMessage} from '../producers';

export class PipedriveService {
  defaultClient: any;
  apiToken: any;
  activitiesAPIInstance: any;
  dealsAPIInstance: any;
  constructor() {
    this.defaultClient = pipedrive.ApiClient.instance;
    this.apiToken = this.defaultClient.authentications.api_key;
    this.apiToken.apiKey = process.env.PIPEDRIVE_TOKEN;
    this.activitiesAPIInstance = new pipedrive.ActivitiesApi();
    this.dealsAPIInstance = new pipedrive.DealsApi();
  }

  async addActivity(message: GistMessage) {
    const opts = pipedrive.ActivityPostObject.constructFromObject({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      deal_id: message.dealID.toString(),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      public_description: message.gist.description,
      subject: message.gist.id,
      type: 'document',
      done: 1,
      note: message.gist.htmlURL,
    });
    await this.activitiesAPIInstance.addActivity(opts);
    return;
  }

  async addDeal(userName: string) {
    const opts = pipedrive.NewDeal.constructFromObject({
      title: `Github Username: ${userName}`,
    });
    const deal = await this.dealsAPIInstance.addDeal(opts);
    return deal.data.id;
  }
}
