import React, { FunctionComponent } from 'react';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';

export const HomePage: FunctionComponent = () => {
  return (
    <>
      <div className="container">
        <div>
          <div className="title">
            <h2>Соберите бургер</h2>
          </div>
          <section className="burger__page">
            <BurgerIngredients />
            <BurgerConstructor />
          </section>
        </div>
      </div>
    </>
  );
};
