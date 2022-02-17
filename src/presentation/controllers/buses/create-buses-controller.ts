import { CreateBuses } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { makeError } from '@/utils';
import { conflict, created, serverError } from '@/utils/response';

export class CreateBusesController implements Controller {
  constructor(private readonly createBuses: CreateBuses) {}

  async handle(httpRequest: Controller.Request): Controller.Response {
    try {
      const params = httpRequest.body;

      const result = await this.createBuses.create(params);

      return created('O ônibus foi cadastrado com sucesso!', result);
    } catch (error: any) {
      switch (error.message) {
        case 'BUS_EXIST':
          return conflict(
            'O ônibus já se encontra cadastrado',
            makeError(
              'code',
              'O código do veículo já está cadastrado em um ônibus',
            ),
          );
        default:
          return serverError(error);
      }
    }
  }
}
