import {
  ListClassesByIdRepository,
  UpdateClassesRepository,
  UpdateStudentsByClassesRepository,
} from '@/data/protocols/db';
import { DeleteClasses } from '@/domain/usecases';

export class DbDeleteClasses implements DeleteClasses {
  constructor(
    private readonly listClassesByIdRepository: ListClassesByIdRepository,
    private readonly updateClassesRepository: UpdateClassesRepository,
    private readonly updateStudentsByClassesRepository: UpdateStudentsByClassesRepository,
  ) {}

  async delete(params: DeleteClasses.Params): DeleteClasses.Result {
    const classes = await this.listClassesByIdRepository.findById(
      params.classesId,
    );

    if (!classes) throw new Error('CLASSES_NOT_FOUND');

    await this.updateStudentsByClassesRepository.updateByClasse(
      {
        deletedAt: new Date(),
      },
      classes.classesId,
    );

    await this.updateClassesRepository.update(
      {
        deletedAt: new Date(),
      },
      classes.classesId,
    );
  }
}
