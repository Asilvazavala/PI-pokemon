import styles from './Filters.module.css';
import { FilterBy } from './FilterBy/FilterBy';
import { OrderBy } from './OrderBy/OrderBy';
import { usePaginate } from '../../hooks/usePaginate';
import { Settings } from '../../images/SVG/Settings';

export const Filters = () => {
  const { setCurrentPage, setOrden } = usePaginate();
  
  return (
    <main className={styles.containerFilters}>
      <Settings />
      <OrderBy setCurrentPage={setCurrentPage} setOrden={setOrden} />
      <FilterBy setCurrentPage={setCurrentPage} setOrden={setOrden} />
    </main>
  )
}
