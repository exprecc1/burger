import { BASE_URL } from './request';
import { checkResponse } from './checkResponse';

// Типы данных
interface IUserData {
  email: string;
  password: string;
  name?: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface IUserResponse {
  user: {
    email: string;
    name: string;
  };
}

export interface IPasswordResetResponse {
  message: string;
}

// Регистрация
const register = async (userData: IUserData): Promise<ITokenResponse> => {
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

  const data: ITokenResponse = await response.json();
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  startTokenRefreshInterval(); //Запуск таймера
  return data;
};

// Вход
const login = async (credentials: ICredentials): Promise<ITokenResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data: ITokenResponse = await response.json();
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  startTokenRefreshInterval(); //Запуск таймера
  return data;
};

// Выход
const logout = async (): Promise<void> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  clearTokenRefreshInterval(); //очистка таймера
};

//Получение данных пользователя
const getUser = async (): Promise<IUserResponse> => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const response = await fetch(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  const data: IUserResponse = await response.json();
  return data;
};

// Обновление данных о пользователе
const updateUser = async (userData: IUserData): Promise<IUserResponse> => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const response = await fetch(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${accessToken}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Failed to update user data');
  }

  const data: IUserResponse = await response.json();
  return data;
};

// Обновление токенов
const refreshToken = async (): Promise<ITokenResponse> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('Токен для обновления не найден');
  }

  const response = await fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Не удалось обновить токен');
  }

  const data: ITokenResponse = await response.json();
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  resetTokenRefreshInterval();
  return data;
};

// Восстановление пароля
const forgotPassword = async (email: string): Promise<IPasswordResetResponse> => {
  const response = await fetch(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Failed to send reset email');
  }

  const data: IPasswordResetResponse = await response.json();
  return data;
};

// Сброс пароля
const resetPassword = async (password: string, token: string): Promise<IPasswordResetResponse> => {
  const response = await fetch(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify({ password, token }),
  });

  if (!response.ok) {
    throw new Error('Failed to reset password');
  }

  const data: IPasswordResetResponse = await response.json();
  return data;
};

// Обновление токенов каждые 20 минут
let tokenRefreshInterval: number;

const startTokenRefreshInterval = () => {
  tokenRefreshInterval = setInterval(async () => {
    try {
      await refreshToken();
    } catch (error) {
      console.error('Failed to refresh token:', error);
    }
  }, 20 * 60 * 1000);
};

const resetTokenRefreshInterval = () => {
  clearTokenRefreshInterval(); // Очищаем текущий интервал
  startTokenRefreshInterval(); // Запускаем новый интервал
};

const clearTokenRefreshInterval = () => {
  if (tokenRefreshInterval) {
    clearInterval(tokenRefreshInterval);
  }
};

export const api = {
  getUser,
  login,
  logout,
  register,
  refreshToken,
  updateUser,
  forgotPassword,
  resetPassword,
};
