import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';

import styles from './orders-card.module.css';

type TOrdersCard = {
  name: string;
  number: string;
  date: Date;
  ingredientsImages: string[];
  sum: string;
};

export const OrdersCard = ({
  name,
  number,
  date,
  ingredientsImages,
  sum,
}: TOrdersCard): React.JSX.Element => {
  return (
    <section className={`${styles.orders_card} p-6`}>
      <div className={`${styles.number} text text_type_digits-default`}>#{number}</div>
      <FormattedDate
        date={date}
        className={`${styles.date} text text_type_main-small text_color_inactive`}
      />
      <h3 className={`${styles.name} text text_type_main-medium`}>{name}</h3>
      <div className={styles.ingredients_images}>
        {ingredientsImages.map((image, index) => (
          <div key={index} className={styles.ingredient_image}>
            <img src={image} alt="" />
          </div>
        ))}
      </div>
      <div className={styles.sum}>
        <span className="text text_type_digits-default">{sum}</span>
        <CurrencyIcon type="primary" />
      </div>
    </section>
  );
};
