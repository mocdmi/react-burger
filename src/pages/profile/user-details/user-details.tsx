import { Form } from '@/components/form/form';
import { useForm } from '@/hooks/use-form';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';

import { useUserDetails } from './hooks/use-user-details';

import type { TForm } from './types';

import styles from './user-details.module.css';

export const UserDetailsPage = (): React.JSX.Element => {
  const { form, handleChange, updateForm } = useForm<TForm>({
    name: '',
    email: '',
    password: '',
  });
  const { initForm, isLoading, isError, errorMessage, handleSubmit } =
    useUserDetails(form);

  const isDirty =
    form.name !== initForm.name ||
    form.email !== initForm.email ||
    form.password.length > 0;

  useEffect(() => {
    updateForm(initForm);
  }, [initForm]);

  const handleReset = (): void => {
    updateForm(initForm);
  };

  return (
    <Form
      fields={
        <>
          <Input
            type="text"
            name="name"
            value={form.name}
            placeholder="Имя"
            icon="EditIcon"
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            value={form.email}
            placeholder="E-mail"
            icon="EditIcon"
            onChange={handleChange}
          />
          <PasswordInput
            name="password"
            value={form.password}
            placeholder="Пароль"
            icon="EditIcon"
            onChange={handleChange}
          />
        </>
      }
      isError={isError}
      errorMessage={errorMessage}
      actions={
        // Убрать моргание кнопок
        isDirty && (
          <div className={styles.actions}>
            <Button
              htmlType="button"
              size="medium"
              type="secondary"
              onClick={handleReset}
            >
              Отмена
            </Button>
            <Button htmlType="submit" disabled={isLoading}>
              Сохранить
            </Button>
          </div>
        )
      }
      onSubmit={handleSubmit}
    />
  );
};
