import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {GistsLogs} from '../models';
import {GistsLogsRepository} from '../repositories';

export class GistsLogsController {
  constructor(
    @repository(GistsLogsRepository)
    public gistsLogsRepository: GistsLogsRepository,
  ) {}

  @post('/gists-logs')
  @response(200, {
    description: 'GistsLogs model instance',
    content: {'application/json': {schema: getModelSchemaRef(GistsLogs)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GistsLogs, {
            title: 'NewGistsLogs',
            exclude: ['id'],
          }),
        },
      },
    })
    gistsLogs: Omit<GistsLogs, 'id'>,
  ): Promise<GistsLogs> {
    return this.gistsLogsRepository.create(gistsLogs);
  }

  @get('/gists-logs/count')
  @response(200, {
    description: 'GistsLogs model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(GistsLogs) where?: Where<GistsLogs>,
  ): Promise<Count> {
    return this.gistsLogsRepository.count(where);
  }

  @get('/gists-logs')
  @response(200, {
    description: 'Array of GistsLogs model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(GistsLogs, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(GistsLogs) filter?: Filter<GistsLogs>,
  ): Promise<GistsLogs[]> {
    return this.gistsLogsRepository.find(filter);
  }

  @patch('/gists-logs')
  @response(200, {
    description: 'GistsLogs PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GistsLogs, {partial: true}),
        },
      },
    })
    gistsLogs: GistsLogs,
    @param.where(GistsLogs) where?: Where<GistsLogs>,
  ): Promise<Count> {
    return this.gistsLogsRepository.updateAll(gistsLogs, where);
  }

  @get('/gists-logs/{id}')
  @response(200, {
    description: 'GistsLogs model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GistsLogs, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(GistsLogs, {exclude: 'where'})
    filter?: FilterExcludingWhere<GistsLogs>,
  ): Promise<GistsLogs> {
    return this.gistsLogsRepository.findById(id, filter);
  }

  @patch('/gists-logs/{id}')
  @response(204, {
    description: 'GistsLogs PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GistsLogs, {partial: true}),
        },
      },
    })
    gistsLogs: GistsLogs,
  ): Promise<void> {
    await this.gistsLogsRepository.updateById(id, gistsLogs);
  }

  @put('/gists-logs/{id}')
  @response(204, {
    description: 'GistsLogs PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() gistsLogs: GistsLogs,
  ): Promise<void> {
    await this.gistsLogsRepository.replaceById(id, gistsLogs);
  }

  @del('/gists-logs/{id}')
  @response(204, {
    description: 'GistsLogs DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.gistsLogsRepository.deleteById(id);
  }
}
