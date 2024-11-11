import React from 'react';
import { viewIngredient, removeViewIngredient } from '../services/slices/current-ingredient/slice';
import { useNavigate, useLocation, Location } from 'react-router-dom';
import { clearIngredients } from '../services/slices/constructor-list/slice';
import { useDispatch, useSelector } from 'react-redux';
import { Ingredient, UserState, OrderState } from '../utils/types';

interface currentIngredient extends Ingredient {
  currentIngredient?: Ingredient;
}

export const useModal = () => {
  const navigate = useNavigate();
  const location: Location<string> = useLocation();
  const dispatch = useDispatch();
  const { currentIngredient } = useSelector(
    (state: { currentIngredient: currentIngredient }) => state.currentIngredient,
  );
  const { user } = useSelector((state: { user: UserState }) => state.user);
  const orderStatus = useSelector((state: { order: OrderState }) => state.order.status);

  const [isModal, setIsModal] = React.useState<boolean>(false);

  const openModal = React.useCallback(
    (item: Ingredient) => {
      if (item) {
        dispatch(viewIngredient(item));
        navigate(`/ingredient/${item._id}`, {
          state: { backgroundLocation: location, currentIngredientId: item._id },
        });
      }
      document.body.style.overflow = 'hidden';
    },
    [dispatch, navigate, location, user],
  );

  const closeModal = () => {
    if (orderStatus === 'success') {
      dispatch(clearIngredients());
    }
    dispatch(removeViewIngredient());
    document.body.style.overflow = 'auto';
    navigate('/');
  };

  return {
    setIsModal,
    isModal,
    currentIngredient,
    openModal,
    closeModal,
  };
};
