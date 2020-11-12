import {
	LOGIN_PENDING,
	LOGIN_REJECTED,
	LOGIN_FULFILLED
} from '../../actions/auth';

import { setRefreshToken, setAccessToken } from '../../services/token';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case LOGIN_FULFILLED:
			setRefreshToken(action.payload.refreshToken);
			setAccessToken(action.payload.accessToken);
			return {...action.payload};

		case LOGIN_PENDING:
		case LOGIN_REJECTED:
			return state;

		default:
			return state;
	}
}