import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import {
  UserOrderFeedSlice,
  wsUserConnecting,
  wsUserOnline,
  wsUserDisconnecting,
  wsUserError,
  wsUserMessage,
  getUserStatus,
  getUserError,
  getUserOrders,
} from './slice';
import { WebSocketStatus } from '../../../../utils/types';

// Настройка хранилища
const setupStore = () =>
  configureStore({
    reducer: {
      userOrderFeed: UserOrderFeedSlice.reducer,
    },
  });

describe('Тесты для UserOrderFeedSlice', () => {
  describe('Тесты экшенов', () => {
    test('Тест экшена wsUserConnecting (ожидание подключения)', () => {
      const store = setupStore();
      store.dispatch(wsUserConnecting());
      const state = store.getState().userOrderFeed;
      expect(state.status).toBe(WebSocketStatus.CONNECTED);
      expect(state.error).toBeNull();
    });

    test('Тест экшена wsUserOnline (успешное подключение)', () => {
      const store = setupStore();
      store.dispatch(wsUserOnline());
      const state = store.getState().userOrderFeed;
      expect(state.status).toBe(WebSocketStatus.ONLINE);
      expect(state.error).toBeNull();
    });

    test('Тест экшена wsUserDisconnecting (отключение)', () => {
      const store = setupStore();
      store.dispatch(wsUserDisconnecting());
      const state = store.getState().userOrderFeed;
      expect(state.status).toBe(WebSocketStatus.OFFLINE);
      expect(state.error).toBeNull();
    });

    test('Тест экшена wsUserError (ошибка WebSocket)', () => {
      const store = setupStore();
      const errorMessage = 'WebSocket error';
      store.dispatch(wsUserError(errorMessage));
      const state = store.getState().userOrderFeed;
      expect(state.status).toBe(WebSocketStatus.ERROR);
      expect(state.error).toBe(errorMessage);
    });

    test('Тест экшена wsUserMessage (получение сообщения)', () => {
      const store = setupStore();
      const mockPayload = {
        orders: [
          {
            _id: '1',
            ingredients: ['ingredient1', 'ingredient2'],
            status: 'done',
            name: 'Order 1',
            number: 123,
            createdAt: '2023-10-01T12:00:00Z',
            updatedAt: '2023-10-01T12:00:00Z',
          },
        ],
        total: 100,
        totalToday: 10,
        status: WebSocketStatus.ONLINE,
        error: null,
      };
      store.dispatch(wsUserMessage(mockPayload));
      const state = store.getState().userOrderFeed;
      expect(state.orders).toEqual(mockPayload.orders);
      expect(state.total).toBe(mockPayload.total);
      expect(state.totalToday).toBe(mockPayload.totalToday);
    });
  });

  describe('Тесты селекторов', () => {
    test('Тест селектора getUserStatus', () => {
      const store = setupStore();
      store.dispatch(wsUserOnline());
      const state = store.getState();
      expect(getUserStatus(state)).toBe(WebSocketStatus.ONLINE);
    });

    test('Тест селектора getUserError', () => {
      const store = setupStore();
      const errorMessage = 'WebSocket error';
      store.dispatch(wsUserError(errorMessage));
      const state = store.getState();
      expect(getUserError(state)).toBe(errorMessage);
    });

    test('Тест селектора getUserOrders', () => {
      const store = setupStore();
      const mockPayload = {
        orders: [
          {
            _id: '1',
            ingredients: ['ingredient1', 'ingredient2'],
            status: 'done',
            name: 'Order 1',
            number: 123,
            createdAt: '2023-10-01T12:00:00Z',
            updatedAt: '2023-10-01T12:00:00Z',
          },
        ],
        total: 100,
        totalToday: 10,
        status: WebSocketStatus.ONLINE,
        error: null,
      };
      store.dispatch(wsUserMessage(mockPayload));
      const state = store.getState();
      expect(getUserOrders(state)).toEqual(mockPayload.orders);
    });
  });
});
