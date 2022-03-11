import { ListAllStudentsAndVacancies } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { serverError, ok } from '@/utils/response';

export class ListAllStudentsAndVacanciesController implements Controller {
  constructor(
    private readonly listAllStudentsAndVacancies: ListAllStudentsAndVacancies,
  ) {}

  async handle(httpRequest: Controller.Request): Controller.Response {
    try {
      const { busesId } = httpRequest.token.bus;

      const students = await this.listAllStudentsAndVacancies.findAll({
        busesId,
      });

      return ok('Listagem do detalhes de alunos ativos', students);
    } catch (error: any) {
      switch (error.message) {
        default:
          return serverError(error);
      }
    }
  }
}
