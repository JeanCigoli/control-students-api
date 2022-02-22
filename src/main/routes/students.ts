import { Router } from 'express';
import { adaptRoute, adaptMiddleware } from '../adapters';
import { makeCreateStudents } from '../factories/controllers';
import { makeAuthMiddleware } from '../factories/middlewares';

export default (router: Router) => {
  router.post(
    '/students',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeCreateStudents()),
  );
};
