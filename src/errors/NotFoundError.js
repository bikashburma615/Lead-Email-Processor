import BaseError from './error';

/**
 * Error class for Not found error.
 */
class NotFoundError extends BaseError {
  /**
   * Constructor for NotFoundError.
   *
   * @param {String} message
   * @param {Number} code
   *
   * @returns {NotFoundError}
   */
  constructor(message, code) {
    super(message);
    this.name = 'NotFoundError';
    this.code = code;
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

export default NotFoundError;
