import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Drawer, DrawerRelations} from '../models';

export class DrawerRepository extends DefaultCrudRepository<
  Drawer,
  typeof Drawer.prototype.id,
  DrawerRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Drawer, dataSource);
  }
}
