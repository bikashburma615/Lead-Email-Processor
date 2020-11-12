import * as env from './checkEnv';
import HttpStatus from 'http-status-codes';
import { Error as MongooseError } from 'mongoose';
import * as store from '@leapfrogtechnology/async-store';

import TokenError from 'errors/token';
import CustomError from 'errors/CustomError';
import ForbiddenError from 'errors/forbidden';
import ValidationError from 'errors/validation';
import NotFoundError from 'errors/NotFoundError';
import AuthenticationError from 'errors/authentication';
import ServiceUnavailableError from 'errors/ServiceUnavailableError';

/**
 * Build error response for validation errors.
 *
 * @param   {Error} err
 * @returns {Object}
 */
function buildError(err) {
  const requestID = store.getShortId();

  // Validation errors
  if (err.isJoi) {
    const response = {
      id: requestID,
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
    };

    if (env.isDev()) {
      response.details =
        err.details &&
        err.details.map((err) => {
          return {
            message: err.message,
            param: err.path.join('.'),
          };
        });
    }

    return response;
  }

  // client payload verification error by mongoose schema.
  if (err instanceof MongooseError.ValidationError) {
    const response = {
      id: requestID,
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
    };

    if (env.isDev()) {
      response.details = Object.entries(err.errors).map((value) => {
        return {
          field: value[0],
          message: value[1].message,
          kind: value[1].kind,
        };
      });
    }

    return response;
  }

  // implicit cast error of mongoose
  if (err instanceof MongooseError.CastError) {
    const response = {
      id: requestID,
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
    };

    if (env.isDev()) {
      response.details = err.message;
    }

    return response;
  }

  // duplication error in schema
  if (err.name === 'MongoError' && err.code === 11000) {
    const response = {
      id: requestID,
      code: HttpStatus.CONFLICT,
      message:
        HttpStatus.getStatusText(HttpStatus.CONFLICT) + ': duplicate entries.',
    };

    if (env.isDev()) {
      response.details = err.message;
    }

    return response;
  }

  // HTTP errors
  if (err.isBoom) {
    return {
      id: requestID,
      code: err.output.statusCode,
      message: err.output.payload.message || err.output.payload.error,
    };
  }

  // axios errors
  if (err.isAxiosError) {
    return {
      id: requestID,
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
    };
  }

  // Custom errors
  if (err.isCustom) {
    if (err instanceof TokenError || err instanceof AuthenticationError) {
      return {
        id: requestID,
        code: HttpStatus.UNAUTHORIZED,
        message:
          err.message || HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
      };
    }

    if (err instanceof ForbiddenError) {
      return {
        id: requestID,
        code: HttpStatus.FORBIDDEN,
        message: err.message || HttpStatus.getStatusText(HttpStatus.FORBIDDEN),
      };
    }

    if (err instanceof ValidationError) {
      return {
        id: requestID,
        code: HttpStatus.BAD_REQUEST,
        message:
          err.message || HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
      };
    }

    if (err instanceof ServiceUnavailableError) {
      return {
        id: requestID,
        code: HttpStatus.SERVICE_UNAVAILABLE,
        message:
          err.message ||
          HttpStatus.getStatusText(HttpStatus.SERVICE_UNAVAILABLE),
      };
    }

    if (err instanceof NotFoundError) {
      return {
        id: requestID,
        code: HttpStatus.NOT_FOUND,
        message: err.message || HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
      };
    }

    if (err instanceof CustomError) {
      return {
        id: requestID,
        code: err.code || HttpStatus.BAD_REQUEST,
        message:
          err.message || HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
        details: err.details,
      };
    }

    return {
      id: requestID,
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message:
        err.message ||
        HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
    };
  }

  // Return INTERNAL_SERVER_ERROR for all other cases
  return {
    id: requestID,
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
  };
}

export default buildError;
