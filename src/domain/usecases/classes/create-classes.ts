import { Classes } from '@/domain/entities';

export interface CreateClasses {
  create(params: CreateClasses.Params): CreateClasses.Result;
}

export namespace CreateClasses {
  export type Params = Omit<
    Classes,
    'classesId' | 'externalId' | 'createdAt' | 'deletedAt'
  >;

  export type Result = Promise<
    Omit<Classes, 'classesId' | 'createdAt' | 'deletedAt'>
  >;
}
