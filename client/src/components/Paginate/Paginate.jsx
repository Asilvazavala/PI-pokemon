import styles from './Paginate.module.css';
import { usePaginate } from '../../hooks/usePaginate';

export const Paginate = () => {
  const { 
    currentPage, 
    allPokemon,
    setPage,
    goToPrevPage,
    goToNextPage,
    pageNumber,
   } = usePaginate();  

   if (!pageNumber) return null;

  return (
    <main className={allPokemon.length > 0 ? styles.containerMain : styles.hidePaginate}>
      <ul className={styles.containerPagination}>

        <li>
          <button className={styles.PreviousPage} onClick={goToPrevPage}>
            <i className='bx bxs-chevron-left'></i>
          </button>
        </li> 

        {
          pageNumber.map(el => {
            return (
              <li key={el}> 
                <button 
                  onClick={() => setPage(el)} 
                  className={currentPage === el ? styles.pageActive : styles.page}
                >{el}
                </button>
              </li>
            )
          })  
        }

        <li>
          <button className={styles.NextPage} onClick={goToNextPage}>
            <i className='bx bxs-chevron-right'></i>
          </button>
        </li>

      </ul>
    </main>
  )
}