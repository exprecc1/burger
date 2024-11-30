import React, { FunctionComponent } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { useDispatch } from '../../services/store';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeIngredient } from '../../services/slices/constructor-list/slice';
import { Ingredient } from '../../utils/types';
import style from './burger-constructor.module.css';

interface DraggableIngredientProps {
  item: Ingredient;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  isInConstructor: boolean;
  uuid: string;
}

export const DraggableIngredient: FunctionComponent<DraggableIngredientProps> = ({
  item,
  index,
  moveIngredient,
}) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: 'ingredient',
    item: { index, isInConstructor: true }, // Флаг, что ингредиент уже в конструкторе
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop<DragItem, void>({
    accept: 'ingredient',
    hover: (
      item: { index: number; isInConstructor: boolean },
      monitor: DropTargetMonitor<DragItem, void>,
    ) => {
      if (!monitor.isOver({ shallow: true })) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex; // Обновляем индекс перетаскиваемого элемента
    },
  });

  const handleRemoveIngredient = (uuid: string) => dispatch(removeIngredient({ uuid }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={style.builder__box}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <DragIcon type="primary" className="pl-0 pr-2 pb-0 pt-0" />
      <ConstructorElement
        type={undefined}
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => (item.uuid ? handleRemoveIngredient(item.uuid) : undefined)}
      />
    </div>
  );
};
