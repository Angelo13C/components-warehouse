import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {ItemTag} from '../models';
import {ItemTagRepository} from '../repositories';

export class ItemTagController {
  constructor(
    @repository(ItemTagRepository)
    public itemTagRepository: ItemTagRepository,
  ) {}

  @post('/item-tags')
  @response(200, {
    description: 'ItemTag model instance',
    content: {'application/json': {schema: getModelSchemaRef(ItemTag)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemTag, {
            title: 'NewItemTag',
          }),
        },
      },
    })
    itemTag: ItemTag,
  ): Promise<ItemTag> {
    let result = await this.itemTagRepository.findOne({
      where: {label: itemTag.label},
    });

    if (result) {
      throw new HttpErrors.BadRequest(
        'A tag with the same label already exists',
      );
    } else {
      return this.itemTagRepository.create(itemTag);
    }
  }

  @get('/item-tags/count')
  @response(200, {
    description: 'ItemTag model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(ItemTag) where?: Where<ItemTag>): Promise<Count> {
    return this.itemTagRepository.count(where);
  }

  @get('/item-tags')
  @response(200, {
    description: 'Array of ItemTag model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ItemTag, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ItemTag) filter?: Filter<ItemTag>,
  ): Promise<ItemTag[]> {
    return this.itemTagRepository.find(filter);
  }

  @patch('/item-tags')
  @response(200, {
    description: 'ItemTag PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemTag, {partial: true}),
        },
      },
    })
    itemTag: ItemTag,
    @param.where(ItemTag) where?: Where<ItemTag>,
  ): Promise<Count> {
    return this.itemTagRepository.updateAll(itemTag, where);
  }

  @get('/item-tags/{id}')
  @response(200, {
    description: 'ItemTag model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ItemTag, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ItemTag, {exclude: 'where'})
    filter?: FilterExcludingWhere<ItemTag>,
  ): Promise<ItemTag> {
    return this.itemTagRepository.findById(id, filter);
  }

  @patch('/item-tags/{id}')
  @response(204, {
    description: 'ItemTag PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemTag, {partial: true}),
        },
      },
    })
    itemTag: ItemTag,
  ): Promise<void> {
    await this.itemTagRepository.updateById(id, itemTag);
  }

  @put('/item-tags/{id}')
  @response(204, {
    description: 'ItemTag PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() itemTag: ItemTag,
  ): Promise<void> {
    await this.itemTagRepository.replaceById(id, itemTag);
  }

  @del('/item-tags/{id}')
  @response(204, {
    description: 'ItemTag DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.itemTagRepository.deleteById(id);
  }
}
