import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: false,
    mongodb: {
      collection: 'appDetails',
    },
  },
})
export class AppDetail extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  appId: string;

  @property({
    type: 'number',
    default: 0,
  })
  rating?: number;

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  photos?: string[];

  @property({
    type: 'array',
    itemType: 'string',
    default: [],
  })
  comments?: string[];

  @property({
    type: 'string',
    default: "",
  })
  details?: string;

  @property({
    type: 'string',
    default: "",
  })
  latestNews?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AppDetail>) {
    super(data);
  }
}

export interface AppDetailRelations {
  // describe navigational properties here
}

export type AppDetailWithRelations = AppDetail & AppDetailRelations;
