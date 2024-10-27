import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import style from './modal.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeViewIngredient } from '../../services/slices/current-ingredient/slice';

export const Modal = ({ onClose, children, isVisible }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  const handleClick = (event) => {
    if (event.target.className === '_modal__overlay__active_15okl_19') {
      onClose();
      if (backgroundLocation) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      dispatch(removeViewIngredient());
      if (backgroundLocation) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }
  };

  React.useEffect(() => {
    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClick);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return createPortal(
    <>
      <ModalOverlay isVisible={isVisible} />
      <div id={style.modal} className={style.modal__content}>
        <div className="modal__header">
          <CloseIcon onClick={onClose} type="primary" className={style.close} />
        </div>
        {children}
      </div>
    </>,
    document.body,
  );
};

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
