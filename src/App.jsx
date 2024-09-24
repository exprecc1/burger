import React from 'react';
import { AppHeader } from './components/app-header/app-header';
import { BurgerIngredients } from './components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from './components/burger-constructor/burger-constructor';
import { IngredientDetails } from './components/burger-ingredients/burger-ingredients-modal/ingredients-detail';
import { OrderDetails } from './components/burger-constructor/burger-constructor-modal/burger-constructor-modal';
import { Modal } from './components/modal/modal/';
import './App.css';

function App() {
  const [isModal, setIsModal] = React.useState(false);
  const [ingredients, setIngredients] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const body = document.getElementsByTagName('body')[0];

  const openModal = () => {
    body.style.overflow = 'hidden';
    setIsModal(true);
  };
  const closeModal = () => {
    setSelectedItem(null);
    setIsModal(false);
    body.style.overflow = 'auto';
  };

  const choiceItem = (item) => {
    setSelectedItem(item);
  };

  //Получение данных с api
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://norma.nomoreparties.space/api/ingredients');
        const data = await response.json();
        setIngredients(data.data);
      } catch (error) {
        console.error('Ошибка получения данных:', error);
      }
    };

    fetchData();
  }, []);

  // Обработка добавления ингредиентов
  React.useEffect(() => {
    if (selectedItem) {
      openModal();
    }
  }, [selectedItem]);

  return (
    <>
      {ingredients && (
        <>
          {isModal && (
            <Modal onClose={closeModal} isVisible={isModal}>
              {selectedItem ? <IngredientDetails item={selectedItem} /> : <OrderDetails />}
            </Modal>
          )}

          <AppHeader />
          <div className="container">
            <div>
              <div className="title">
                <h2>Соберите бургер</h2>
              </div>
              <section className="burger__page">
                <BurgerIngredients ingredients={ingredients} choiceItem={choiceItem} />
                <BurgerConstructor onOpen={openModal} item={ingredients} />
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
