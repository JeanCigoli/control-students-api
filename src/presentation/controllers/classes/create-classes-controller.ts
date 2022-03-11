import { CreateClasses } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { makeError } from '@/utils';
import { created, notFound, serverError } from '@/utils/response';

export class CreateClassesController implements Controller {
  constructor(private readonly createClasses: CreateClasses) {}

  async handle(httpRequest: Controller.Request): Controller.Response {
    try {
      const { name, periodId, classesTypeId } = httpRequest.body;
      const { busesId } = httpRequest.token.bus;

      const result = await this.createClasses.create({
        name,
        periodId,
        busesId,
        classesTypeId,
      });

      return created('A turma foi cadastrada com sucesso!', result);
    } catch (error: any) {
      switch (error.message) {
        case 'PERIODS_NOT_EXIST':
          return notFound(
            'Ops! O período informado não foi encontrado',
            makeError('period_id', 'O período informado não foi encontrado'),
          );
        case 'BUSES_NOT_EXIST':
          return notFound(
            'Ops! O ônibus não foi encontrado',
            makeError('buses_id', 'O ônibus não foi encontrado'),
          );
        case 'TYPE_NOT_EXIST':
          return notFound(
            'Ops! O tipo da turma não foi encontrado',
            makeError('classes_type_id', 'O tipo da turma não foi encontrado'),
          );
        default:
          return serverError(error);
      }
    }
  }
}
