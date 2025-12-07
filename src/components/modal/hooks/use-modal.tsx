import { useCallback, useState } from 'react';

import type { ModalPayloadMap, TModalType, TOpenArgs } from '../types';

type TUseModalResult = {
  isModalOpen: boolean;
  payload?: ModalPayloadMap[TModalType];
  modalType: TModalType | null;
  open: <T extends TModalType>({ modalType, payload }: TOpenArgs<T>) => void;
  close: () => void;
};

export function useModal(): TUseModalResult {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payload, setPayload] = useState<ModalPayloadMap[TModalType]>();
  const [type, setType] = useState<TModalType | null>(null);
  const [onCloseCallback, setOnCloseCallback] = useState<(() => void) | null>(null);

  const open = useCallback(
    <T extends TModalType>({ modalType, payload, onClose }: TOpenArgs<T>): void => {
      setIsModalOpen(true);
      setType(modalType);
      setPayload(payload);
      setOnCloseCallback(() => onClose);
    },
    []
  );

  const close = useCallback((): void => {
    if (onCloseCallback) {
      onCloseCallback();
    }

    setIsModalOpen(false);
    setType(null);
    setPayload(undefined);
    setOnCloseCallback(null);
  }, [onCloseCallback]);

  return {
    isModalOpen,
    payload,
    modalType: type,
    open,
    close,
  };
}
