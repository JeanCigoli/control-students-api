import { ListAllStudents } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { serverError, ok } from '@/utils/response';

export class ListAllStudentsController implements Controller {
  constructor(private readonly listAllStudents: ListAllStudents) {}

  async handle(httpRequest: Controller.Request): Controller.Response {
    try {
      const { busesId } = httpRequest.token.bus;

      const students = await this.listAllStudents.findAll({
        busesId,
        classesId: httpRequest.query.classesId,
      });

      return ok('Listagem de alunos ativos', students);
    } catch (error: any) {
      switch (error.message) {
        default:
          return serverError(error);
      }
    }
  }
}
