import { Employees } from '@/domain/entities';

export interface ListEmployeesByEmailRepository {
  findByEmail(email: string): ListEmployeesByEmailRepository.Result;
}

export namespace ListEmployeesByEmailRepository {
  export type Result = Promise<Employees>;
}
