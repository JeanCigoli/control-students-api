import {
  CountStudentsByClassesRepository,
  ListAllClassesByBusRepository,
  ListBusesByIdRepository,
} from '@/data/protocols/db';
import { ListAllStudentsAndVacancies } from '@/domain/usecases';
import { CLASSES_TYPE } from '@/utils/enum';

export class DbListAllStudentsAndVacancies
  implements ListAllStudentsAndVacancies
{
  constructor(
    private readonly listBusesByIdRepository: ListBusesByIdRepository,
    private readonly listAllClassesByBusRepository: ListAllClassesByBusRepository,
    private readonly countStudentsByClassesRepository: CountStudentsByClassesRepository,
  ) {}

  async findAll(
    params: ListAllStudentsAndVacancies.Params,
  ): ListAllStudentsAndVacancies.Result {
    const bus = await this.listBusesByIdRepository.findById(params.busesId);

    const classes = await this.listAllClassesByBusRepository.findAllByBus(
      params.busesId,
    );

    const classesSchool = classes.filter(
      (value) => value.classesTypeId === CLASSES_TYPE.SCHOOL,
    );

    const totalVacancies = bus.limitVacancies * classesSchool.length;

    const students = await this.countStudentsByClassesRepository.count({
      classesId: classesSchool.map((value) => value.classesId),
    });

    const limitStudents = students ? +students.count : 0;
    const vacancies = totalVacancies - limitStudents;

    return {
      students: limitStudents,
      vacancies: vacancies > 0 ? vacancies : 0,
    };
  }
}
