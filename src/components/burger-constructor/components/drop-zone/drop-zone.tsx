import styles from './drop-zone.module.css';

type DropZoneProps = {
  text: string;
  variant?: 'default' | 'bun';
  isOver: boolean;
};

export const DropZone = ({
  text,
  variant = 'default',
  isOver,
}: DropZoneProps): React.JSX.Element => {
  return (
    <div
      className={`text text_type_main-default ml-8 ${styles.drop_zone} ${styles[`drop_zone_${variant}`]} ${isOver && styles.drop_zone_active}`}
    >
      {text}
    </div>
  );
};
