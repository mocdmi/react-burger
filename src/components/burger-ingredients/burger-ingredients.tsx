import { useGetAllIngredientsQuery } from '@/services/api/endpoints/ingredients-endpoints';
import { getErrorData } from '@/services/api/utils/get-error-data';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';

import { GroupsTabs } from './components/groups-tabs/groups-tabs';
import { IngredientsCard } from './components/ingredients-card/ingredients-card';
import { IngredientsGroup } from './components/ingredients-group/ingredients-group';
import { IngredientsGroups } from './components/ingredients-groups/ingredients-groups';
import { useIngredientsCounter } from './hooks/use-ingredients-counter';
import { useIngredientsGroups } from './hooks/use-ingredients-groups';
import { useIngredientsTabs } from './hooks/use-Ingredients-tabs';

import type { TCreateOrderResponse } from '@/services/types';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
  const { data, isLoading, error, isError } = useGetAllIngredientsQuery();
  const { groupedIngredients } = useIngredientsGroups(data?.data);
  const { scrolledContainerRef, groupRefs, activeTab, scrollToGroup } =
    useIngredientsTabs(groupedIngredients);
  const { ingredientCounts } = useIngredientsCounter();
  const navigate = useNavigate();
  const location = useLocation();

  const errorData = getErrorData<TCreateOrderResponse>(error);
  const errorMessage =
    errorData && 'message' in errorData ? errorData.message : 'Неизвестная ошибка';

  return (
    <section className={styles.burger_ingredients}>
      <GroupsTabs activeTab={activeTab} onToggle={scrollToGroup} />
      <div
        ref={scrolledContainerRef}
        className={`${styles.scrolled} custom-scroll mb-10`}
      >
        {isLoading && (
          <div className={styles.preloader}>
            <Preloader />
          </div>
        )}
        {isError && <div className={styles.error}>{errorMessage}</div>}
        {
          <IngredientsGroups
            groupedIngredients={groupedIngredients}
            renderGroup={({ ingredientsGroupType, ingredients }) => (
              <IngredientsGroup
                ref={groupRefs[ingredientsGroupType]}
                ingredientsGroupType={ingredientsGroupType}
                ingredients={ingredients}
                renderIngredientCard={(ingredient) => (
                  <IngredientsCard
                    ingredient={ingredient}
                    count={ingredientCounts[ingredient._id]}
                    onClick={() => {
                      void navigate(`/ingredients/${ingredient._id}`, {
                        state: { backgroundLocation: location },
                      });
                    }}
                  />
                )}
              />
            )}
          />
        }
      </div>
    </section>
  );
};
