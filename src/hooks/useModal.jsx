import React from 'react';
import { viewIngredient, removeViewIngredient } from '../services/slices/current-ingredient/slice';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { clearIngredients } from '../services/slices/constructor-list/slice';
import { useDispatch, useSelector } from 'react-redux';

export const useModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentIngredient } = useSelector((state) => state.currentIngredient);
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.ingredientsAll);
  const orderStatus = useSelector((state) => state.order.status);
  const [isModal, setIsModal] = React.useState(false);

  const openModal = React.useCallback(
    (item) => {
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
