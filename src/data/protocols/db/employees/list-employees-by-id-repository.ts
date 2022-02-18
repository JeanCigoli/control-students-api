import { Employees } from '@/domain/entities';

export interface ListEmployeesByIdRepository {
  findById(id: number | string): ListEmployeesByIdRepository.Result;
}

export namespace ListEmployeesByIdRepository {
  export type Result = Promise<Employees>;
}
