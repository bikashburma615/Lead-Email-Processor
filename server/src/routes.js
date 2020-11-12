import { Router } from 'express';

import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import contentRoutes from './routes/content';
// import imageRoutes from './routes/image';
// import emojiRoutes from './routes/emojis';
import swaggerSpec from './utils/swagger';
// import campaignRoutes from './routes/campaign';
// import categoryRoutes from './routes/category';
// import { validateCurrentUser } from 'middlewares/validate';
// import appreciationTypesRoutes from './routes/appreciationType';

/**
 * Contains public API routes for the application.
 */
const route = Router();

/**
 * GET /api/swagger.json
 */
route.get('/swagger.json', (_, res) => {
  res.json(swaggerSpec);
});

/**
 * GET /api
 */
route.get('/', (req, res) => {
  res.json({
    app: req.app.locals.title,
    apiVersion: req.app.locals.version,
  });
});

route.use('/users', userRoutes);
route.use('/auth', authRoutes);
route.use('/contents', contentRoutes);

export { route };
