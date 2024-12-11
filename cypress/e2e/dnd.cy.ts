import { BASE_URL } from '../../src/utils/request';

describe('Burger Constructor Page', () => {
  beforeEach(() => {
    localStorage.setItem(
      'accessToken',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTgxMWM4ZDgyOWJlMDAxYzc3ODA3MSIsImlhdCI6MTczMzg2MDI3NSwiZXhwIjoxNzMzODYxNDc1fQ.HnohHYB_bofwcR6F-dnOJRlIFbQoF5o6Eaisk_0FHzA',
    );
    localStorage.setItem(
      'refreshToken',
      '95ca933a179b6726fda795e39c4dfba9e16e54ddee23cead8499476c03f6939517a032eb32227e04',
    );
    cy.intercept('GET', `${BASE_URL}/auth/user`, { fixture: 'user.json' }).as('getUser');
    cy.intercept('GET', `${BASE_URL}/ingredients`, { fixture: 'ingredients.json' }).as(
      'getIngredients',
    );
    cy.visit('/');
    cy.viewport(1280, 800);
    cy.wait('@getUser');
    cy.get('[data-cy="ingredient-item"]').first().as('bunIngredient');
    cy.get('[data-cy="ingredient-item"]').eq(3).as('sauceIngredient');
  });

  it('Перетаскивание ингредиента в конструктор', () => {
    // Получаем область для перетаскивания ингредиентов (не булок) и задаем ей алиас
    cy.get('[data-cy="constructor-drop-area-ingredients"]').as('dropArea');

    // Используем алиасы для выполнения действий
    cy.get('@bunIngredient').trigger('dragstart');
    cy.get('@dropArea').trigger('drop');
  });

  it('Открытие модального окна с описанием ингредиента', () => {
    // Кликаем по ингредиенту
    cy.get('@bunIngredient').click();

    // Проверяем, что модальное окно открылось
    cy.get('[data-cy="modal"]').should('be.visible');

    // Проверяем, что данные ингредиента отображаются в модальном окне
    cy.get('[data-cy="modal-content"]').should('contain.text', 'Краторная булка N-200i');
  });

  it('Отображение в модальном окне данных ингредиента', () => {
    // Кликаем по ингредиенту
    cy.get('@bunIngredient').click();

    // Проверяем, что модальное окно открылось
    cy.get('[data-cy="modal"]').should('be.visible');

    // Проверяем, что данные ингредиента отображаются в модальном окне
    cy.get('[data-cy="modal-content"]').should('contain.text', 'Краторная булка N-200i');
  });

  it('Закрытие модальных окон при клике на кнопку закрытия', () => {
    // Кликаем по ингредиенту
    cy.get('@bunIngredient').click();

    // Проверяем, что модальное окно открылось
    cy.get('[data-cy="modal"]').should('be.visible');

    // Кликаем по кнопке закрытия модального окна
    cy.get('[data-cy="modal-close-button"]').click();

    // Проверяем, что модальное окно закрылось
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Открытие модального окна с данными о заказе при клике по кнопке «Оформить заказ»', () => {
    // Перетаскиваем ингредиент в конструктор
    cy.get('[data-cy="constructor-drop-area-bun-up"]').as('bunDropArea');
    cy.get('[data-cy="constructor-drop-area-ingredients"]').as('ingredientsDropArea');

    // Перетаскиваем булку
    cy.get('@bunIngredient').trigger('dragstart');
    cy.get('@bunDropArea').trigger('drop');

    // Перетаскиваем соус
    cy.get('@sauceIngredient').trigger('dragstart');
    cy.get('@ingredientsDropArea').trigger('drop');

    // Перехватываем запрос на оформление заказа и возвращаем фикстуру
    cy.intercept('POST', `${BASE_URL}/orders`, { fixture: 'order.json' }).as('createOrder');

    // Кликаем по кнопке "Оформить заказ"
    cy.get('[data-cy="order-button"]').click();

    // Ждем завершения запроса на оформление заказа
    cy.wait('@createOrder').then(() => {
      // Проверяем, что модальное окно с данными о заказе открылось
      cy.get('[data-cy="modal"]').should('be.visible');

      // Проверяем, что в модальном окне отображается номер заказа из фикстуры
      cy.get('[data-cy="modal-order"]').should('contain.text', '62261'); // Номер заказа из фикстуры
    });
  });
});
