import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../utils/types';
import { BurgerIngredientsList } from './burger-ingredients-list/burger-ingredients-list';
import { IngredientDetails } from './burger-ingredients-modal/ingredients-detail';
import { Modal } from '../modal/modal';
import { useModal } from '../../hooks/useModal';
import { fetchAllIngredients } from '../../services/slices/all-ingredients/slice';
import style from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('one');
  const { isModal, currentIngredient, openModal, closeModal } = useModal();

  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.ingredientsAll);

  //Получение данных с api
  React.useEffect(() => {
    dispatch(fetchAllIngredients());
  }, [dispatch]);

  //Фильтрация по категориям
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
              <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
              </Tab>
              <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
              </Tab>
              <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
              </Tab>
            </div>
            <div className={style.burger__ingredients}>
              <BurgerIngredientsList title="Булки" item={bun} choiceItem={openModal} />
              <BurgerIngredientsList title="Соусы" item={sauce} choiceItem={openModal} />
              <BurgerIngredientsList title="Начинки" item={stuff} choiceItem={openModal} />
            </div>
            {currentIngredient && (
              <Modal isVisible={isModal} onClose={closeModal}>
                <IngredientDetails item={currentIngredient} />
              </Modal>
            )}
          </div>
        )
      )}
    </>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientType.isRequired),
};
