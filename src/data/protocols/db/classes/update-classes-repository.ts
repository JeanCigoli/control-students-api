import { Classes } from '@/domain/entities';

export interface UpdateClassesRepository {
  update(
    params: UpdateClassesRepository.Params,
    id: string | number,
  ): UpdateClassesRepository.Result;
}

export namespace UpdateClassesRepository {
  export type Params = Partial<Classes>;

  export type Result = Promise<number>;
}
