import { useEffect } from 'react';
import styles from './FilterBy.module.css';
import { filterPokemonByDbOrApi, filterPokemonByType, getAllTypes } from '../../../redux/actions';
import { useFunctions } from '../../../hooks/useFunctions'

export const FilterBy = ({ setCurrentPage, setOrden }) => {
  const { dispatch, useSelector } = useFunctions()
  const allTypes = useSelector((state) => state.types);

  // Ejecuto en automático la action para cargar los tipos para el filtro
  useEffect(() => {
    dispatch(getAllTypes());
  },[dispatch])

  // Cambiar el filtro por api/db
  const handleFilterPokemonByDbOrApi = (e) => {
    dispatch(filterPokemonByDbOrApi(e.target.value));
    e.preventDefault();
    setOrden(`Ordenado ${e.target.value}`);
    setCurrentPage(1);
  };
  
  // Cambiar el filtro por tipo
  const handleFilterPokemonByType = (e) => {
    dispatch(filterPokemonByType(e.target.id));
    e.preventDefault();
    setCurrentPage(1);
  };


  return (
    <section className={styles.containerMain}>

      {/* Filter by Api/Created */}
      <select className={styles.filters} onChange={(e) => (handleFilterPokemonByDbOrApi(e))}>
        <option value='api'>Api</option>
        <option value='db'>Created</option>
      </select>

      {/* Filter by Type  */}
      {
        allTypes.map((el) => {
            return (
              <article key={el.id} >
                <span 
                  className={styles.btnType}
                  onClick={(e) => (handleFilterPokemonByType(e))}
                  id={el.name} 
                >{el.name} 
                </span>
              </article>
            )
          })
      }
    </section>
  )
}
