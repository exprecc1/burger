import React from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsList } from './burger-ingredients-list/burger-ingredients-list';
import { IngredientDetails } from './burger-ingredients-modal/ingredients-detail';
import { Modal } from '../modal/modal';
import { useModal } from '../../hooks/useModal';
import style from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('one');
  const { currentIngredient, closeModal, openModal } = useModal();
  const { items, loading, error } = useSelector((state) => state.ingredientsAll);

  // Фильтрация по категориям
  const [bun, sauce, stuff] = React.useMemo(() => {
    if (!items) {
      return [[], [], []]; // Если undefined
    }
    return [
      items.filter((obj) => obj.type.includes('bun')),
      items.filter((obj) => obj.type.includes('sauce')),
      items.filter((obj) => obj.type.includes('main')),
    ];
  }, [items]);

  // Ссылки на элементы категорий
  const bunRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const stuffRef = React.useRef(null);

  // Обработка скролла
  const handleScroll = () => {
    const bunTop = bunRef.current.getBoundingClientRect().top;
    const sauceTop = sauceRef.current.getBoundingClientRect().top;
    const stuffTop = stuffRef.current.getBoundingClientRect().top;

    if (bunTop >= 50) {
      setCurrent('one');
    } else if (sauceTop > -65) {
      setCurrent('two');
    } else if (stuffTop > -350) {
      setCurrent('three');
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Клик на Tab
  const handleTabClick = (tab) => {
    setCurrent(tab);
    switch (tab) {
      case 'one':
        bunRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'two':
        sauceRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'three':
        stuffRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  return (
    <>
      {error ? (
        <div className={style.message__error}>{error}</div>
      ) : loading ? (
        <div className={style.loading}>Загрузка...</div>
      ) : (
        items && (
          <div className={style.burger__components}>
            <div className={style.burger__components__toggle}>
              <Tab value="one" active={current === 'one'} onClick={() => handleTabClick('one')}>
                Булки
              </Tab>
              <Tab value="two" active={current === 'two'} onClick={() => handleTabClick('two')}>
                Соусы
              </Tab>
              <Tab
                value="three"
                active={current === 'three'}
                onClick={() => handleTabClick('three')}
              >
                Начинки
              </Tab>
            </div>
            <div className={style.burger__ingredients} onScroll={handleScroll}>
              <div ref={bunRef}>
                <BurgerIngredientsList title="Булки" item={bun} choiceItem={openModal} />
              </div>
              <div ref={sauceRef}>
                <BurgerIngredientsList title="Соусы" item={sauce} choiceItem={openModal} />
              </div>
              <div ref={stuffRef}>
                <BurgerIngredientsList title="Начинки" item={stuff} choiceItem={openModal} />
              </div>
            </div>
            {currentIngredient && (
              <Modal onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            )}
          </div>
        )
      )}
    </>
  );
};
