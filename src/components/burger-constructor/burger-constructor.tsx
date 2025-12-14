import { useAppSelector } from '@/services/hooks/use-app-selector';
import { getAllConstructorIngredients } from '@/services/selectors/ingredients-constructor';
import { Button, Preloader } from '@krgaa/react-developer-burger-ui-components';

import { ConstructorCard } from './components/constructor-card/constructor-card';
import { ConstructorIngredients } from './components/constructor-ingredients/constructor-ingredients';
import { OrderSummary } from './components/order-summary/order-summary';
import { useConstructorIngredients } from './hooks/use-constructor-ingredients';
import { useOrder } from './hooks/use-order';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const constructorIngredients = useAppSelector(getAllConstructorIngredients);
  const { bun, filling } = useConstructorIngredients(constructorIngredients);
  const { total, handleSubmit, isLoading, errorMessage } =
    useOrder(constructorIngredients);

  return (
    <section className={styles.burger_constructor}>
      {isLoading && (
        <div className={styles.loader}>
          <Preloader />
        </div>
      )}
      <ConstructorIngredients
        bun={bun}
        filling={filling}
        renderCard={({ ingredient, position }) => (
          <ConstructorCard ingredient={ingredient} position={position} />
        )}
      />
      <OrderSummary
        total={total}
        isError={!!errorMessage}
        errorMessage={errorMessage}
        actions={
          <Button
            size="large"
            type="primary"
            htmlType={'button'}
            onClick={() => void handleSubmit()}
            disabled={isLoading || !constructorIngredients.length}
          >
            Оформить заказ
          </Button>
        }
      />
    </section>
  );
};
