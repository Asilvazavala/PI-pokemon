import styles from './OrderBy.module.css';
import { useFilters } from '../../../hooks/useFilters';

export const OrderBy = () => {
  const { 
    handleOrderPokemonByName, 
    handleOrderPokemonByAttack,
    handleFilterPokemonByDbOrApi, 
    handleFilterPokemonByType,
    handleReset,
    isOpen, 
    isRotated,
    toggleMenu,
    allTypes,
    orderByRef, 
    selectSourceRef,
    selectedType
  } = useFilters()

  return (
    <main className={styles.containerMain}>
      <span onClick={handleReset}>
        <i className='bx bx-reset'></i>Reset  
      </span>

      <span onClick={() => toggleMenu('orderBy')} ref={orderByRef}>
        <i className={`bx bx-chevron-down ${isRotated.orderBy ? styles.rotated : ''}`}></i> 
        Order by
        {isOpen.orderBy && (
          <ul onClick={() => toggleMenu('orderBy')}>
            <li id='A-Z' onClick={(e) => (handleOrderPokemonByName(e))}>A-Z</li>
            <li id='Z-A' onClick={(e) => (handleOrderPokemonByName(e))}>Z-A</li>
            <li id='mostAttack' onClick={(e) => (handleOrderPokemonByAttack(e))}>Most attack</li>
            <li id='worstAttack' onClick={(e) => (handleOrderPokemonByAttack(e))}>Worst attack</li>
          </ul>
        )}
      </span>

      <span onClick={() => toggleMenu('selectSource')} ref={selectSourceRef}>
        <i className={`bx bx-chevron-down ${isRotated.selectSource ? styles.rotated : ''}`}></i> 
        Source
        {isOpen.selectSource && (
          <ul onClick={() => toggleMenu('selectSource')}>
            <li id='api' onClick={(e) => (handleFilterPokemonByDbOrApi(e))}>Api</li>
            <li id='db' onClick={(e) => (handleFilterPokemonByDbOrApi(e))}>Custom</li>
          </ul>
        )}
      </span>

      {
        allTypes.map((el) => {
            return (
              <article key={el.id} >
                <span 
                  className={`${selectedType === el.name ? styles.typeSelected : ''}`}
                  onClick={(e) => (handleFilterPokemonByType(e))}
                  id={el.name} 
                >{el.name} 
                </span>
              </article>
            )
          })
      }
    </main>
  )
}
