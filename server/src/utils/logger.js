import 'winston-daily-rotate-file';

import fs from 'fs';
import path from 'path';
import config from 'config';
import winston, { format } from 'winston';
import * as store from '@leapfrogtechnology/async-store';

// Use LOG_DIR from env
const LOG_DIR = config.logging.path;
const LOG_LEVEL = config.logging.level;

const isFileLogTransportEnabled =
  config.logging.enableFileLogTransport === 'TRUE';

// Create log directory if it does not exist
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

// logFormat used for console logging
const logFormat = format.printf((info) => {
  const formattedNamespace = info.metadata.namespace
    ? info.metadata.namespace
    : '';

  // TODO: Will there be a situation when requestID would be empty string?
  // May logs before middleware initialization?
  const requestID = store.getShortId();
  const formattedReqID = requestID ? requestID : '';

  return `${info.timestamp} [${info.level}] [${info.label}] [${formattedReqID}] [${formattedNamespace}]: ${info.message}`;
});

/**
 * Create a new winston logger.
 */
const logger = winston.createLogger({
  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // Format the metadata object
    format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
    logFormat
  ),
  transports: setupTransports(),
});

/**
 * Creates a child logger with namespace for logging.
 *
 * @param {String} namespace
 * @returns {Object}
 */
logger.withNamespace = function (namespace) {
  return logger.child({ namespace });
};

/**
 * Setup transports for winston.
 *
 * @returns {Array}
 */
function setupTransports() {
  const transports = [];

  transports.push(
    new winston.transports.Console({
      format: format.combine(format.colorize()),
      level: 'info',
    })
  );
  if (isFileLogTransportEnabled) {
    transports.push(
      new winston.transports.DailyRotateFile({
        format: format.combine(format.timestamp(), format.json()),
        maxFiles: config.logging.retentionPeriod,
        level: LOG_LEVEL,
        dirname: LOG_DIR,
        datePattern: 'YYYY-MM-DD',
        filename: '%DATE%-debug.log',
      })
    );
  }

  return transports;
}

export const logStream = {
  /**
   * A writable stream for winston logger.
   *
   * @param {any} message
   */
  write(message) {
    logger.info(message.toString());
  },
};

export default logger;
