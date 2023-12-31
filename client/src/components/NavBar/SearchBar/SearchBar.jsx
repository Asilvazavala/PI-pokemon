import styles from './SearchBar.module.css';
import { Results } from '../Results/Results'
import { useSearchBar } from '../../../hooks/useSearchBar'
import { usePaginate } from '../../../hooks/usePaginate'
import PropTypes from 'prop-types';

export const SearchBar = ({ setSidebarState }) => {
  SearchBar.propTypes = {
    setSidebarState: PropTypes.func.isRequired,
  };
    
  const { results, handleChange, handleSubmit, handleResults, handleItemSelected, search } = useSearchBar()
  const { allPokemon } = usePaginate()

  return (
    <main>
      <form className={`${styles.containerSerchBar}`} role="search" onSubmit={(e) => { handleSubmit(e); search && setSidebarState(false); }}>
        { 
          search.length > 0 && 
          <article className={styles.quantityResults}>
            {results.length > 5 ? <span>5 results</span> : <span>{results.length} results</span>}
          </article>
        }

        <article>
          <input 
            id="search"
            className={`${styles.inputSearch} ${styles.inputFocused}`} 
            onChange={(e) => handleChange(e)} 
            value={search} 
            type="search"
            placeholder="Search pokemon..." 
          />        
          <button 
            id='btnAlert' 
            type="submit"
          >Search
          </button>

          <aside className={styles.containerResults}>
          { allPokemon && 
            <Results 
              allPokemon={allPokemon} 
              onItemSelected={handleItemSelected} 
              search={search} 
              onResultsCalculated={handleResults}
              setSidebarState={setSidebarState}
            />
          }
          </aside>
        </article>
      </form>
    </main>
  )
}
