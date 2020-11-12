import 'app-module-path/register';

import './env';
// import './db';

import dynamoose from 'dynamoose';

import fs from 'fs';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import compression from 'compression';
import * as Sentry from '@sentry/node';
import * as store from '@leapfrogtechnology/async-store';

import config from './config';
import json from 'middlewares/json';
import logger, { logStream } from 'utils/logger';
import { route } from 'routes';
import * as errorHandler from 'middlewares/errorHandler';

// Initialize Sentry
// https://docs.sentry.io/platforms/node/express/
Sentry.init({ dsn: config.sentry.DSN });

dynamoose.aws.sdk.config.update({
  "accessKeyId": "AKIAITVWTTUMUS74RS6A",
  "secretAccessKey": "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",
  "region": "us-east-1"
});

const app = express();

const APP_PORT =
  config.node_env === 'test' ? config.test.port : config.app.port;
const APP_HOST = config.app.host;

const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = config.app.name;
app.locals.version = config.app.version;

// This request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// For context propagation of request-response http roundtrip
app.use(store.initializeMiddleware());

app.use(favicon(path.join(__dirname, '/../public', 'favicon.ico')));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('tiny', { stream: logStream }));
app.use(bodyParser.json());
app.use(errorHandler.bodyParser);
app.use(json);

// API Routes
app.use('/api', route);

// Swagger UI
// Workaround for changing the default URL in swagger.json
// https://github.com/swagger-api/swagger-ui/issues/4624
const swaggerIndexContent = fs
  .readFileSync(`${pathToSwaggerUi}/index.html`)
  .toString()
  .replace('https://petstore.swagger.io/v2/swagger.json', '/api/swagger.json');

app.get('/api-docs/index.html', (_, res) => res.send(swaggerIndexContent));
app.get('/api-docs', (_, res) => res.redirect('/api-docs/index.html'));
app.use('/api-docs', express.static(pathToSwaggerUi));

// This error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

// Error Middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

app.listen(app.get('port'), app.get('host'), () => {
  logger.info(
    `Server started at http://${app.get('host')}:${app.get('port')}/api`
  );
});

// Catch unhandled rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled rejection ', err);

  try {
    Sentry.captureException(err);
  } catch (err) {
    logger.error('Sentry error', err);
  } finally {
    process.exit(1);
  }
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception', err);

  try {
    Sentry.captureException(err);
  } catch (err) {
    logger.error('Sentry error', err);
  } finally {
    process.exit(1);
  }
});

export default app;
