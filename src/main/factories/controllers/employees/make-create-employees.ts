import { DbCreateEmployees } from '@/data/usecases';
import { BcryptAdapter } from '@/infra/cryptography';
import {
  BusesRepository,
  EmployeesRepository,
  EmployeesTypesRepository,
} from '@/infra/db/mysql';
import { CreateEmployeesController } from '@/presentation/controllers';

export const makeCreateEmployees = () => {
  const busesRepository = new BusesRepository();
  const employeesRepository = new EmployeesRepository();
  const employeesTypesRepository = new EmployeesTypesRepository();

  const salt = 10;
  const bcryptAdapter = new BcryptAdapter(salt);

  const dbCreateEmployees = new DbCreateEmployees(
    busesRepository,
    employeesTypesRepository,
    employeesRepository,
    employeesRepository,
    employeesRepository,
    bcryptAdapter,
  );

  return new CreateEmployeesController(dbCreateEmployees);
};
