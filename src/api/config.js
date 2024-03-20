import axios from 'axios';

import { store } from '../redux'

const ROOT_URL = 'https://chatapp.alphanitesofts.net';
const IMAGE_URL = 'https://chatappimages.alphanitesofts.net'

const BASE_URL = `${ROOT_URL}/api`;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  async (config) => {
    const requestConfig = config;
    const { authenticationToken } = store.getState().userSession;
    if (authenticationToken) {
      requestConfig.headers = {
        'Authorization': `Bearer ${authenticationToken}`,
      };
    }
    return requestConfig;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export {
  ROOT_URL,
  BASE_URL,
  client,
  IMAGE_URL
};
