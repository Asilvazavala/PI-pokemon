import styles from './OrderBy.module.css';
import { useDispatch } from 'react-redux';
import { orderPokemonByName, orderPokemonByAttack } from '../../../redux/actions';

export const OrderBy = ({ setCurrentPage, setOrden }) => {

  // Ejecuto las funciones de las actions
  const dispatch = useDispatch();

  // Cambiar el orden por nombre
  const handleOrderPokemonByName = (e) => {
    dispatch(orderPokemonByName(e.target.value));
    e.preventDefault();
    setOrden(`Ordenado ${e.target.value}`);
    setCurrentPage(1);
  };

  // Cambiar el orden por ataque
  const handleOrderPokemonByAttack = (e) => {
    dispatch(orderPokemonByAttack(e.target.value));
    e.preventDefault();
    setOrden(`Ordenado ${e.target.value}`);
    setCurrentPage(1);
  };


  return (
    <div>
      <div className={styles.containerMain}>
        {/* Order by name */}
        <select className={styles.filters} onChange={(e) => (handleOrderPokemonByName(e))}>
          <option>Order by name:</option>
          <option value='A-Z'>A-Z</option>
          <option value='Z-A'>Z-A</option>
        </select>

        {/* Order by attack */}
        <select className={styles.filters} onChange={(e) => (handleOrderPokemonByAttack(e))}>
          <option>Oder by attack:</option>
          <option value='mostAttack'>Most attack</option>
          <option value='worstAttack'>Worst attack</option>
        </select>
      </div>
    </div>
  )
}
