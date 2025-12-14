import type { FormHTMLAttributes, ReactNode } from 'react';

import styles from './form.module.css';

type TFormProps = {
  header?: ReactNode;
  fields: ReactNode;
  isError?: boolean;
  errorMessage?: string;
  actions?: ReactNode;
  footer?: ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;

export const Form = ({
  header,
  fields,
  isError = false,
  errorMessage,
  actions,
  footer,
  ...rest
}: TFormProps): React.JSX.Element => {
  return (
    <div className={styles.form}>
      {header && <div className={`${styles.header} mb-6`}>{header}</div>}
      <form {...rest}>
        <div className={styles.fields}>{fields}</div>
        {isError && (
          <div className="text text_type_main-default mt-5">{errorMessage}</div>
        )}
        {actions && <div className={`${styles.actions} mt-6`}>{actions}</div>}
      </form>
      {footer && <div className={`${styles.footer} mt-20`}>{footer}</div>}
    </div>
  );
};
