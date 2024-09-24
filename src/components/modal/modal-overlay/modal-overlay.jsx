import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import style from './modal-overlay.module.css';

export const ModalOverlay = ({ isVisible }) => {
  const overlay = document.getElementById('root');
  return (
    <>
      {createPortal(
        isVisible ? (
          <div className={style.modal__overlay__active}></div>
        ) : (
          <div className={style.modal__overlay}></div>
        ),
        overlay,
      )}
    </>
  );
};

ModalOverlay.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};
