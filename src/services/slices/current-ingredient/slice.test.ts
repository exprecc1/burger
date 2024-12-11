import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import {
  fetchIngredientById,
  currentIngredientSlice,
  viewIngredient,
  removeViewIngredient,
} from './slice';
import { Ingredient } from '../../../utils/types';

// Настройка хранилища
const setupStore = () =>
  configureStore({
    reducer: {
      currentIngredient: currentIngredientSlice.reducer,
    },
  });

// Mock данные для тестов
const mockIngredient: Ingredient = {
  _id: '1',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 100,
  fat: 10,
  carbohydrates: 20,
  calories: 150,
  price: 99,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 0,
};

describe('Тесты для currentIngredientSlice', () => {
  describe('Тесты экшена получения ингредиента по ID', () => {
    test('Тест экшена ожидания ответа после запроса ингредиента', () => {
      const store = setupStore();
      store.dispatch({ type: fetchIngredientById.pending.type, meta: { arg: '1' } });
      const state = store.getState().currentIngredient;
      expect(state.loading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('Тест экшена ошибки после запроса ингредиента', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: fetchIngredientById.rejected.type,
        error: { message: error },
        meta: { arg: '1' },
      });
      const state = store.getState().currentIngredient;
      expect(state.loading).toBeFalsy();
      expect(state.error).toBe(error);
    });

    test('Тест экшена успешного ответа получения ингредиента', () => {
      const store = setupStore();
      store.dispatch({
        type: fetchIngredientById.fulfilled.type,
        payload: mockIngredient,
        meta: { arg: '1' },
      });
      const state = store.getState().currentIngredient;
      expect(state.loading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.currentIngredient).toEqual(mockIngredient);
    });
  });

  describe('Тесты экшенов управления текущим ингредиентом', () => {
    test('Тест экшена viewIngredient', () => {
      const store = setupStore();
      store.dispatch(viewIngredient(mockIngredient));
      const state = store.getState().currentIngredient;
      expect(state.currentIngredient).toEqual(mockIngredient);
    });

    test('Тест экшена removeViewIngredient', () => {
      const store = setupStore();
      store.dispatch(viewIngredient(mockIngredient));
      store.dispatch(removeViewIngredient());
      const state = store.getState().currentIngredient;
      expect(state.currentIngredient).toBeNull();
    });
  });
});
