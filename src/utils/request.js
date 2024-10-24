import { checkResponse } from './checkResponse';
export const BASE_URL = 'https://norma.nomoreparties.space/api';

export function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  return fetch(url, options).then(checkResponse);
}
