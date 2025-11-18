import { Tab } from '@krgaa/react-developer-burger-ui-components';

import { INGREDIENTS_GROUP_TYPE } from '../../const';

import type { TIngredientsGroupType } from '@/types';

import styles from './groups-tabs.module.css';

type TGroupsTabs = {
  activeTab: TIngredientsGroupType;
  onToggle: (ingredientsGroupType: TIngredientsGroupType) => void;
};

export const GroupsTabs = ({ activeTab, onToggle }: TGroupsTabs): React.JSX.Element => {
  return (
    <nav>
      <ul className={styles.menu}>
        {(Object.keys(INGREDIENTS_GROUP_TYPE) as TIngredientsGroupType[]).map(
          (ingredientsGroupType) => (
            <Tab
              key={ingredientsGroupType}
              value={ingredientsGroupType}
              active={activeTab === ingredientsGroupType}
              onClick={() => onToggle(ingredientsGroupType)}
            >
              {INGREDIENTS_GROUP_TYPE[ingredientsGroupType]}
            </Tab>
          )
        )}
      </ul>
    </nav>
  );
};
