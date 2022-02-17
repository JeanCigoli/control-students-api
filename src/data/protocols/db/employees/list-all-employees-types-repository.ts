import { EmployeesType } from '@/domain/entities';

export interface ListAllEmployeesTypesRepository {
  findAll(): ListAllEmployeesTypesRepository.Result;
}

export namespace ListAllEmployeesTypesRepository {
  export type Result = Promise<EmployeesType[]>;
}
