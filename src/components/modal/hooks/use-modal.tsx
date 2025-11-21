import { useState } from 'react';

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

  function open<T extends TModalType>({ modalType, payload }: TOpenArgs<T>): void {
    setIsModalOpen(true);
    setType(modalType);
    setPayload(payload);
  }

  const close = (): void => {
    setIsModalOpen(false);
    setType(null);
    setPayload(undefined);
  };

  return {
    isModalOpen,
    payload,
    modalType: type,
    open,
    close,
  };
}
