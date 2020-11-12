const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const accessTokenSecretKey = 'ABC_DEF_GHI';
const accessTokenDuration = '100m';
const refreshTokenSecretKey = 'ABC_DEF_GHI';
const refreshTokenDuration = '1d';

class helper {
    constructor() {
    }

    hashPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds)
                .then(function (hash) {
                    return resolve(hash)
                })
                .catch(err => reject(err));
        })
    }

    comparePassword(password, existingPassword = '$2b$10$4DzvQVytzCWnpQsEeVPJl.k2GEsjVZs82PEEUdY7SA2XjJ4g3RKqq') {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, existingPassword)
                .then(function (res) {
                    return resolve(res)
                })
                .catch(err => reject(err));
        })
    }

    generateAccessToken(data) {
        return jwt.sign({ encrypted: data }, accessTokenSecretKey, { expiresIn: accessTokenDuration });
    }

    generateRefreshToken(data) {
        return jwt.sign({ encrypted: data }, refreshTokenSecretKey, { expiresIn: refreshTokenDuration });
    }

    verifyAccessToken(token) {
        return jwt.verify(token, accessTokenSecretKey);
    }

    verifyRefreshToken(token) {
        return jwt.verify(token, refreshTokenSecretKey);
    }
}

module.exports = new helper();