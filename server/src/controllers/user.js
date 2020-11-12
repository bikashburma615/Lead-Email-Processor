import HttpStatus from 'http-status-codes';

import * as userService from 'services/user';
import helper from 'utils/helper'; 

/**
 * Create a new campaign.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function create(req, res, next) {
  const savePayLoad = req.body;

  try {
    savePayLoad.password = await helper.hashPassword(savePayLoad.password);
    const data = await userService.upsert(savePayLoad);

    res.status(HttpStatus.CREATED).json({ data });
  } catch (err) {
    next(err);
  }
}
