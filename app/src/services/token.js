export const setAccessToken = (accessToken) => {
	localStorage.setItem('accessToken', accessToken);
}

export const getAccessToken = () => {
	localStorage.getItem('accessToken');
}

export const setRefreshToken = (refreshToken) => {
	localStorage.setItem('refreshToken', refreshToken);
}

export const getRefreshToken = () => {
	localStorage.getItem('refreshToken');
}

export const clear = () => {
	localStorage.clear();
}