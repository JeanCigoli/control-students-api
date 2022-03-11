import { ListAllClassesType } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { serverError, ok } from '@/utils/response';

export class ListAllClassesTypeController implements Controller {
  constructor(private readonly listAllClassesType: ListAllClassesType) {}

  async handle(_: Controller.Request): Controller.Response {
    try {
      const classesType = await this.listAllClassesType.findAll();

      return ok('Listagem dos tipos de turmas disponíveis', classesType);
    } catch (error: any) {
      switch (error.message) {
        default:
          return serverError(error);
      }
    }
  }
}
