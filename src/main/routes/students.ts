import { Router } from 'express';
import { adaptRoute, adaptMiddleware } from '../adapters';
import {
  makeCreateStudents,
  makeListAllStudents,
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
};
