import { ListAllBuses } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { serverError, ok } from '@/utils/response';

export class ListAllBusesController implements Controller {
  constructor(private readonly listAllBuses: ListAllBuses) {}

  async handle(_: Controller.Request): Controller.Response {
    try {
      const buses = await this.listAllBuses.findAll();

      return ok('Listagem de ônibus cadastrados', buses);
    } catch (error: any) {
      switch (error.message) {
        default:
          return serverError(error);
      }
    }
  }
}
