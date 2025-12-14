import type { ReactNode } from 'react';

import styles from './form-title.module.css';

type TFormTitleProps = {
  text: ReactNode;
  level: 'h1' | 'h2' | 'h3' | 'h4';
};

export const FormTitle = ({ text, level }: TFormTitleProps): React.JSX.Element => {
  const Tag = level;
  return (
    <Tag className={`${styles['form-title']} text text_type_main-medium`}>{text}</Tag>
  );
};
