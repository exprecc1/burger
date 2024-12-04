import React, { FunctionComponent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import style from './modal.module.css';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: FunctionComponent<ModalProps> = ({ onClose, children }) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const modalRoot = document.getElementById('modals')!;

  return createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div id={style.modal} className={style.modal__content}>
        <div className="modal__header">
          <CloseIcon onClick={() => onClose()} type="primary" className={style.close} />
        </div>
        {children}
      </div>
    </>,
    modalRoot,
  );
};
