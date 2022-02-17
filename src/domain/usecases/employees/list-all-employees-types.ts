import { EmployeesType } from '@/domain/entities';

export interface ListAllEmployeesTypes {
  findAll(): ListAllEmployeesTypes.Result;
}

export namespace ListAllEmployeesTypes {
  export type Result = Promise<Omit<EmployeesType, 'employeesTypeId'>[]>;
}
