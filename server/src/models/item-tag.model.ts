import {Entity, model, property} from '@loopback/repository';

@model()
export class ItemTag extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  label: string;


  constructor(data?: Partial<ItemTag>) {
    super(data);
  }
}

export interface ItemTagRelations {
  // describe navigational properties here
}

export type ItemTagWithRelations = ItemTag & ItemTagRelations;
