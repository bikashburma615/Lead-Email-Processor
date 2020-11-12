import BaseJoi from '@hapi/joi';
import Extension from '@hapi/joi-date';

const Joi = BaseJoi.extend(Extension);

const login = Joi.object({
  username: Joi.string().label('Username').trim().min(1).required(),
  password: Joi.string().label('User password').trim().min(1).required()
});

export {
  login
};
