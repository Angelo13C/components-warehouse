import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ItemTag, ItemTagRelations} from '../models';

export class ItemTagRepository extends DefaultCrudRepository<
  ItemTag,
  typeof ItemTag.prototype.id,
  ItemTagRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ItemTag, dataSource);
  }
}
