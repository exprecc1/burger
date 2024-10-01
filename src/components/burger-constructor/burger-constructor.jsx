import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../utils/types';
import { OrderDetails } from './burger-constructor-modal/burger-constructor-modal';
import { Modal } from '../modal/modal';
import { useModal } from '../../hooks/useModal';
import { addIngredient, removeIngredient } from '../../services/slices/constructor-list/slice';
import style from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  const { isModal, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.constructorList.ingredients);

  const bun = ingredients.filter((obj) => obj.type.includes('bun'));
  const nonBunIngredients = ingredients.filter((obj) => obj.type !== 'bun');

  const handleDrop = (item) => dispatch(addIngredient(item));
  const handleRemoveIngredient = (id) => dispatch(removeIngredient({ _id: id }));

  React.useEffect(() => {
    console.log('Ingredients changed:', ingredients);
  }, [ingredients]);

  // Подсчет общей стоимости с учетом двух булок
  const totalPrice = React.useMemo(() => {
    const bunPrice = bun.length ? bun[0].price * 2 : 0;
    const nonBunPrice = nonBunIngredients.reduce((total, item) => total + item.price, 0);
    return bunPrice + nonBunPrice;
  }, [bun, nonBunIngredients]);

  //Приемка ингредиентов
  const [{ isOver }, drop] = useDrop({
    accept: 'ingredient',
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className="builder">
      <div
        className={style.builder__content}
        ref={drop}
        style={{ border: isOver ? '2px dashed #4C4CFF' : 'none' }}
      >
        {bun.map((item, idx) => (
          <div className={style.builder__box} key={idx}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${item.name} (верх)`}
              price={item.price}
              thumbnail={item.image}
            />
          </div>
        ))}
        <div className={style.builder__ingredients}>
          {nonBunIngredients.map((item, idx) => {
            return (
              <div className={style.builder__box} key={idx}>
                <DragIcon type="primary" className="pl-0 pr-2 pb-0 pt-0" />
                <ConstructorElement
                  type="undefined"
                  isLocked={false}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  handleClose={() => handleRemoveIngredient(item._id)}
                />
              </div>
            );
          })}
        </div>
        {bun.map((item, idx) => (
          <div className={style.builder__box} key={idx}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${item.name} (низ)`}
              price={item.price}
              thumbnail={item.image}
            />
          </div>
        ))}
      </div>
      <div className={style.builder__footer}>
        <div className={style.final__price}>
          <p>
            {totalPrice}
            <CurrencyIcon type="primary" />
          </p>
        </div>
        <Button onClick={() => openModal()} htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
      <Modal isVisible={isModal} onClose={closeModal}>
        <OrderDetails />
      </Modal>
    </div>
  );
};
