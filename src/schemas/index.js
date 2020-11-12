import { Schema } from 'mongoose';

/**
 * Create a mongoose schema with given options.
 *
 * @param {Object} schema
 * @param {Object} options
 *
 * @returns {Schema}
 */
export function createSchema(schema, options = {}) {
  return new Schema(schema, options);
}
