import { checkResponse } from './checkResponse';
export const BASE_URL = 'https://norma.nomoreparties.space/api';
export const WS__ALL_FEED_URL = 'wss://norma.nomoreparties.space/orders/all';
export const WS__USER_FEED_URL = 'wss://norma.nomoreparties.space/orders';

export function request(endpoint: string, options: RequestInit = {}): Promise<any> {
  const url = `${BASE_URL}${endpoint}`;
  return fetch(url, options).then(checkResponse);
}
