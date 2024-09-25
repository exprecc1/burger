import React from 'react';
import { AppHeader } from './components/app-header/app-header';
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor';
import './App.css';

function App() {
  const [ingredients, setIngredients] = React.useState([]);
  const [error, setError] = React.useState(null);

  //Получение данных с api
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://norma.nomoreparties.space/api/ingredients');

        if (!response.ok) {
          throw new Error('Ошибка сети ', response.status);
        }

        const data = await response.json();
        setIngredients(data.data);
        setError(null);
      } catch (error) {
        console.error('Ошибка получения данных:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {error ? (
        <div className="message-error">{error}</div>
      ) : (
        ingredients && (
          <>
            <AppHeader />
            <div className="container">
              <div>
                <div className="title">
                  <h2>Соберите бургер</h2>
                </div>
                <section className="burger__page">
                  <BurgerIngredients ingredients={ingredients} />
                  <BurgerConstructor ingredients={ingredients} />
                </section>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
}

export default App;
