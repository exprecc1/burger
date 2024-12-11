import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { RootState, useSelector } from '../../services/store';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIngredientsList } from './burger-ingredients-list/burger-ingredients-list';
import { IngredientDetails } from './burger-ingredients-modal/ingredients-detail';
import { Modal } from '../modal/modal';
import { useModal } from '../../hooks/useModal';
import { Ingredient } from '../../utils/types';
import style from './burger-ingredients.module.css';

type TabType = 'one' | 'two' | 'three';

export const BurgerIngredients: FunctionComponent = () => {
  const [current, setCurrent] = useState<TabType>('one');
  const { currentIngredient, closeModal, openModal } = useModal();
  const { items, status, error } = useSelector((state) => state.ingredientsAll);

  // Фильтрация по категориям
  const [bun, sauce, stuff] = React.useMemo(() => {
    if (!items) {
      return [[], [], []]; // Если undefined
    }
    return [
      items.filter((obj: Ingredient) => obj.type.includes('bun')),
      items.filter((obj: Ingredient) => obj.type.includes('sauce')),
      items.filter((obj: Ingredient) => obj.type.includes('main')),
    ];
  }, [items]);

  // Ссылки на элементы категорий
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement | null>(null);
  const stuffRef = useRef<HTMLDivElement | null>(null);

  // Обработка скролла
  const handleScroll = (): void => {
    if (bunRef.current && sauceRef.current && stuffRef.current) {
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
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleTabClick = (tab: TabType) => {
    setCurrent(tab);
    switch (tab) {
      case 'one':
        if (bunRef.current) {
          bunRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'two':
        if (sauceRef.current) {
          sauceRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'three':
        if (stuffRef.current) {
          stuffRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      {error ? (
        <div className={style.message__error}>{error}</div>
      ) : status === 'loading' ? (
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
