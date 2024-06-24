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
import {Drawer} from '../models';
import {DrawerRepository} from '../repositories';

export class DrawerController {
  constructor(
    @repository(DrawerRepository)
    public drawerRepository : DrawerRepository,
  ) {}

  @post('/drawers')
  @response(200, {
    description: 'Drawer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Drawer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Drawer, {
            title: 'NewDrawer',
            
          }),
        },
      },
    })
    drawer: Drawer,
  ): Promise<Drawer> {
    return this.drawerRepository.create(drawer);
  }

  @get('/drawers/count')
  @response(200, {
    description: 'Drawer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Drawer) where?: Where<Drawer>,
  ): Promise<Count> {
    return this.drawerRepository.count(where);
  }

  @get('/drawers')
  @response(200, {
    description: 'Array of Drawer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Drawer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Drawer) filter?: Filter<Drawer>,
  ): Promise<Drawer[]> {
    return this.drawerRepository.find(filter);
  }

  @patch('/drawers')
  @response(200, {
    description: 'Drawer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Drawer, {partial: true}),
        },
      },
    })
    drawer: Drawer,
    @param.where(Drawer) where?: Where<Drawer>,
  ): Promise<Count> {
    return this.drawerRepository.updateAll(drawer, where);
  }

  @get('/drawers/{id}')
  @response(200, {
    description: 'Drawer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Drawer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Drawer, {exclude: 'where'}) filter?: FilterExcludingWhere<Drawer>
  ): Promise<Drawer> {
    return this.drawerRepository.findById(id, filter);
  }

  @patch('/drawers/{id}')
  @response(204, {
    description: 'Drawer PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Drawer, {partial: true}),
        },
      },
    })
    drawer: Drawer,
  ): Promise<void> {
    await this.drawerRepository.updateById(id, drawer);
  }

  @put('/drawers/{id}')
  @response(204, {
    description: 'Drawer PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() drawer: Drawer,
  ): Promise<void> {
    await this.drawerRepository.replaceById(id, drawer);
  }

  @del('/drawers/{id}')
  @response(204, {
    description: 'Drawer DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.drawerRepository.deleteById(id);
  }
}
