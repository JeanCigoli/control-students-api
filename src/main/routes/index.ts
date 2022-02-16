import { Router } from 'express';

export default (router: Router) => {
  router.get('/', (_, res) => {
    return res.json({
      message: 'API is on!',
    });
  });
};
