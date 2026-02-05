import { useCallback, useState } from 'react';

import type { ChangeEvent } from 'react';

type TUseFormResult<T extends object> = {
  form: T;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  updateForm: (newState: T) => void;
};

export function useForm<T extends object>(initState: T): TUseFormResult<T> {
  const [form, setForm] = useState<T>(initState);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const updateForm = (newState: T): void => {
    setForm(newState);
  };

  return {
    form,
    handleChange,
    updateForm,
  };
}
