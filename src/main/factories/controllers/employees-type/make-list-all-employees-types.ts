import { DbListAllEmployeesTypes } from '@/data/usecases';
import { EmployeesTypesRepository } from '@/infra/db/mysql';
import { ListAllEmployeesTypesController } from '@/presentation/controllers';

export const makeListAllEmployeesTypes = () => {
  const employeesTypesRepository = new EmployeesTypesRepository();

  const dbListAllEmployeesTypes = new DbListAllEmployeesTypes(
    employeesTypesRepository,
  );

  return new ListAllEmployeesTypesController(dbListAllEmployeesTypes);
};
