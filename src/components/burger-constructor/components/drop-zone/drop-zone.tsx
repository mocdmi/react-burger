// eslint-disable-next-line css-modules/no-unused-class
import styles from './drop-zone.module.css';

type DropZoneProps = {
  text: string;
  variant?: 'default' | 'bun';
  isOver: boolean;
  'data-cy'?: string;
};

export const DropZone = ({
  text,
  variant = 'default',
  isOver,
  'data-cy': dataCy,
}: DropZoneProps): React.JSX.Element => {
  return (
    <div
      className={`text text_type_main-default ml-8 ${styles.drop_zone} ${styles[`drop_zone_${variant}`]} ${isOver && styles.drop_zone_active}`}
      data-cy={dataCy}
    >
      {text}
    </div>
  );
};
