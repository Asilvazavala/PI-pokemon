import styles from './ActiveFilters.module.css';
import { useFilters } from '../../../hooks/useFilters';

export const ActiveFilters = () => {
  const { activeFilters } = useFilters();

  return (
    <main className={styles.main}>
      { 
        activeFilters.length > 0 &&
        <p>Active Filters:{' '}
          {
            activeFilters.map((el, index) => {
              return (
                <span key={el}>
                  {index > 0 && ', '}
                  {index === activeFilters.length -1 ? `${el}.` : el} 
                </span>
              )
            })
          }
        </p>
      }
    </main>
  )
}
