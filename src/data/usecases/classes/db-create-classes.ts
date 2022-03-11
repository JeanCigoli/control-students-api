import {
  CreateClassesRepository,
  ListBusesByIdRepository,
  ListClassesByIdRepository,
  ListClassesTypeByIdRepository,
  ListPeriodsByIdRepository,
} from '@/data/protocols/db';
import { CreateClasses } from '@/domain/usecases';

export class DbCreateClasses implements CreateClasses {
  constructor(
    private readonly listPeriodsByIdRepository: ListPeriodsByIdRepository,
    private readonly listBusesByIdRepository: ListBusesByIdRepository,
    private readonly listClassesByIdRepository: ListClassesByIdRepository,
    private readonly listClassesTypeByIdRepository: ListClassesTypeByIdRepository,
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

    const typeExist = await this.listClassesTypeByIdRepository.findById(
      params.classesTypeId,
    );

    if (!typeExist) {
      throw new Error('TYPE_NOT_EXIST');
    }

    const [classesId] = await this.createClassesRepository.create({
      name: params.name,
      busesId: busExist.busesId,
      periodId: periodsExist.periodsId,
      classesTypeId: typeExist.classesTypeId,
    });

    const classes = await this.listClassesByIdRepository.findById(classesId);

    const { periodId, classesTypeId } = params;

    return {
      externalId: classes.externalId,
      name: classes.name,
      busesId: busExist.externalId,
      classesTypeId,
      periodId,
    };
  }
}
