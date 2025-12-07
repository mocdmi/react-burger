import { CustomLink } from '@/components/custom-link/custom-link';
import { FormTitle } from '@/components/form-title/form-title';
import { Form } from '@/components/form/form';
import { useForm } from '@/hooks/use-form';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';

import { useResetPassword } from './hooks/use-reset-password';

import type { TForm } from './types';

export const ResetPasswordPage = (): React.JSX.Element => {
  const { form, handleChange } = useForm<TForm>({
    password: '',
    token: '',
  });
  const { isLoading, isError, errorMessage, handleSubmit } = useResetPassword(form);

  return (
    <Form
      method="post"
      header={<FormTitle level="h1" text="Восстановление пароля" />}
      fields={
        <>
          <PasswordInput
            name="password"
            value={form.password}
            placeholder="Введите новый пароль"
            icon="ShowIcon"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="token"
            value={form.token}
            placeholder="Введите код из письма"
            onChange={handleChange}
          />
        </>
      }
      isError={isError}
      errorMessage={errorMessage}
      actions={
        <Button htmlType="submit" disabled={isLoading}>
          Сохранить
        </Button>
      }
      footer={
        <>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?{' '}
            <CustomLink to="/login" variant="primary">
              Войти
            </CustomLink>
          </p>
        </>
      }
      onSubmit={handleSubmit}
    />
  );
};
