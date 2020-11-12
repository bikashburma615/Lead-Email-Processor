import HttpStatus from 'http-status-codes';

import * as userService from 'services/user';
import {
  isEmpty
} from 'lodash';
import NotFoundError from 'errors/NotFoundError';
import {
  en
} from 'lang/en';
import helper from 'utils/helper';

/**
 * Login to user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function login(req, res, next) {
  const {
    username,
    password
  } = req.body;
  try {
    // savePayLoad.password = await helper.hashPassword(savePayLoad.password);
    let user = await userService.findByUsername(username);
    if (isEmpty(user)) {
      throw new NotFoundError(en.USER.USER_NOT_FOUND);
    }
    let match = await helper.comparePassword(password, user.password);
    if (!match) {
      throw new NotFoundError(en.USER.EMAIL_OR_PASSWORD);
    }
    let {
      accessToken,
      refreshToken
    } = await userService.generateToken(user);

    let data = {
      role: user.role,
      email: user.username,
      accessToken,
      refreshToken
    }

    console.log("data ", data)

    res.status(HttpStatus.CREATED).json({
      data
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Logout to user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function logout(req, res, next) {
  try {
    // await userService.logoutUser(req.body.refreshToken, req.currentUser, req.isTokenExpire);
    
    res.status(HttpStatus.OK).json({});
  } catch (err) {
    next(err);
  }
}

/**
 * Logout to user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function createNewToken(req, res, next) {
  try {
    let user = await userService.findById( req.currentUser.id);

    if (isEmpty(user)) {
      throw new NotFoundError(en.USER.USER_NOT_FOUND);
    }

    let {
      accessToken,
      refreshToken
    } = await userService.generateToken(user[0]);

    res.status(HttpStatus.CREATED).json({
      accessToken, refreshToken
    });
  } catch (err) {
    next(err);
  }
}
