import { Students } from '@/domain/entities';

export interface UpdateStudentsRepository {
  update(
    params: UpdateStudentsRepository.Params,
    id: string | number,
  ): UpdateStudentsRepository.Result;
}

export namespace UpdateStudentsRepository {
  export type Params = Partial<Students>;

  export type Result = Promise<number>;
}
