import { DeleteStudents } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { makeError } from '@/utils';
import { ok, notFound, serverError } from '@/utils/response';

export class DeleteStudentsController implements Controller {
  constructor(private readonly deleteStudents: DeleteStudents) {}

  async handle(httpRequest: Controller.Request): Controller.Response {
    try {
      const { studentId } = httpRequest.params;

      await this.deleteStudents.delete({
        externalId: studentId,
      });

      return ok('O aluno foi excluído com sucesso!', {});
    } catch (error: any) {
      switch (error.message) {
        case 'STUDENT_NOT_FOUND':
          return notFound(
            'Ops! O aluno não foi encontrado',
            makeError('students_id', 'O aluno não foi encontrado'),
          );
        default:
          return serverError(error);
      }
    }
  }
}
