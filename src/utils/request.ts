import { checkResponse } from './checkResponse';
export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const WS__FEED_URL = 'wss://norma.nomoreparties.space/orders/all';

export function request(endpoint: string, options: RequestInit = {}): Promise<any> {
  const url = `${BASE_URL}${endpoint}`;
  return fetch(url, options).then(checkResponse);
}
