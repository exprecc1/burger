import React, { FunctionComponent, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import style from './modal.module.css';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: FunctionComponent<ModalProps> = ({ onClose, children }) => {
  const handleClickOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      event.target instanceof HTMLDivElement &&
      event.target.className === '_modal__overlay__active_15okl_19'
    ) {
      onClose();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOverlay as any);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOverlay as any);
    };
  }, [onClose]);

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
    document.body,
  );
};
