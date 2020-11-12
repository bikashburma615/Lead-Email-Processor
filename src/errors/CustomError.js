import BaseError from './error';

/**
 * Error class for Custom error.
 */
class CustomError extends BaseError {
  /**
   * Constructor for CustomError.
   *
   * @param {String} message
   * @param {Number} code
   * @param {String} details
   *
   * @returns {CustomError}
   */
  constructor(message, code, details = '') {
    super(message);
    this.name = 'CustomError';
    this.code = code;
    this.details = details;
  }

  /**
   * Returns the formatted string representation of error.
   *
   * @returns {String}
   */
  toString() {
    return `Custom Error: ${this.message}`;
  }
}

export default CustomError;
