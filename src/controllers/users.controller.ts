import {service} from '@loopback/core';
import {Filter, FilterExcludingWhere, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Users} from '../models';
import {GistProducer} from '../producers/gist.producer';
import {UsersRepository} from '../repositories';
import {PipedriveService} from '../services';

export class UsersController {
  constructor(
    @service(GistProducer)
    private gistProducer: GistProducer,
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @service(PipedriveService)
    private pipedriveService: PipedriveService,
  ) {}

  @post('/users')
  @response(200, {
    description: 'Users model instance',
    content: {'application/json': {schema: getModelSchemaRef(Users)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUsers',
            exclude: ['id'],
          }),
        },
      },
    })
    users: Omit<Users, 'id'>,
  ): Promise<Users> {
    const dealId = await this.pipedriveService.addDeal(users.userName);
    return this.usersRepository.create({...users, dealId});
  }

  @get('/users')
  @response(200, {
    description: 'Array of Users model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Users, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Users) filter?: Filter<Users>): Promise<Users[]> {
    return this.usersRepository.find(filter);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'Users model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Users, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Users, {exclude: 'where'})
    filter?: FilterExcludingWhere<Users>,
  ): Promise<Users> {
    return this.usersRepository.findById(id, filter);
  }

  @get('/users/{id}/start-sync')
  @response(204, {
    description: 'User Start Sync',
  })
  async startSyncById(@param.path.string('id') id: string) {
    const user = await this.usersRepository.findById(id);
    await this.gistProducer.fetchGist({
      userName: user.userName,
      date: new Date(),
      userId: id,
      dealId: user.dealId,
      page: 1,
    });
    return {
      status: 'success',
    };
  }
}
