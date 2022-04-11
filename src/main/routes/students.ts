import { Router } from 'express';
import { adaptRoute, adaptMiddleware } from '../adapters';
import {
  makeCreateStudents,
  makeDeleteStudents,
  makeListAllStudents,
  makeUpdateStudents,
} from '../factories/controllers';
import { makeAuthMiddleware } from '../factories/middlewares';

export default (router: Router) => {
  router.post(
    '/students',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeCreateStudents()),
  );

  router.get(
    '/students',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeListAllStudents()),
  );

  router.put(
    '/students/:student_id',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeUpdateStudents()),
  );

  router.delete(
    '/students/:student_id',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeDeleteStudents()),
  );
};
