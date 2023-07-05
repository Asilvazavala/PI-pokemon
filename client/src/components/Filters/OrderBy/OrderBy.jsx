import styles from './OrderBy.module.css';
import { orderPokemonByName, orderPokemonByAttack } from '../../../redux/actions';
import { useFunctions } from '../../../hooks/useFunctions'

export const OrderBy = ({ setCurrentPage, setOrden }) => {
  const { dispatch } = useFunctions();

  const handleOrderPokemonByName = (e) => {
    dispatch(orderPokemonByName(e.target.value));
    e.preventDefault();
    setOrden(`Ordenado ${e.target.value}`);
    setCurrentPage(1);
  };

  const handleOrderPokemonByAttack = (e) => {
    dispatch(orderPokemonByAttack(e.target.value));
    e.preventDefault();
    setOrden(`Ordenado ${e.target.value}`);
    setCurrentPage(1);
  };


  return (
    <main className={styles.containerMain}>
      <select className={styles.filters} onChange={(e) => (handleOrderPokemonByName(e))}>
        <option>Order by name:</option>
        <option value='A-Z'>A-Z</option>
        <option value='Z-A'>Z-A</option>
      </select>

      <select className={styles.filters} onChange={(e) => (handleOrderPokemonByAttack(e))}>
        <option>Oder by attack:</option>
        <option value='mostAttack'>Most attack</option>
        <option value='worstAttack'>Worst attack</option>
      </select>
    </main>
  )
}
