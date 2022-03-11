import { Router } from 'express';
import { adaptMiddleware, adaptRoute } from '../adapters';
import { makeListAllStudentsAndVacancies } from '../factories/controllers';
import { makeListAllClassesDetails } from '../factories/controllers/graphics/make-list-all-classes-details';
import { makeAuthMiddleware } from '../factories/middlewares';

export default (router: Router) => {
  router.get(
    '/graphics/students',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeListAllStudentsAndVacancies()),
  );

  router.get(
    '/graphics/classes',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeListAllClassesDetails()),
  );
};
