import { CreateStudents } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { makeError } from '@/utils';
import { conflict, created, notFound, serverError } from '@/utils/response';

export class CreateStudentsController implements Controller {
  constructor(private readonly createStudents: CreateStudents) {}

  async handle(httpRequest: Controller.Request): Controller.Response {
    try {
      const params = httpRequest.body;

      const result = await this.createStudents.create(params);

      return created('O aluno foi cadastrado com sucesso!', result);
    } catch (error: any) {
      switch (error.message) {
        case 'CLASSES_NOT_EXIST':
          return notFound(
            'Ops! A turma não foi encontrada',
            makeError('classes_id', 'A turma não foi encontrada'),
          );
        default:
          return serverError(error);
      }
    }
  }
}
