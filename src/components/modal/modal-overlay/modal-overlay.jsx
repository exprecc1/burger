import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import style from './modal-overlay.module.css';

export const ModalOverlay = ({ onClick }) => {
  const overlay = document.getElementById('root');
  return createPortal(
    <div className={style.modal__overlay__active} onClick={onClick}></div>,

    overlay,
  );
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func,
};
