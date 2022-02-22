import { Classes } from '@/domain/entities';

export interface ListClassesByIdRepository {
  findById(id: number | string): ListClassesByIdRepository.Result;
}

export namespace ListClassesByIdRepository {
  export type Result = Promise<Classes>;
}
