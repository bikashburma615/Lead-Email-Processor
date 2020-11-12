import validate from 'utils/validate';

/**
 * Middleware to validate a schema against request body.
 *
 * @param {Object} validationSchema The schema to validate against.
 * @returns {Promise}
 */
export function validateRequest(validationSchema) {
  return async (req, _, next) => {
    try {
      const sanitizedBody = await validate(req.body, validationSchema);

      req.body = sanitizedBody;
      next();
    } catch (error) {
      next(error);
    }
  };
}
