import { CustomLink } from '@/components/custom-link/custom-link';
import { FormTitle } from '@/components/form-title/form-title';
import { Form } from '@/components/form/form';
import { useForm } from '@/hooks/use-form';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';

import { useRegister } from './hooks/use-register';

import type { TForm } from './types';

export const RegisterPage = (): React.JSX.Element => {
  const { form, handleChange } = useForm<TForm>({
    name: '',
    email: '',
    password: '',
  });

  const { isLoading, isError, errorMessage, handleSubmit } = useRegister(form);

  return (
    <Form
      method="post"
      header={<FormTitle level="h1" text="Регистрация" />}
      fields={
        <>
          <Input
            type="text"
            name="name"
            value={form.name}
            placeholder="Имя"
            onChange={handleChange}
          />
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
        <>
          <Button htmlType="submit" disabled={isLoading}>
            Зарегистрироваться
          </Button>
        </>
      }
      footer={
        <>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?{' '}
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
