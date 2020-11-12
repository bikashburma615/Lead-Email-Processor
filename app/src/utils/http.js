import axios from 'axios';

import config from '../config';

/**
 * Http Utility.
 */
const http = axios.create({
  baseURL: config.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshTokenHttp = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export { http, refreshTokenHttp };
