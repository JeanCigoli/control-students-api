import { Employees } from '@/domain/entities';

export interface CreateEmployeesRepository {
  create(
    params: CreateEmployeesRepository.Params,
  ): CreateEmployeesRepository.Result;
}

export namespace CreateEmployeesRepository {
  export type Params = Pick<
    Employees,
    'name' | 'email' | 'password' | 'busesId' | 'employeesTypeId'
  >;

  export type Result = Promise<number[]>;
}
