import { Classes } from '@/domain/entities';

export interface CreateClassesRepository {
  create(
    params: CreateClassesRepository.Params,
  ): CreateClassesRepository.Result;
}

export namespace CreateClassesRepository {
  export type Params = Omit<Classes, 'classesId' | 'externalId'>;

  export type Result = Promise<number[]>;
}
