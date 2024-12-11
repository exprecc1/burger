import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import orderFeedReducer, {
  wsConnecting,
  wsOnline,
  wsDisconnecting,
  wsError,
  wsMessage,
} from './slice';
import { WebSocketStatus } from '../../../utils/types';

// Настройка хранилища
const setupStore = () =>
  configureStore({
    reducer: {
      orderFeed: orderFeedReducer,
    },
  });

describe('Тесты экшенов ленты заказов', () => {
  describe('Тесты экшенов управления WebSocket', () => {
    test('Тест экшена wsConnecting (ожидание подключения)', () => {
      const store = setupStore();
      store.dispatch(wsConnecting());
      const state = store.getState().orderFeed;
      expect(state.status).toBe(WebSocketStatus.CONNECTED);
      expect(state.error).toBeNull();
    });

    test('Тест экшена wsOnline (успешное подключение)', () => {
      const store = setupStore();
      store.dispatch(wsOnline());
      const state = store.getState().orderFeed;
      expect(state.status).toBe(WebSocketStatus.ONLINE);
      expect(state.error).toBeNull();
    });

    test('Тест экшена wsDisconnecting (отключение)', () => {
      const store = setupStore();
      store.dispatch(wsDisconnecting());
      const state = store.getState().orderFeed;
      expect(state.status).toBe(WebSocketStatus.OFFLINE);
      expect(state.error).toBeNull();
    });

    test('Тест экшена wsError (ошибка WebSocket)', () => {
      const store = setupStore();
      const errorMessage = 'WebSocket error';
      store.dispatch(wsError(errorMessage));
      const state = store.getState().orderFeed;
      expect(state.status).toBe(WebSocketStatus.ERROR);
      expect(state.error).toBe(errorMessage);
    });

    test('Тест экшена wsMessage (получение сообщения)', () => {
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
        status: WebSocketStatus.ONLINE, // Добавляем статус
        error: null, // Добавляем ошибку
      };
      store.dispatch(wsMessage(mockPayload));
      const state = store.getState().orderFeed;
      expect(state.orders).toEqual(mockPayload.orders);
      expect(state.total).toBe(mockPayload.total);
      expect(state.totalToday).toBe(mockPayload.totalToday);
    });
  });

  describe('Тесты селекторов', () => {
    test('Тест селектора getStatus', () => {
      const store = setupStore();
      store.dispatch(wsOnline());
      const state = store.getState().orderFeed;
      expect(state.status).toBe(WebSocketStatus.ONLINE);
    });

    test('Тест селектора getError', () => {
      const store = setupStore();
      const errorMessage = 'WebSocket error';
      store.dispatch(wsError(errorMessage));
      const state = store.getState().orderFeed;
      expect(state.error).toBe(errorMessage);
    });

    test('Тест селектора getOrders', () => {
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
      store.dispatch(wsMessage(mockPayload));
      const state = store.getState().orderFeed;
      expect(state.orders).toEqual(mockPayload.orders);
    });
  });
});
