import { Router } from 'express';

import * as contentController from 'controllers/content';
import {verifyAccessToken} from 'middlewares/tokenManager';
import {getLoggedInUserDetails, authorizeAdminAccessOnly} from 'middlewares/getLoggedInUser';

import Multer from 'multer';
const multer = Multer();

const router = Router();


/**
 * POST /api/contents
 */
router.post(
  '/',
  verifyAccessToken,
  contentController.create
);

/**
 * POST /api/contents
 */
router.get(
  '/',
  verifyAccessToken,
  getLoggedInUserDetails,
  authorizeAdminAccessOnly,
  contentController.findAll
);

/**
 * POST /api/contents
 */
router.get(
  '/available',
  verifyAccessToken,
  contentController.getAvailableContent
);

/**
 * POST /api/users
 */
router.put(
  '/:id',
  verifyAccessToken,
  contentController.updateContent
);

/**
 * POST /api/contents/upload
 */
router.post(
  '/upload',
  verifyAccessToken,
  getLoggedInUserDetails,
  authorizeAdminAccessOnly,
  multer.single('file'),
  contentController.uploadXlsxFile
);

export default router;
