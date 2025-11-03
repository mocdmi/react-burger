import { constructorIngredients } from '@/utils/constructor-ingredients';
import { Button } from '@krgaa/react-developer-burger-ui-components';

import { useModalActions } from '../modal/hooks/use-modal-actions';
import { ConstructorCard } from './components/constructor-card/constructor-card';
import { ConstructorIngredients } from './components/constructor-ingredients/constructor-ingredients';
import { OrderSummary } from './components/order-summary/order-summary';
import { useConstructorIngredients } from './hooks/use-constructor-ingredients';
import { useOrder } from './hooks/use-order';

import type { TIngredient } from '@/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  console.log(ingredients);

  const { bun, filling } = useConstructorIngredients(constructorIngredients);
  const { total } = useOrder(constructorIngredients);
  const { openModal } = useModalActions();

  return (
    <section className={styles.burger_constructor}>
      <ConstructorIngredients
        bun={bun}
        filling={filling}
        renderCard={({ ingredient, position }) => (
          <ConstructorCard ingredient={ingredient} position={position} />
        )}
      />
      <OrderSummary
        total={total}
        actions={
          <Button
            size="large"
            type="primary"
            htmlType={'button'}
            onClick={() => openModal({ modalType: 'order-details' })}
          >
            Оформить заказ
          </Button>
        }
      />
    </section>
  );
};
