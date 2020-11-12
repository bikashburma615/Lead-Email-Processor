import db from 'db';
import Model from './model';
import userSchema from 'schemas/user';
import collectionModels from 'constants/models';

/**
 * User model representing user entity.
 */
class User extends Model {
  /**
   * This constructs the user model with predefined CRUD operations.
   */
  constructor() {
    const model = db.model(
      collectionModels.USER,
      userSchema
    );

    super(model);
  }

  /**
   * This method fetch user by username.
   *
   * @param {String} username
   * 
   * @returns {Promise}
   */
  findByUsername(username) {
    return this.model.get({ username });
  }

  /**
   * This method fetch user by id.
   *
   * @param {String} id
   * 
   * @returns {Promise}
   */
  findById(id) {
    return this.model.scan({id}).exec()
  }
}

export default new User();
