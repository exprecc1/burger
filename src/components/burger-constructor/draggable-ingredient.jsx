import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeIngredient } from '../../services/slices/constructor-list/slice';
import style from './burger-constructor.module.css';

export const DraggableIngredient = ({ item, index, moveIngredient }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: 'ingredient',
    item: { index, isInConstructor: true }, // Флаг, что ингредиент уже в конструкторе
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'ingredient',
    hover: (item, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex; // Обновляем индекс перетаскиваемого элемента
    },
  });

  const handleRemoveIngredient = (uuid) => dispatch(removeIngredient({ uuid }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={style.builder__box}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <DragIcon type="primary" className="pl-0 pr-2 pb-0 pt-0" />
      <ConstructorElement
        type="undefined"
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleRemoveIngredient(item.uuid)}
      />
    </div>
  );
};
