import styles from './Filters.module.css';
import { FilterBy } from './FilterBy/FilterBy';
import { OrderBy } from './OrderBy/OrderBy';
import { usePaginate } from '../../hooks/usePaginate'

export const Filters = () => {
  const { currentPokemon, setCurrentPage, setOrden } = usePaginate();
  
    return (
    <div>
      <div className={currentPokemon.length > 0 ? styles.containerFilters : styles.hideFilters}>
        <OrderBy setCurrentPage={setCurrentPage} setOrden={setOrden} />
        <FilterBy setCurrentPage={setCurrentPage} setOrden={setOrden} />
      </div>
    </div>
  )
}
