import { api } from '../../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsAuthChecked, setUser } from './user';

//Авторизация и выход

export const login = createAsyncThunk('user/login', async () => {
  return api.login();
});

export const logout = createAsyncThunk('user/logout', async () => {
  return api.logout();
});

//Получение токена
export const checkUserAuth = createAsyncThunk('user/checkUserAuth', (_, { dispatch }) => {
  if (localStorage.getItem('accessToken')) {
    api
      .getUser()
      .then((user) => dispatch(setUser(user)))
      .finally(() => dispatch(setIsAuthChecked(true)));
  } else {
    dispatch(setIsAuthChecked(true));
  }
});

//Регистрация

export const registerUser = createAsyncThunk('user/register', async (userData) => {
  const response = await api.register(userData);
  return response.user;
});

//Обновление токена

export const refreshTokens = createAsyncThunk('user/refreshTokens', async () => {
  const response = await api.refreshToken();
  return response;
});
