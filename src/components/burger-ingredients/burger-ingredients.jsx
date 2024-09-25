import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../utils/types';
import { BurgerIngredientsList } from './burger-ingredients-list/burger-ingredients-list';
import { IngredientDetails } from './burger-ingredients-modal/ingredients-detail';
import { Modal } from '../modal/modal';
import { useModal } from '../../hooks/useModal';
import style from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = React.useState('one');
  const { isModal, selectedItem, openModal, closeModal } = useModal();

  const bun = React.useMemo(() => {
    return ingredients.filter((obj) => obj.type.includes('bun'));
  }, [ingredients]);

  const sauce = React.useMemo(() => {
    return ingredients.filter((obj) => obj.type.includes('sauce'));
  }, [ingredients]);

  const stuff = React.useMemo(() => {
    return ingredients.filter((obj) => obj.type.includes('main'));
  }, [ingredients]);

  return (
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
      {selectedItem && (
        <Modal isVisible={isModal} onClose={closeModal}>
          <IngredientDetails item={selectedItem} />
        </Modal>
      )}
    </div>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(IngredientType.isRequired),
};
