import { CustomLink } from '@/components/custom-link/custom-link';
import { FormTitle } from '@/components/form-title/form-title';
import { Form } from '@/components/form/form';
import { useForm } from '@/hooks/use-form';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';

import { useForgotPassword } from './hooks/use-forgot-password';

import type { TForm } from './types';

export const ForgotPasswordPage = (): React.JSX.Element => {
  const { form, handleChange } = useForm<TForm>({
    email: '',
  });
  const { isLoading, isError, errorMessage, handleSubmit } = useForgotPassword(form);

  return (
    <Form
      method="post"
      header={<FormTitle level="h1" text="Восстановление пароля" />}
      fields={
        <Input
          type="email"
          name="email"
          value={form.email}
          placeholder="Укажите e-mail"
          onChange={handleChange}
        />
      }
      isError={isError}
      errorMessage={errorMessage}
      actions={
        <Button htmlType="submit" disabled={isLoading}>
          Восстановить
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
