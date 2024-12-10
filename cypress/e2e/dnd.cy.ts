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
    cy.intercept('GET', `${BASE_URL}//auth/user`, { fixture: 'user.json' }).as('getUser');
    cy.intercept('GET', `${BASE_URL}/ingredients`, { fixture: 'ingredients.json' }).as(
      'getIngredients',
    );
    cy.viewport(1280, 800);
    cy.visit('http://localhost:5173');
    cy.wait('@getUser');
  });

  it('Перетаскивание ингредиента в конструктор', () => {
    // Получаем ингредиент для перетаскивания
    cy.get('[data-cy="ingredient-item"]').first().as('ingredient');

    // Получаем область для перетаскивания ингредиентов (не булок)
    cy.get('[data-cy="constructor-drop-area-ingredients"]').as('dropArea');
  });

  it('Открытие модального окна с описанием ингредиента', () => {
    // Выбираем ингредиент и кликаем по нему
    cy.get('[data-cy="ingredient-item"]').first().click();

    // Проверяем, что модальное окно открылось
    cy.get('[data-cy="modal"]').should('be.visible');

    // Проверяем, что данные ингредиента отображаются в модальном окне
    cy.get('[data-cy="modal-content"]').should('contain.text', 'Краторная булка N-200i');
  });

  it('Отображение в модальном окне данных ингредиента', () => {
    // Выбираем ингредиент и кликаем по нему
    cy.get('[data-cy="ingredient-item"]').first().click();

    // Проверяем, что модальное окно открылось
    cy.get('[data-cy="modal"]').should('be.visible');

    // Проверяем, что данные ингредиента отображаются в модальном окне
    cy.get('[data-cy="modal-content"]').should('contain.text', 'Краторная булка N-200i');
  });

  it('Закрытие модальных окон при клике на кнопку закрытия', () => {
    // Выбираем ингредиент и кликаем по нему
    cy.get('[data-cy="ingredient-item"]').first().click();

    // Проверяем, что модальное окно открылось
    cy.get('[data-cy="modal"]').should('be.visible');

    // Кликаем по кнопке закрытия модального окна
    cy.get('[data-cy="modal-close-button"]').click();

    // Проверяем, что модальное окно закрылось
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Открытие модального окна с данными о заказе при клике по кнопке «Оформить заказ»', () => {
    // Перетаскиваем ингредиент в конструктор
    cy.get('[data-cy="ingredient-item"]').first().trigger('dragstart');
    cy.get('[data-cy="constructor-drop-area-bun-up"]').trigger('drop');
    cy.get('[data-cy="ingredient-item"]').eq(3).trigger('dragstart');
    cy.get('[data-cy="constructor-drop-area-ingredients"]').trigger('drop');

    // Перехватываем запрос на оформление заказа и возвращаем фикстуру
    cy.intercept('POST', `${BASE_URL}/orders`, { fixture: 'order.json' }).as('createOrder');

    // Кликаем по кнопке "Оформить заказ"
    cy.get('[data-cy="order-button"]').click();

    // Ждем завершения запроса на оформление заказа
    cy.wait('@createOrder').then((interception) => {
      // Проверяем, что модальное окно с данными о заказе открылось
      cy.get('[data-cy="modal"]').should('be.visible');

      // Проверяем, что в модальном окне отображается номер заказа из фикстуры
      cy.get('[data-cy="modal-order"]').should('contain.text', '62261'); // Номер заказа из фикстуры
    });
  });
});

// ........................
// it('Открытие модального окна с данными о заказе при клике по кнопке «Оформить заказ»', () => {
//   // Перетаскиваем ингредиент в конструктор
//   cy.get('[data-cy="ingredient-item"]').first().trigger('dragstart');
//   cy.get('[data-cy="constructor-drop-area-bun-up"]').trigger('drop');
//   cy.get('[data-cy="ingredient-item"]').eq(3).trigger('dragstart');
//   cy.get('[data-cy="constructor-drop-area-ingredients"]').trigger('drop');

//   // Перехватываем запрос на оформление заказа и возвращаем фикстуру
//   cy.intercept('POST', `${BASE_URL}/api/orders`, (req) => {
//     console.log('Intercepted request:', req);
//     return orderFixture; // Возвращаем данные из фикстуры
//   }).as('createOrder');

//   // Кликаем по кнопке "Оформить заказ"
//   cy.get('[data-cy="order-button"]').click();

//   // Ждем завершения запроса на оформление заказа
//   cy.wait('@createOrder').then((interception) => {
//     // Проверяем, что модальное окно с данными о заказе открылось
//     cy.get('[data-cy="modal"]').should('be.visible');

//     // Проверяем, что в модальном окне отображается номер заказа из фикстуры
//     cy.get('[data-cy="modal-order"]').should('contain.text', '62189'); // Номер заказа из фикстуры
//   });
// });
