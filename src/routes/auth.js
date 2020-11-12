import { Router } from 'express';

import * as authController from 'controllers/auth';
import { validateRequest } from 'middlewares/requestValidator';
import {verifyRefreshToken} from 'middlewares/tokenManager';
import { login } from 'validators/authValidator';

const router = Router();


/**
 * POST /api/auth/login
 */
router.post(
  '/login',
  validateRequest(login),
  authController.login
);

/**
 * POST /api/auth/login
 */
router.post(
  '/access-token',
  verifyRefreshToken,
  authController.createNewToken
);

/**
 * POST /api/auth/logout
 */
router.post(
  '/logout',
  authController.logout
);

export default router;
