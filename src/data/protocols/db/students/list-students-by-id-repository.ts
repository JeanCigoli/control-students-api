import { Students } from '@/domain/entities';

export interface ListStudentsByIdRepository {
  findById(id: number | string): ListStudentsByIdRepository.Result;
}

export namespace ListStudentsByIdRepository {
  export type Result = Promise<Students>;
}
