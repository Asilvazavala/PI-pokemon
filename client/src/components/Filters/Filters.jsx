import styles from './Filters.module.css';
import { OrderBy } from './OrderBy/OrderBy';
import { ActiveFilters } from './ActiveFilters/ActiveFilters';

export const Filters = () => {
  
  return (
    <main className={styles.containerFilters}>
      <section className={styles.orderBy}>
        <OrderBy />
      </section>

      <section className={styles.activeFilters}>
        <ActiveFilters />
      </section>
    </main>
  )
}
