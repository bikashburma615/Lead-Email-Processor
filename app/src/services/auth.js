import { http, refreshTokenHttp } from '../utils/http';

export const refresh = async (refreshToken) => {
	const url = '/refresh-token';
	const { data } = await refreshTokenHttp.post(url, { refreshToken });

	return data;
}

export const login = async (email, password)=>{
	const url = `/auth/login`;
	const response = await http.post(url, {email, password})

	return response.data.data;
}