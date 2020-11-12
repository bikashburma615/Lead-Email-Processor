import logger from 'utils/logger';
import User from 'models/user';
import helper from 'utils/helper';
import {v1} from 'uuid';

const log = logger.withNamespace('services.user');

/**
 * Create a new user.
 *
 * @param {Object} payload
 *
 * @returns {Promise}
 */
export async function upsert(payload) {
  try {
    log.info(`Creating new user.`);
    payload.id= v1();
    console.log("payload ", payload)
    const result = await User.save(payload);

    log.info(`User created with id: ${result.id}`);

    return result;
  } catch (err) {
    log.error(`Could not create new user: ${err}`);

    throw err;
  }
}

/**
 * Find user by username.
 *
 * @param {String} username
 *
 * @returns {Promise}
 */
export async function findByUsername(username) {
  try {
    log.info(`Finding user by username.`);
    
    return User.findByUsername(username);
  } catch (err) {
    log.error(`Some error while finding new user: ${err}`);

    throw err;
  }
}

/**
 * Find user by id.
 *
 * @param {String} id
 *
 * @returns {Promise}
 */
export async function findById(id) {
  try {
    log.info(`Finding user by id.`);
    
    let user = await User.findById(id);
    
    return user.toJSON()
  } catch (err) {
    log.error(`Some error while finding new user: ${err}`);

    throw err;
  }
}


/**
 * Generate token for logged in user.
 *
 * @param {Object} user
 *
 * @returns {Promise}
 */
export async function generateToken(user) {
    let refreshToken = helper.generateRefreshToken({ id: user.id });
    let accessToken = helper.generateAccessToken({ id: user.id });
    // let updateddata = await User.updateRefreshToken(user.username, refreshToken);

    // console.log("updated ", updateddata)
    return { accessToken, refreshToken }
}

// /**
//  * Logged out user.
//  *
//  * @param {Object} user
//  * @param {Object} user
//  * @param {Object} user
//  *
//  * @returns {Promise}
//  */
// export async function logout(user) {
//   let refreshToken = helper.generateRefreshToken({ id: user._id });
//   let accessToken = helper.generateAccessToken({ id: user._id });
//   console.log("refresh token ", refreshToken, accessToken)
//   await User.updateRefreshToken(user._id, refreshToken);
  
//   return { accessToken, refreshToken }
// }
