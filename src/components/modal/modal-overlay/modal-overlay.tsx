import style from './modal-overlay.module.css';
import { FunctionComponent } from 'react';

interface ModalOverlayProps {
  onClose: () => void;
}

export const ModalOverlay: FunctionComponent<ModalOverlayProps> = ({ onClose }) => {
  return (
    <div className={style.modal__overlay__active} onClick={onClose} data-cy="modal-overlay"></div>
  );
};
