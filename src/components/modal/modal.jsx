import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import style from './modal.module.css';

export const Modal = ({ children, onClose, isVisible }) => {
  const handleClick = (event) => {
    if (event.target.className == '_modal__overlay__active_15okl_19') {
      onClose();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  //По нажатию клавиши
  React.useEffect(() => {
    isVisible
      ? document.addEventListener('keydown', handleKeyDown)
      : document.removeEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  //По клику
  React.useEffect(() => {
    isVisible
      ? document.addEventListener('mousedown', handleClick)
      : document.removeEventListener('mousedown', handleClick);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {createPortal(
        <div id={style.modal}>
          <div className="modal__header">
            <CloseIcon onClick={() => onClose()} type="primary" className={style.close} />
          </div>
          {children}
        </div>,
        document.body,
      )}
      <ModalOverlay isVisible={isVisible} />
    </>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
};
