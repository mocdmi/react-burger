import { CustomLink } from '@/components/custom-link/custom-link';
import { FormTitle } from '@/components/form-title/form-title';
import { Form } from '@/components/form/form';
import { useForm } from '@/hooks/use-form';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';

import { useLogin } from './hooks/use-login';

import type { TForm } from './types';

export const LoginPage = (): React.JSX.Element => {
  const { form, handleChange } = useForm<TForm>({
    email: '',
    password: '',
  });
  const { isLoading, isError, errorMessage, handleSubmit } = useLogin(form);

  return (
    <Form
      method="post"
      header={<FormTitle level="h1" text="Вход" />}
      fields={
        <>
          <Input
            type="email"
            name="email"
            value={form.email}
            placeholder="E-mail"
            onChange={handleChange}
          />
          <PasswordInput
            name="password"
            value={form.password}
            placeholder="Пароль"
            icon="ShowIcon"
            onChange={handleChange}
          />
        </>
      }
      isError={isError}
      errorMessage={errorMessage}
      actions={
        <Button htmlType="submit" disabled={isLoading}>
          Войти
        </Button>
      }
      footer={
        <>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?{' '}
            <CustomLink to="/register" variant="primary">
              Зарегистрироваться
            </CustomLink>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?{' '}
            <CustomLink to="/forgot-password" variant="primary">
              Восстановить пароль
            </CustomLink>
          </p>
        </>
      }
      onSubmit={handleSubmit}
    />
  );
};
