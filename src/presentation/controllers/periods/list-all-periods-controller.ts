import { ListAllPeriods } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { serverError, ok } from '@/utils/response';

export class ListAllPeriodsController implements Controller {
  constructor(private readonly listAllPeriods: ListAllPeriods) {}

  async handle(_: Controller.Request): Controller.Response {
    try {
      const periods = await this.listAllPeriods.findAll();

      return ok('Listagem de períodos disponíveis', periods);
    } catch (error: any) {
      switch (error.message) {
        default:
          return serverError(error);
      }
    }
  }
}
