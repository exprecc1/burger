// /* eslint-disable no-undef */
import { expect, test, describe } from '@jest/globals';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { fetchAllIngredients, setIngredients } from './slice';

// Создаем моковое хранилище с использованием redux-mock-store и redux-thunk
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('ingredientsAllSlice', () => {
  let store;

  beforeEach(() => {
    // Инициализируем моковое хранилище с начальным состоянием
    store = mockStore({
      ingredientsAll: {
        items: [],
        status: 'loading',
        error: null,
      },
    });
  });

  afterEach(() => {
    // Очищаем fetch-mock после каждого теста
    fetchMock.restore();
  });

  it('should handle initial state', () => {
    const state = store.getState().ingredientsAll;
    expect(state.items).toEqual([]);
    expect(state.status).toEqual('loading');
    expect(state.error).toBeNull();
  });

  it('should handle setIngredients', () => {
    const ingredients = [
      { _id: '1', name: 'Ingredient 1', price: 100 },
      { _id: '2', name: 'Ingredient 2', price: 200 },
    ];

    // Диспатчим действие setIngredients
    store.dispatch(setIngredients(ingredients));

    // Проверяем, что действие было отправлено
    const actions = store.getActions();
    expect(actions[0].type).toEqual(setIngredients.type);
    expect(actions[0].payload).toEqual(ingredients);
  });

  it('should handle fetchAllIngredients pending', () => {
    // Диспатчим действие fetchAllIngredients
    store.dispatch(fetchAllIngredients());

    // Проверяем, что было отправлено действие pending
    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchAllIngredients.pending.type);
  });

  it('should handle fetchAllIngredients fulfilled', async () => {
    const ingredients = [
      { _id: '1', name: 'Ingredient 1', price: 100 },
      { _id: '2', name: 'Ingredient 2', price: 200 },
    ];

    // Мокаем fetch-mock для имитации успешного ответа
    fetchMock.getOnce('/ingredients', {
      status: 200,
      body: { data: ingredients },
    });

    // Диспатчим действие fetchAllIngredients
    await store.dispatch(fetchAllIngredients());

    // Проверяем, что были отправлены действия pending и fulfilled
    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchAllIngredients.pending.type);
    expect(actions[1].type).toEqual(fetchAllIngredients.fulfilled.type);
    expect(actions[1].payload).toEqual(ingredients);
  });

  it('should handle fetchAllIngredients rejected', async () => {
    const errorMessage = 'Failed to fetch ingredients';

    // Мокаем fetch-mock для имитации ошибки
    fetchMock.getOnce('/ingredients', {
      throws: new Error(errorMessage),
    });

    // Диспатчим действие fetchAllIngredients
    await store.dispatch(fetchAllIngredients());

    // Проверяем, что были отправлены действия pending и rejected
    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchAllIngredients.pending.type);
    expect(actions[1].type).toEqual(fetchAllIngredients.rejected.type);
    expect(actions[1].error.message).toEqual(errorMessage);
  });
});

//////////////////////////////////////

// import { configureStore } from '@reduxjs/toolkit';
// import ingredientsReducer, { fetchAllIngredients } from './slice'; // Импортируем редьюсер и экшен

// // Функция для настройки мокового хранилища
// const setupStore = () =>
//   configureStore({
//     reducer: {
//       ingredientsAll: ingredientsReducer, // Используем ваш редьюсер
//     },
//   });

// describe('Тесты экшенов ингредиентов', () => {
//   describe('Тесты экшена получения ингредиентов', () => {
//     test('Тест экшена ожидания ответа после запроса ингредиентов', () => {
//       const store = setupStore();
//       store.dispatch({ type: fetchAllIngredients.pending.type }); // Диспатчим pending
//       const state = store.getState().ingredientsAll;
//       expect(state.status).toBe('loading'); // Проверяем статус
//       expect(state.error).toBeNull(); // Проверяем, что ошибки нет
//     });

//     test('Тест экшена ошибки после запроса ингредиентов', () => {
//       const store = setupStore();
//       const error = 'mocked error';
//       store.dispatch({
//         type: fetchAllIngredients.rejected.type, // Диспатчим rejected
//         error: { message: error },
//       });
//       const state = store.getState().ingredientsAll;
//       expect(state.status).toBe('failed'); // Проверяем статус
//       expect(state.error).toBe(error); // Проверяем сообщение об ошибке
//     });

//     test('Тест экшена успешного ответа получения ингредиентов', () => {
//       const mockedPayload = [
//         {
//           _id: '643d69a5c3f7b9001cfa093c',
//           name: 'Краторная булка N-200i',
//           type: 'bun',
//           proteins: 80,
//           fat: 24,
//           carbohydrates: 53,
//           calories: 420,
//           price: 1255,
//           image: 'https://code.s3.yandex.net/react/code/bun-02.png',
//           image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
//           image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
//         },
//       ];
//       const store = setupStore();
//       store.dispatch({
//         type: fetchAllIngredients.fulfilled.type, // Диспатчим fulfilled
//         payload: mockedPayload,
//       });
//       const state = store.getState().ingredientsAll;
//       expect(state.status).toBe('success'); // Проверяем статус
//       expect(state.error).toBeNull(); // Проверяем, что ошибки нет
//       expect(state.items).toEqual(mockedPayload); // Проверяем, что данные совпадают
//     });
//   });
// });
