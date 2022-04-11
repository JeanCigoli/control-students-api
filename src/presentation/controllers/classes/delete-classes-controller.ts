import { DeleteClasses } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { makeError } from '@/utils';
import { ok, notFound, serverError } from '@/utils/response';

export class DeleteClassesController implements Controller {
  constructor(private readonly deleteClasses: DeleteClasses) {}

  async handle(httpRequest: Controller.Request): Controller.Response {
    try {
      const { classesId } = httpRequest.params;

      await this.deleteClasses.delete({
        classesId: classesId,
      });

      return ok('A turma foi excluída com sucesso!', {});
    } catch (error: any) {
      switch (error.message) {
        case 'CLASSES_NOT_FOUND':
          return notFound(
            'Ops! A turma não foi encontrada',
            makeError('students_id', 'A turma não foi encontrada'),
          );
        default:
          return serverError(error);
      }
    }
  }
}
