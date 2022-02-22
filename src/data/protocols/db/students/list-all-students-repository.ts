import { Students } from '@/domain/entities';

export interface ListAllStudentsRepository {
  findAll(): ListAllStudentsRepository.Result;
}

export namespace ListAllStudentsRepository {
  export type Result = Promise<Omit<Students, 'deleted_at'>[]>;
}
