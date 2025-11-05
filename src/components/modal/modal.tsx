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

  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <button className={styles.close_button} onClick={close}>
          <CloseIcon type="primary" />
        </button>
        <ModalComponent payload={payload} />
      </div>
      <ModalOverlay onClick={close} />
    </div>,
    document.getElementById('modals')!
  );
};
