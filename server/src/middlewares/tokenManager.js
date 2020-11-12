import helper from 'utils/helper';
import HttpStatus from 'http-status-codes';

/*
 |--------------------------------------------------------------------------
 | Middleware for token verification
 |--------------------------------------------------------------------------
 */
const verifyAccessToken = (req, res, next) => {
    if (!req.header('Authorization')) {
      return res.status(HttpStatus.UNAUTHORIZED).send({
        message: 'Please make sure your request has an Authorization header'
      });
    }
    let token = req.header('Authorization').split(' ')[1];
    let decryptedToken = null;
    try {
      decryptedToken = helper.verifyAccessToken(token).encrypted;
    } catch (err) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send(HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED));
    }
    console.log("decryptedToken" ,decryptedToken)
    req.currentUser = decryptedToken;
    next();
  };

  /*
 |--------------------------------------------------------------------------
 | Middleware for token verification
 |--------------------------------------------------------------------------
 */
const verifyRefreshToken = (req, res, next) => {
  let token = req.body.refreshToken;
  let decryptedToken = null;

  try {
    decryptedToken = helper.verifyRefreshToken(token).encrypted;
    req.currentUser = decryptedToken;
    next();
  } catch (err) {
    if (err.name !== constant.TOKEN_EXPIRED) {
      next();
    }
    try {
      decryptedToken = helper.decodeApiKey(req.body.refreshToken).encrypted;

      req.currentUser = decryptedToken;
      next();
    } catch (err) {
      next();
    }
  }
};

export {verifyAccessToken, verifyRefreshToken}
