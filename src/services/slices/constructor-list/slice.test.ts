import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import {
  constructorListSlice,
  addIngredient,
  removeIngredient,
  clearIngredients,
  updateIngredientsOrder,
} from './slice';
import { Ingredient } from '../../../utils/types';

describe('Тесты для constructorListSlice', () => {
  // Начальное состояние
  const startState = {
    ingredients: [],
    ingredientCounts: {},
  };

  describe('Тесты экшена addIngredient', () => {
    test('Добавление ингредиента (не булка)', () => {
      const ingredient: Ingredient = {
        _id: '1',
        name: 'Соус',
        type: 'sauce',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 50,
        image: '',
        image_mobile: '',
        image_large: '',
        uuid: 'uuid1',
      };

      // Конечное состояние
      const endState = JSON.parse(JSON.stringify(startState));
      endState.ingredients.push({ ...ingredient, uuid: 'uuid1' });

      // Выполняем экшен
      const newState = constructorListSlice.reducer(startState, addIngredient(ingredient));

      // Проверяем результат
      expect(newState).toEqual(endState);
    });

    test('Добавление булки (замена старой булки)', () => {
      const bun1: Ingredient = {
        _id: '2',
        name: 'Булка 1',
        type: 'bun',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 100,
        image: '',
        image_mobile: '',
        image_large: '',
        uuid: 'uuid2',
      };
      const bun2: Ingredient = {
        _id: '3',
        name: 'Булка 2',
        type: 'bun',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 150,
        image: '',
        image_mobile: '',
        image_large: '',
        uuid: 'uuid3',
      };

      // Конечное состояние после добавления первой булки
      const endStateAfterFirstBun = JSON.parse(JSON.stringify(startState));
      endStateAfterFirstBun.ingredients.unshift({ ...bun1, uuid: 'uuid2' });

      // Конечное состояние после добавления второй булки
      const endStateAfterSecondBun = JSON.parse(JSON.stringify(startState));
      endStateAfterSecondBun.ingredients.unshift({ ...bun2, uuid: 'uuid3' });

      // Выполняем экшены
      let newState = constructorListSlice.reducer(startState, addIngredient(bun1));
      expect(newState).toEqual(endStateAfterFirstBun);

      newState = constructorListSlice.reducer(newState, addIngredient(bun2));
      expect(newState).toEqual(endStateAfterSecondBun);
    });
  });

  describe('Тесты экшена removeIngredient', () => {
    test('Удаление ингредиента', () => {
      const ingredient: Ingredient = {
        _id: '1',
        name: 'Соус',
        type: 'sauce',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 50,
        image: '',
        image_mobile: '',
        image_large: '',
        uuid: 'uuid1',
      };

      // Добавляем ингредиент
      const stateWithIngredient = constructorListSlice.reducer(
        startState,
        addIngredient(ingredient),
      );

      // Конечное состояние после удаления
      const endState = JSON.parse(JSON.stringify(startState));

      // Выполняем экшен
      const newState = constructorListSlice.reducer(
        stateWithIngredient,
        removeIngredient({ uuid: 'uuid1' }),
      );

      // Проверяем результат
      expect(newState).toEqual(endState);
    });

    test('Удаление несуществующего ингредиента', () => {
      const ingredient: Ingredient = {
        _id: '1',
        name: 'Соус',
        type: 'sauce',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 50,
        image: '',
        image_mobile: '',
        image_large: '',
        uuid: 'uuid1',
      };

      // Добавляем ингредиент
      const stateWithIngredient = constructorListSlice.reducer(
        startState,
        addIngredient(ingredient),
      );

      // Конечное состояние (без изменений)
      const endState = JSON.parse(JSON.stringify(stateWithIngredient));

      // Выполняем экшен
      const newState = constructorListSlice.reducer(
        stateWithIngredient,
        removeIngredient({ uuid: 'uuid2' }),
      );

      // Проверяем результат
      expect(newState).toEqual(endState);
    });
  });

  describe('Тесты экшена clearIngredients', () => {
    test('Очистка всех ингредиентов', () => {
      const ingredient1: Ingredient = {
        _id: '1',
        name: 'Соус',
        type: 'sauce',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 50,
        image: '',
        image_mobile: '',
        image_large: '',
        uuid: 'uuid1',
      };
      const ingredient2: Ingredient = {
        _id: '2',
        name: 'Булка',
        type: 'bun',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 100,
        image: '',
        image_mobile: '',
        image_large: '',
        uuid: 'uuid2',
      };

      // Добавляем ингредиенты
      const stateWithIngredients = constructorListSlice.reducer(
        startState,
        addIngredient(ingredient1),
      );
      const stateWithTwoIngredients = constructorListSlice.reducer(
        stateWithIngredients,
        addIngredient(ingredient2),
      );

      // Конечное состояние (очищенное)
      const endState = JSON.parse(JSON.stringify(startState));

      // Выполняем экшен
      const newState = constructorListSlice.reducer(stateWithTwoIngredients, clearIngredients());

      // Проверяем результат
      expect(newState).toEqual(endState);
    });
  });

  describe('Тесты экшена updateIngredientsOrder', () => {
    test('Обновление порядка ингредиентов', () => {
      const ingredients: Ingredient[] = [
        {
          _id: '1',
          name: 'Соус',
          type: 'sauce',
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 50,
          image: '',
          image_mobile: '',
          image_large: '',
          uuid: 'uuid1',
        },
        {
          _id: '2',
          name: 'Булка',
          type: 'bun',
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 100,
          image: '',
          image_mobile: '',
          image_large: '',
          uuid: 'uuid2',
        },
      ];

      // Добавляем ингредиенты
      const stateWithIngredients = constructorListSlice.reducer(
        startState,
        addIngredient(ingredients[0]),
      );
      const stateWithTwoIngredients = constructorListSlice.reducer(
        stateWithIngredients,
        addIngredient(ingredients[1]),
      );

      // Меняем порядок
      const newOrder = [ingredients[1], ingredients[0]];

      // Конечное состояние
      const endState = JSON.parse(JSON.stringify(stateWithTwoIngredients));
      endState.ingredients = newOrder;

      // Выполняем экшен
      const newState = constructorListSlice.reducer(
        stateWithTwoIngredients,
        updateIngredientsOrder(newOrder),
      );

      // Проверяем результат
      expect(newState).toEqual(endState);
    });
  });
});
