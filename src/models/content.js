import db from 'db';
import Model from './model';
import contentSchema from 'schemas/content';
import collectionModels from 'constants/models';

import {CONTENT} from 'constants/content'

import dynamoose from 'dynamoose';

/**
 * User model representing user entity.
 */
class Content extends Model {
  /**
   * This constructs the user model with predefined CRUD operations.
   */
  constructor() {
    const model = db.model(
      collectionModels.CONTENT,
      contentSchema
    );

    super(model);
  } 

  /**
   * This method fetch content by id.
   *
   * @param {String} id
   * 
   * @returns {Promise}
   */
  getById(id) {
    return this.model.scan({ id }).exec();
  }
  
  /**
   * This method fetch content by id.
   * 
   * @returns {Promise}
   */
  getAvailableContent() {
    // return this.model.scan({ actionType: CONTENT.ACTION_TYPE.RELEASE }).exec();
    return this.model.query({ type: 'content', actionType: CONTENT.ACTION_TYPE.RELEASE }).sort("ascending").exec();
  }
  
  /**
   * This method fetch content by id.
   * 
   * @returns {Promise}
   */
  getAllContent() {
    return this.model.scan().exec();
  }
}

export default new Content();
