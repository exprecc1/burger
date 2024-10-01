import React from 'react';
import { useState } from 'react';
import { viewIngredient, removeViewIngredient } from '../services/slices/current-ingredient/slice';
import { useDispatch, useSelector } from 'react-redux';

export const useModal = () => {
  const dispatch = useDispatch();
  const { currentIngredient } = useSelector((state) => state.currentIngredient);
  const [isModal, setIsModal] = useState(false);

  const openModal = (item) => {
    document.body.style.overflow = 'hidden';
    dispatch(viewIngredient(item));
    setIsModal(true);
  };

  const closeModal = () => {
    dispatch(removeViewIngredient());
    setIsModal(false);
    document.body.style.overflow = 'auto';
  };

  return {
    isModal,
    currentIngredient,
    openModal,
    closeModal,
  };
};
