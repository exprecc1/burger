import React from 'react';
import { useState } from 'react';
import { viewIngredient, removeViewIngredient } from '../services/slices/current-ingredient/slice';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearIngredients } from '../services/slices/constructor-list/slice';
import { useDispatch, useSelector } from 'react-redux';

export const useModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentIngredient } = useSelector((state) => state.currentIngredient);
  const orderStatus = useSelector((state) => state.order.status);
  const [isModal, setIsModal] = useState(false);

  const openModal = (item) => {
    document.body.style.overflow = 'hidden';
    dispatch(viewIngredient(item));
    setIsModal(true);
    navigate(`/ingredient/${item._id}`, { state: { backgroundLocation: location } });
  };

  const closeModal = () => {
    if (orderStatus === 'success') {
      dispatch(clearIngredients());
    }
    dispatch(removeViewIngredient());
    document.body.style.overflow = 'auto';
    navigate(-1);
  };

  return {
    isModal,
    currentIngredient,
    openModal,
    closeModal,
  };
};
