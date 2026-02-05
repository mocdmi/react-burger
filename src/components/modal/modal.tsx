import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { useModalContext } from './hooks/modal-context';
import { modalRegistry } from './utils/modal-registry';

import type { ModalPayloadMap, TModalType } from './types';

import styles from './modal.module.css';

export const Modal = (): React.JSX.Element | null => {
  const { isModalOpen, payload, modalType, close } = useModalContext();

  const handleKeyUp = useCallback(
    (e: KeyboardEvent): void => {
      if (e.code === 'Escape') {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return (): void => document.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  if (!isModalOpen || !modalType) return null;

  const ModalComponent = modalRegistry[modalType] as React.ComponentType<{
    payload: ModalPayloadMap[TModalType];
  }>;

  if (!ModalComponent) return null;

  const modalsRoot = document.getElementById('modals');

  if (!modalsRoot) {
    console.error('Modal root element #modals not found');
    return null;
  }

  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.modal} data-cy="modal">
        <button className={styles.close_button} onClick={close} data-cy="modal-close">
          <CloseIcon type="primary" />
        </button>
        {payload && <ModalComponent payload={payload} />}
      </div>
      <ModalOverlay onClick={close} />
    </div>,
    modalsRoot
  );
};
