import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: false,
    mongodb: {schema: 'gist_grapper'}, // custom names
  },
})
export class Users extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  userName: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
  })
  lastSyncedAt?: string;

  @property({
    type: 'number',
  })
  dealId: number;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
