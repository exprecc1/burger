import { BASE_URL } from './request';

// В проектной работе эта функция будет обращаться к серверу
// и обновлять токены если они уже устарели.
const getUser = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({});
    }, 1000);
  });

// Вход и авторизация

const login = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem('accessToken', 'test-token');
      localStorage.setItem('refreshToken', 'test-refresh-token');
      resolve({});
    }, 1000);
  });

const logout = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      resolve();
    }, 1000);
  });

// Регистрация
const register = async (userData) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  const data = await response.json();
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data;
};

// Обновление токенов
const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  const response = await fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Token refresh failed');
  }

  const data = await response.json();
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data;
};

export const api = {
  getUser,
  login,
  logout,
  register,
  refreshToken,
};
