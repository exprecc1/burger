import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { setUser, setIsAuthChecked, getUser, getIsAuthChecked } from './user';
import { login, logout, registerUser, fetchUser, updateUser } from './action';

// Настройка хранилища
const setupStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
    },
  });

describe('Тесты для userSlice', () => {
  describe('Тесты для reducers', () => {
    test('Тест экшена setUser', () => {
      const store = setupStore();
      const user = {
        email: 'exprecc1@mail.ru',
        name: 'Ярослав',
      };
      store.dispatch(setUser(user));
      const state = store.getState().user;
      expect(state.user).toEqual(user);
    });

    test('Тест экшена setIsAuthChecked', () => {
      const store = setupStore();
      store.dispatch(setIsAuthChecked(true));
      const state = store.getState().user;
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('Тесты для extraReducers', () => {
    test('Тест экшена login.fulfilled', () => {
      const store = setupStore();
      const mockedPayload = {
        user: {
          email: 'exprecc1@mail.ru',
          name: 'Ярослав',
        },
      };
      store.dispatch({
        type: login.fulfilled.type,
        payload: mockedPayload,
      });
      const state = store.getState().user;
      expect(state.user).toEqual(mockedPayload.user);
      expect(state.isAuthChecked).toBe(true);
    });

    test('Тест экшена logout.fulfilled', () => {
      const store = setupStore();
      store.dispatch({ type: logout.fulfilled.type });
      const state = store.getState().user;
      expect(state.user).toBeNull();
    });

    test('Тест экшена registerUser.fulfilled', () => {
      const store = setupStore();
      const mockedPayload = {
        user: {
          email: 'exprecc1@mail.ru',
          name: 'Ярослав',
        },
      };
      store.dispatch({
        type: registerUser.fulfilled.type,
        payload: mockedPayload,
      });
      const state = store.getState().user;
      expect(state.user).toEqual(mockedPayload.user);
      expect(state.isAuthChecked).toBe(true);
    });

    test('Тест экшена fetchUser.fulfilled', () => {
      const store = setupStore();
      const mockedPayload = {
        user: {
          email: 'exprecc1@mail.ru',
          name: 'Ярослав',
        },
      };
      store.dispatch({
        type: fetchUser.fulfilled.type,
        payload: mockedPayload,
      });
      const state = store.getState().user;
      expect(state.user).toEqual(mockedPayload.user);
    });

    test('Тест экшена updateUser.fulfilled', () => {
      const store = setupStore();
      const mockedPayload = {
        user: {
          email: 'exprecc1@mail.ru',
          name: 'Ярослав',
        },
      };
      store.dispatch({
        type: updateUser.fulfilled.type,
        payload: mockedPayload,
      });
      const state = store.getState().user;
      expect(state.user).toEqual(mockedPayload.user);
    });
  });

  describe('Тесты установки пользователя', () => {
    test('Тест селектора getUser', () => {
      const store = setupStore();
      const user = {
        email: 'exprecc1@mail.ru',
        name: 'Ярослав',
      };
      store.dispatch(setUser(user));
      const state = store.getState();
      expect(getUser(state)).toEqual(user);
    });

    test('Тест установки флага', () => {
      const store = setupStore();
      store.dispatch(setIsAuthChecked(true));
      const state = store.getState();
      expect(getIsAuthChecked(state)).toBe(true);
    });
  });
});
