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
import {Application} from '../models';
import {ApplicationRepository} from '../repositories';
import {AppDetailRepository} from '../repositories';

export class ApplicationController {
  constructor(
    @repository(ApplicationRepository)
    public applicationRepository : ApplicationRepository,
    @repository(AppDetailRepository)
    public appDetailRepository: AppDetailRepository,
  ) {}

  @post('/applications')
  @response(200, {
    description: 'Application model instance',
    content: {'application/json': {schema: getModelSchemaRef(Application)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Application, {
            title: 'NewApplication',
            exclude: ['id'],
          }),
        },
      },
    })
    application: Omit<Application, 'id'>,
  ): Promise<Application> {
    return this.applicationRepository.create(application);
  }

  @get('/applications/count')
  @response(200, {
    description: 'Application model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Application) where?: Where<Application>,
  ): Promise<Count> {
    return this.applicationRepository.count(where);
  }

  @get('/applications')
  @response(200, {
    description: 'Array of Application model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Application, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Application) filter?: Filter<Application>,
  ): Promise<Application[]> {
    return this.applicationRepository.find(filter);
  }

  @patch('/applications')
  @response(200, {
    description: 'Application PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Application, {partial: true}),
        },
      },
    })
    application: Application,
    @param.where(Application) where?: Where<Application>,
  ): Promise<Count> {
    return this.applicationRepository.updateAll(application, where);
  }

  @get('/applications/{id}')
  @response(200, {
    description: 'Application model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Application, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Application, {exclude: 'where'}) filter?: FilterExcludingWhere<Application>
  ): Promise<Application> {

    const application = await this.applicationRepository.findById(id, filter);
    // const appDetails = await this.appDetailRepository.findOne({ where: { appId: id } });

    // return { ...application, details: appDetails };

    return application;
  }

  @patch('/applications/{id}')
  @response(204, {
    description: 'Application PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Application, {partial: true}),
        },
      },
    })
    application: Application,
  ): Promise<void> {
    await this.applicationRepository.updateById(id, application);
  }

  @put('/applications/{id}')
  @response(204, {
    description: 'Application PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() application: Application,
  ): Promise<void> {
    await this.applicationRepository.replaceById(id, application);
  }

  @del('/applications/{id}')
  @response(204, {
    description: 'Application DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.applicationRepository.deleteById(id);
  }
}
