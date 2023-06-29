import { useEffect } from 'react';
import styles from './FilterBy.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { filterPokemonByDbOrApi, filterPokemonByType, getAllTypes } from '../../../redux/actions';

export const FilterBy = ({ setCurrentPage, setOrden }) => {

  // Ejecuto las funciones de las actions
  const dispatch = useDispatch();

  // Me traigo los estados de la store
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
    dispatch(filterPokemonByType(e.target.value));
    e.preventDefault();
    setCurrentPage(1);
  };


  return (
    <div>
      <div className={styles.containerMain}>

        {/* Filter by Api/Created */}
        <select className={styles.filters} onChange={(e) => (handleFilterPokemonByDbOrApi(e))}>
          <option>Filter by api/db:</option>
          <option value='allPokemon'>All pokemon</option>
          <option value='api'>Api pokemon</option>
          <option value='db'>Db pokemon</option>
        </select>

        {/* Filter by Type  */}
        <select className={styles.filters} onChange={(e) => (handleFilterPokemonByType(e))}>
          <option>Filter by type:</option>
          <option value='allTypes'>All Types</option>
          {allTypes.map((el) => {
              return (
                <option key={el.id} value={el.name} >{el.name} </option>
              )
            })}
        </select>
      </div>
    </div>
  )
}
