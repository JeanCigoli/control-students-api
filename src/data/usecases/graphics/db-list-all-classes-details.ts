import {
  CountStudentsByClassesRepository,
  ListAllClassesByBusRepository,
} from '@/data/protocols/db';
import { ListAllClassesDetails } from '@/domain/usecases';

export class DbListAllClassesDetails implements ListAllClassesDetails {
  constructor(
    private readonly listAllClassesByBusRepository: ListAllClassesByBusRepository,
    private readonly countStudentsByClassesRepository: CountStudentsByClassesRepository,
  ) {}

  async findAll(
    params: ListAllClassesDetails.Params,
  ): ListAllClassesDetails.Result {
    const classes = await this.listAllClassesByBusRepository.findAllByBus(
      params.busesId,
    );

    const result = await Promise.all(
      classes.map(async (value) => {
        const students = await this.countStudentsByClassesRepository.count({
          classesId: [value.classesId],
        });

        return {
          externalId: value.externalId,
          name: value.name,
          period: value.period,
          students: students ? students.count : 0,
        };
      }),
    );

    return result;
  }
}
