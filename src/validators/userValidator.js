import BaseJoi from '@hapi/joi';
import Extension from '@hapi/joi-date';

import {
  ROLE
} from 'constants/role';

const Joi = BaseJoi.extend(Extension);

const create = Joi.object({
  username: Joi.string().label('Username').trim().min(1).required(),
  role: Joi.string().label('User role').valid(ROLE.ADMIN, ROLE.USER).trim().min(1).required(),
  password: Joi.string().label('User password').trim().min(1).required()
});

export {
  create
};
