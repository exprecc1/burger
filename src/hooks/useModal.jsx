import { useState } from 'react';

export const useModal = () => {
  const [isModal, setIsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    document.body.style.overflow = 'hidden';
    setSelectedItem(item);
    setIsModal(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModal(false);
    document.body.style.overflow = 'auto';
  };

  return {
    isModal,
    selectedItem,
    openModal,
    closeModal,
  };
};
