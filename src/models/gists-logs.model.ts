import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Users} from '.';

@model()
export class GistsLogs extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  gistID: string;

  @property({
    type: 'string',
    required: true,
  })
  htmlURL: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
  })
  created: string;

  @belongsTo(() => Users)
  userId: string;

  constructor(data?: Partial<GistsLogs>) {
    super(data);
  }
}

export interface GistsLogsRelations {
  // describe navigational properties here
  users?: Users;
}

export type GistsLogsWithRelations = GistsLogs & GistsLogsRelations;
