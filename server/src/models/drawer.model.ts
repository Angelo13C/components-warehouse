import {Entity, model, property} from '@loopback/repository';

@model()
export class Drawer extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  x: number;

  @property({
    type: 'number',
    required: true,
  })
  y: number;

  @property({
    type: 'number',
    required: true,
  })
  itemId: number;

  @property({
    type: 'number',
    required: true,
  })
  itemCount: number;


  constructor(data?: Partial<Drawer>) {
    super(data);
  }
}

export interface DrawerRelations {
  // describe navigational properties here
}

export type DrawerWithRelations = Drawer & DrawerRelations;
