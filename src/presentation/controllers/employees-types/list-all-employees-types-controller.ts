import { ListAllEmployeesTypes } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { serverError, ok } from '@/utils/response';

export class ListAllEmployeesTypesController implements Controller {
  constructor(private readonly listAllEmployeesTypes: ListAllEmployeesTypes) {}

  async handle(_: Controller.Request): Controller.Response {
    try {
      const periods = await this.listAllEmployeesTypes.findAll();

      return ok('Listagem dos tipos de funcionários disponíveis', periods);
    } catch (error: any) {
      switch (error.message) {
        default:
          return serverError(error);
      }
    }
  }
}
