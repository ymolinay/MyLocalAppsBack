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
import {AppDetail} from '../models';
import {AppDetailRepository} from '../repositories';

export class AppDetailController {
  constructor(
    @repository(AppDetailRepository)
    public appDetailRepository : AppDetailRepository,
  ) {}

  @post('/app-details')
  @response(200, {
    description: 'AppDetail model instance',
    content: {'application/json': {schema: getModelSchemaRef(AppDetail)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppDetail, {
            title: 'NewAppDetail',
            exclude: ['id'],
          }),
        },
      },
    })
    appDetail: Omit<AppDetail, 'id'>,
  ): Promise<AppDetail> {
    return this.appDetailRepository.create(appDetail);
  }

  @get('/app-details/count')
  @response(200, {
    description: 'AppDetail model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AppDetail) where?: Where<AppDetail>,
  ): Promise<Count> {
    return this.appDetailRepository.count(where);
  }

  @get('/app-details')
  @response(200, {
    description: 'Array of AppDetail model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AppDetail, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AppDetail) filter?: Filter<AppDetail>,
  ): Promise<AppDetail[]> {
    return this.appDetailRepository.find(filter);
  }

  @patch('/app-details')
  @response(200, {
    description: 'AppDetail PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppDetail, {partial: true}),
        },
      },
    })
    appDetail: AppDetail,
    @param.where(AppDetail) where?: Where<AppDetail>,
  ): Promise<Count> {
    return this.appDetailRepository.updateAll(appDetail, where);
  }

  @get('/app-details/{id}')
  @response(200, {
    description: 'AppDetail model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AppDetail, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AppDetail, {exclude: 'where'}) filter?: FilterExcludingWhere<AppDetail>
  ): Promise<AppDetail> {
    return this.appDetailRepository.findById(id, filter);
  }

  @patch('/app-details/{id}')
  @response(204, {
    description: 'AppDetail PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppDetail, {partial: true}),
        },
      },
    })
    appDetail: AppDetail,
  ): Promise<void> {
    await this.appDetailRepository.updateById(id, appDetail);
  }

  @put('/app-details/{id}')
  @response(204, {
    description: 'AppDetail PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() appDetail: AppDetail,
  ): Promise<void> {
    await this.appDetailRepository.replaceById(id, appDetail);
  }

  @del('/app-details/{id}')
  @response(204, {
    description: 'AppDetail DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.appDetailRepository.deleteById(id);
  }
}
