import { Router } from 'express';

import * as userController from 'controllers/user';
import { validateRequest } from 'middlewares/requestValidator';
import { create } from 'validators/userValidator';

const router = Router();


/**
 * POST /api/users
 */
router.post(
  '/',
  validateRequest(create),
  userController.create
);

export default router;
