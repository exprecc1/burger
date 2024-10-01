import React from 'react';
import { AppHeader } from './components/app-header/app-header';
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor';
import './App.css';

function App() {
  return (
    <>
      <AppHeader />
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
}

export default App;
