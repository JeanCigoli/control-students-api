import { Students } from '@/domain/entities';

export interface CreateStudentsRepository {
  create(
    params: CreateStudentsRepository.Params,
  ): CreateStudentsRepository.Result;
}

export namespace CreateStudentsRepository {
  export type Params = Omit<
    Students,
    'studentsId' | 'createdAt' | 'updatedAt' | 'externalId'
  >;

  export type Result = Promise<number[]>;
}
