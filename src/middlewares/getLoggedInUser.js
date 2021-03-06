import HttpStatus from 'http-status-codes';
import * as userService from 'services/user';
import {
  isEmpty
} from 'lodash';
import {
  ROLE
} from 'constants/role'

/*
 |--------------------------------------------------------------------------
 | Middleware for token verification
 |--------------------------------------------------------------------------
 */
export async function getLoggedInUserDetails(req, res, next) {
  if (!req.currentUser.id) {
    return res.status(HttpStatus.UNAUTHORIZED).send({
      message: 'Invalid Token'
    });
  }

  let user = await userService.findById(req.currentUser.id);

  if (isEmpty(user)) {
    return res.status(HttpStatus.NOT_FOUND).send({
      message: 'Invalid Token'
    });
  }
  req.currentUser = user[0];
  return next();
};

export async function authorizeAdminAccessOnly(req, res, next) {
  console.log("req.file ",req.file)
  if (req.currentUser.role !== ROLE.ADMIN) {
    return res
      .status(HttpStatus.FORBIDDEN)
      .send(HttpStatus.getStatusText(HttpStatus.FORBIDDEN));
  } else {
    return next();
  }
};
