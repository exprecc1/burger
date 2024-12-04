import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../utils/api';
import { setIsAuthChecked, setUser } from './user';
import { IUserData, ICredentials, IUserResponse } from '../../../utils/api';

// Регистрация
export const registerUser = createAsyncThunk<IUserResponse, IUserData>(
  'user/register',
  async (userData) => {
    const response = await api.register(userData);
    return response;
  },
);

// Авторизация
export const login = createAsyncThunk<IUserResponse, ICredentials>(
  'user/login',
  async (userData) => {
    const response = await api.login(userData);
    return response;
  },
);

// Проверка авторизации
export const checkUserAuth = createAsyncThunk('user/checkUserAuth', (_, { dispatch }) => {
  if (localStorage.getItem('accessToken')) {
    api
      .getUser()
      .then((user) => {
        dispatch(setUser(user.user));
      })
      .catch((error) => {
        console.error('Failed to fetch user data:', error);
        dispatch(setUser(null));
      })
      .finally(() => {
        dispatch(setIsAuthChecked(true));
      });
  } else {
    dispatch(setIsAuthChecked(true));
  }
});

// Выход
export const logout = createAsyncThunk('user/logout', async (_, { dispatch }) => {
  try {
    await api.logout();
    dispatch(setUser(null));
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
});

// Получение данных о пользователе
export const fetchUser = createAsyncThunk<IUserResponse>('user/fetchUser', async () => {
  const response = await api.getUser();
  return response;
});

// Обновление данных о пользователе
export const updateUser = createAsyncThunk<IUserResponse, IUserData>(
  'user/updateUser',
  async (userData) => {
    const response = await api.updateUser(userData);
    return response;
  },
);
