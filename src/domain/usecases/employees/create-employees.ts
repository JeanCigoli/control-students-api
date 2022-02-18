import { Employees } from '@/domain/entities';

export interface CreateEmployees {
  create(params: CreateEmployees.Params): CreateEmployees.Result;
}

export namespace CreateEmployees {
  export type Params = Pick<
    Employees,
    'name' | 'email' | 'password' | 'busesId' | 'employeesTypeId'
  >;

  export type Result = Promise<
    Omit<Employees, 'deletedAt' | 'password' | 'employeesId'>
  >;
}
