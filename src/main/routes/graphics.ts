import { Router } from 'express';
import { adaptMiddleware, adaptRoute } from '../adapters';
import { makeListAllStudentsAndVacancies } from '../factories/controllers';
import { makeAuthMiddleware } from '../factories/middlewares';

export default (router: Router) => {
  router.get(
    '/graphics/students',
    adaptMiddleware(makeAuthMiddleware()),
    adaptRoute(makeListAllStudentsAndVacancies()),
  );
};
