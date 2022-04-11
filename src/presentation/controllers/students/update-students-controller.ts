import { UpdateStudents } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { makeError } from '@/utils';
import { notFound, ok, serverError } from '@/utils/response';

export class UpdateStudentsController implements Controller {
  constructor(private readonly updateStudents: UpdateStudents) {}

  async handle(httpRequest: Controller.Request): Controller.Response {
    try {
      const params = httpRequest.body;
      const { studentId } = httpRequest.params;

      const result = await this.updateStudents.update({
        student: params,
        studentsId: studentId,
      });

      return ok('O aluno foi atualizado com sucesso!', result);
    } catch (error: any) {
      switch (error.message) {
        case 'CLASSES_NOT_EXIST':
          return notFound(
            'Ops! A turma não foi encontrada',
            makeError('classes_id', 'A turma não foi encontrada'),
          );
        case 'STUDENT_NOT_EXIST':
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
