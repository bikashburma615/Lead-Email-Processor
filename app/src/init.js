import { http } from './utils/http';
import * as interceptors from './utils/interceptor';

const initInterceptors = () => {
	http.interceptors.request.use(interceptors.authorizationInterceptor);

	http.interceptors.response.use(
		response => response,
		interceptors.unauthorizedResponseHandler
	);
}

export default () => {
	initInterceptors();
}