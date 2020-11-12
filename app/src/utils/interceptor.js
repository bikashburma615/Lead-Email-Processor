import HttpStatus from 'http-status';

import { http } from './http';
import * as authService from '../services/auth';
import * as tokenService from '../services/token';

let heldRequests = [];
let isTokenBeingRefreshed = false;

const getAuthorizationHeader = (accessToken) => {
	return `Bearer ${accessToken}`;
}

export const authorizationInterceptor = (request) => {
	const accessToken = tokenService.getAccessToken();

	if (accessToken && !request.headers['Authorization']) {
		request.headers['Authorization'] = getAuthorizationHeader(accessToken);
	}

	return request;
}

export const unauthorizedResponseHandler = async (error) => {
	if (!error.response) {
		return Promise.reject(error);
	}

	const originalRequest = error.config;
	const path = originalRequest.url;

	const isUnAuthorized = error.response.status === HttpStatus.UNAUTHORIZED &&
		path !== '/login';

	if (isUnAuthorized) {
		const refreshToken = tokenService.getRefreshToken();

		if (!refreshToken) {
			tokenService.clear();

			return redirectToLogin();
		}

		if (isTokenBeingRefreshed) {
			try {
				const newAccessToken = await holdRequest();

				originalRequest.headers['Authorization'] = getAuthorizationHeader(newAccessToken);

				return http.request(originalRequest);
			} catch (error) {
				return Promise.reject(error);
			}
		}

		isTokenBeingRefreshed = true;

		try {
			const { accessToken } = await authService.refresh(refreshToken);

			isTokenBeingRefreshed = false;
			tokenService.setAccessToken(accessToken);
			originalRequest.headers['Authorization'] = getAuthorizationHeader(accessToken);

			releaseHeldRequests(null, accessToken);

			return http.request(originalRequest);
		} catch(error) {
			releaseHeldRequests(error, null);
			if(error.response && error.response.status === HttpStatus.UNAUTHORIZED) {
				tokenService.clear();

				redirectToLogin();
			}
		}
	}
}

const releaseHeldRequests = (error, accessToken = null) => {
	heldRequests.forEach(promise => {
		if(error) {
			promise.reject(error);
		} else {
			promise.resolve(accessToken);
		}
	});
	heldRequests = []
}

const holdRequest = () => {
	return new Promise((resolve, reject) => {
		heldRequests.push({ resolve, reject });
	});
}

export const redirectToLogin = () => {
	window.location.href = '/login';
}