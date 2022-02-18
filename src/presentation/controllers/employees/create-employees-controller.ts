import { CreateEmployees } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { makeError } from '@/utils';
import { conflict, created, notFound, serverError } from '@/utils/response';

export class CreateEmployeesController implements Controller {
  constructor(private readonly createEmployees: CreateEmployees) {}

  async handle(httpRequest: Controller.Request): Controller.Response {
    try {
      const params = httpRequest.body;

      const result = await this.createEmployees.create(params);

      return created('O funcionário foi cadastrado com sucesso!', result);
    } catch (error: any) {
      switch (error.message) {
        case 'EMPLOYEES_TYPES_NOT_FOUND':
          return notFound(
            'Ops! O tipo de funcionário informado não foi encontrado',
            makeError(
              'employees_type_id',
              'O tipo de funcionário informado não foi encontrado',
            ),
          );
        case 'BUSES_NOT_FOUND':
          return notFound(
            'Ops! O ônibus não foi encontrado',
            makeError('buses_id', 'O ônibus não foi encontrado'),
          );
        case 'EMAIL_IS_USE':
          return conflict(
            'O funcionário já se encontra cadastrado',
            makeError('email', 'O funcionário já está cadastrado'),
          );
        default:
          return serverError(error);
      }
    }
  }
}
