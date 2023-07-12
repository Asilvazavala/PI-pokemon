import styles from './ActiveFilters.module.css';
import { useFilters } from '../../../hooks/useFilters';

export const ActiveFilters = () => {
  const { activeFilters } = useFilters();

  const activeFilterValues = Object.values(activeFilters).filter(value => value !== null);
  const numActiveFilters = activeFilterValues.length;

  return (
    <main className={styles.main}>
      { Object.values(activeFilters).some(el => el !== null) &&
        <p>Active Filters:{' '}
          {
            Object.entries(activeFilters).map(([key, value], index) => {
              if (value !== null) {
                const isLastItem = numActiveFilters <= 1 || numActiveFilters === 3 && index === 2 || numActiveFilters === 2 && index === 2
                const separator = isLastItem ? " " : ", ";
                return (
                  <span key={key}>
                    {value}
                    {separator}
                  </span>
                )
              } else {
                return null
              }
            })
          }
        </p>
      }
    </main>
  )
}
