import { createAction } from 'redux-actions';

import * as authService from '../../services/auth';

export const LOGIN = 'LOGIN';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';

export const login = createAction(
	LOGIN,
	authService.login
);
