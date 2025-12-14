import { NavLink } from 'react-router-dom';

import styles from './custom-link.module.css';

const variants = {
  default: `${styles.default} text text_type_main-default`,
  primary: `${styles.primary} text text_type_main-default`,
  secondary: `${styles.secondary} text text_type_main-medium`,
} as const;

type Variant = keyof typeof variants;

type TLink = {
  variant?: Variant;
  extraClass?: string;
} & React.ComponentProps<typeof NavLink>;

export const CustomLink = ({
  to,
  children,
  extraClass = '',
  variant = 'default',
  ...rest
}: TLink): React.JSX.Element => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.custom_link} ${variants[variant]} ${isActive ? styles.active : ''} ${extraClass}`
      }
      {...rest}
    >
      {children}
    </NavLink>
  );
};
