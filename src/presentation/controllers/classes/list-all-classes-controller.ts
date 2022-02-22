import { ListAllClasses } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { serverError, ok } from '@/utils/response';

export class ListAllClassesController implements Controller {
  constructor(private readonly listAllClasses: ListAllClasses) {}

  async handle(httpRequest: Controller.Request): Controller.Response {
    try {
      const { busesId } = httpRequest.token.bus;

      const periods = await this.listAllClasses.findAll({
        busesId: busesId,
      });

      return ok('Listagem das turmas disponíveis', periods);
    } catch (error: any) {
      switch (error.message) {
        default:
          return serverError(error);
      }
    }
  }
}
