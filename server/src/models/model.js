import { clamp } from 'utils/math';
/**
 * Base class that is extended by domain models.
 */
class Model {
  /**
   * This method creates model for services.
   *
   * @param {object} model
   */
  constructor(model) {
    this.model = model;
  }
  /**
   * This method persists the payload object to underlying database.
   *
   * @param {Object} payload
   * @returns {Promise}
   */
  save(payload = {}) {
    return this.model.create(payload);
  }

  /**
   * This method updates the document by its id and passed payload.
   *
   * @param {String} id
   * @param {Object} payload

   * @returns {Promise}
   */
  updateByKey(key, payload) {
    return this.model.update(key, payload);
  }
}

export default Model;
