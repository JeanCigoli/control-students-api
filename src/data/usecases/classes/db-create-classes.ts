import {
  CreateClassesRepository,
  ListBusesByIdRepository,
  ListClassesByIdRepository,
  ListPeriodsByIdRepository,
} from '@/data/protocols/db';
import { CreateClasses } from '@/domain/usecases';

export class DbCreateClasses implements CreateClasses {
  constructor(
    private readonly listPeriodsByIdRepository: ListPeriodsByIdRepository,
    private readonly listBusesByIdRepository: ListBusesByIdRepository,
    private readonly listClassesByIdRepository: ListClassesByIdRepository,
    private readonly createClassesRepository: CreateClassesRepository,
  ) {}

  async create(params: CreateClasses.Params): CreateClasses.Result {
    const periodsExist = await this.listPeriodsByIdRepository.findById(
      params.periodId,
    );

    if (!periodsExist) {
      throw new Error('PERIODS_NOT_EXIST');
    }

    const busExist = await this.listBusesByIdRepository.findById(
      params.busesId,
    );

    if (!busExist) {
      throw new Error('BUSES_NOT_EXIST');
    }

    const [classesId] = await this.createClassesRepository.create({
      name: params.name,
      busesId: busExist.busesId,
      periodId: periodsExist.periodsId,
    });

    const classes = await this.listClassesByIdRepository.findById(classesId);

    const { periodId } = params;

    return {
      externalId: classes.externalId,
      name: classes.name,
      busesId: busExist.externalId,
      periodId,
    };
  }
}
