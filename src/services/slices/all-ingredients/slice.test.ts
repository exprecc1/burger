import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { ingredientsAllSlice, fetchAllIngredients } from './slice';
import { Ingredient } from '../../../utils/types';

const setupStore = () =>
  configureStore({
    reducer: {
      ingredientsAll: ingredientsAllSlice.reducer,
    },
  });

describe('Тесты экшенов ингредиентов', () => {
  describe('Тесты экшена получения всех ингредиентов', () => {
    test('Тест экшена ожидания ответа после запроса ингредиентов', () => {
      const store = setupStore();
      store.dispatch({ type: fetchAllIngredients.pending.type });
      const state = store.getState().ingredientsAll;
      expect(state.status).toBe('loading');
      expect(state.error).toBeNull();
    });

    test('Тест экшена ошибки после запроса ингредиентов', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: fetchAllIngredients.rejected.type,
        error: { message: error },
      });
      const state = store.getState().ingredientsAll;
      expect(state.status).toBe('failed');
      expect(state.error).toBe(error);
    });

    test('Тест экшена успешного ответа получения ингредиентов', () => {
      const mockedPayload: Ingredient[] = [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        },
      ];
      const store = setupStore();
      store.dispatch({
        type: fetchAllIngredients.fulfilled.type,
        payload: mockedPayload,
      });
      const state = store.getState().ingredientsAll;
      expect(state.status).toBe('success');
      expect(state.error).toBeNull();
      expect(state.items).toEqual(mockedPayload);
    });
    test('Тест экшена успешного ответа с пустым массивом ингредиентов', () => {
      const mockedPayload: Ingredient[] = []; // Пустой массив
      const store = setupStore();
      store.dispatch({
        type: fetchAllIngredients.fulfilled.type,
        payload: mockedPayload,
      });
      const state = store.getState().ingredientsAll;
      expect(state.status).toBe('success');
      expect(state.error).toBeNull();
      expect(state.items).toEqual([]); // Убедимся, что массив пустой
    });
  });

  describe('Тесты экшена установки ингредиентов', () => {
    test('Тест экшена setIngredients', () => {
      const mockedPayload: Ingredient[] = [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        },
      ];
      const store = setupStore();
      store.dispatch(ingredientsAllSlice.actions.setIngredients(mockedPayload));
      const state = store.getState().ingredientsAll;
      expect(state.items).toEqual(mockedPayload); // Проверяем, что состояние обновлено
    });
  });
});
