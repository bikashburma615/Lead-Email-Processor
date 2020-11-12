import * as pkg from '../package.json';

const config = {
  node_env: process.env.NODE_ENV || 'development',
  app: {
    name: process.env.APP_NAME || pkg.name,
    version: process.env.APP_VERSION || pkg.version,
    description: process.env.DESCRIPTION || pkg.description,
    port: process.env.PORT || '3000',
    host: process.env.HOST || '0.0.0.0',
  },

  test: {
    port: process.env.TEST_APP_PORT,
  },

  logging: {
    path: process.env.LOG_DIR || '/tmp',
    level: process.env.LOG_LEVEL || 'info',
    retentionPeriod: process.env.LOG_RETENTION_PERIOD || '14d',
    enableFileLogTransport: process.env.ENABLE_FILE_LOG_TRANSPORT,
  },

  sentry: {
    DSN: process.env.SENTRY_DSN,
  },

  mail: {
    MAIL_SERVICE: process.env.MAIL_SERVICE,
    MAILER_EMAIL: process.env.MAILER_EMAIL,
    MAILER_PASSWORD: process.env.MAILER_PASSWORD,
  }
};

export default config;
