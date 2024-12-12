import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import orderReducer, { submitOrder } from './slice';

// Настройка хранилища
const setupStore = () =>
  configureStore({
    reducer: {
      order: orderReducer,
    },
  });

describe('Тесты для orderSlice', () => {
  describe('Тесты экшена отправки заказа', () => {
    test('Тест экшена ожидания ответа после отправки заказа', () => {
      const store = setupStore();
      store.dispatch({ type: submitOrder.pending.type, meta: { arg: ['1', '2'] } });
      const state = store.getState().order;
      expect(state.status).toBe('loading');
      expect(state.error).toBeNull();
    });

    test('Тест экшена ошибки после отправки заказа', () => {
      const store = setupStore();
      const error = 'mocked error';
      store.dispatch({
        type: submitOrder.rejected.type,
        error: { message: error },
        meta: { arg: ['1', '2'] },
      });
      const state = store.getState().order;
      expect(state.status).toBe('failed');
      expect(state.error).toBe(error);
    });

    test('Тест экшена успешного ответа после отправки заказа', () => {
      const store = setupStore();
      const mockedPayload = {
        order: {
          number: 12345,
        },
        success: true,
        error: null,
      };
      store.dispatch({
        type: submitOrder.fulfilled.type,
        payload: mockedPayload,
        meta: { arg: ['1', '2'] },
      });
      const state = store.getState().order;
      expect(state.status).toBe('success');
      expect(state.error).toBeNull();
      expect(state.orderNumber).toBe(mockedPayload.order.number);
    });
  });
});
