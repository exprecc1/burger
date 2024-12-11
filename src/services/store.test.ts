import { expect, test, describe } from '@jest/globals';
import { store } from './store';
import { initialState as userInitialState } from './slices/user/user';
import { initialState as feedInitialState } from './slices/order-feed/slice';
import { initialState as orderInitialState } from './slices/order-details/slice';
import { initialState as ingredientsInitialState } from './slices/all-ingredients/slice';
import { initialState as constructorInitialState } from './slices/constructor-list/slice';
import { initialState as currentIngredientInitialState } from './slices/current-ingredient/slice';
import { initialState as userOrderFeedInitialState } from './slices/user/user-order-feed/slice';

describe('Тест начального состояния хранилища', () => {
  const initialState = {
    ingredientsAll: ingredientsInitialState,
    constructorList: constructorInitialState,
    currentIngredient: currentIngredientInitialState,
    order: orderInitialState,
    user: userInitialState,
    OrderFeed: feedInitialState,
    userOrderFeed: userOrderFeedInitialState,
  };

  test('Проверка начального состояния хранилища', () => {
    const state = store.getState();
    expect(state).toEqual(initialState);
  });
});
