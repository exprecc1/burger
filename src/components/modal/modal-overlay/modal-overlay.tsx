import { createPortal } from 'react-dom';
import style from './modal-overlay.module.css';
import { FunctionComponent } from 'react';

interface ModalOverlayProps {
  onClose: () => void;
}

export const ModalOverlay: FunctionComponent<ModalOverlayProps> = ({ onClose }) => {
  const overlay = document.getElementById('root')!;
  return createPortal(
    <div className={style.modal__overlay__active} onClick={onClose}></div>,

    overlay,
  );
};
