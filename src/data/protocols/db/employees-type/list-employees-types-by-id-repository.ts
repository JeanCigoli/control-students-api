import { EmployeesType } from '@/domain/entities';

export interface ListEmployeesTypesByIdRepository {
  findById(id: number | string): ListEmployeesTypesByIdRepository.Result;
}

export namespace ListEmployeesTypesByIdRepository {
  export type Result = Promise<EmployeesType>;
}
