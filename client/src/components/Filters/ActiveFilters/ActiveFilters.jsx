import styles from './ActiveFilters.module.css';
import { useFilters } from '../../../hooks/useFilters';

export const ActiveFilters = () => {
  const { activeFilters } = useFilters();

  return (
    <main className={styles.main}>
      { Object.values(activeFilters).some(el => el !== null) &&
        <p>Active Filters:{' '}
          {
            Object.entries(activeFilters).map(([key, value], index, arr) => {
              if (value !== null) {
                const isLastItem = index === arr.length - 1;
                const separator = isLastItem ? '.' : ', ';
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
