import styles from './DetailsButtons.module.css';
import { Modal } from '../../../components/Modal/Modal';
import { useFunctions } from '../../../hooks/useFunctions';
import { useNotification } from '../../../hooks/useNotification';

export const DetailsButtons = ({ pokemonDetail }) => {
  const { history, dispatch, id, Link, getAllPokemon, deletePokemon } = useFunctions();
  const { notificationSuccess } = useNotification();

  const handleDelete = () => {
    dispatch(deletePokemon(id));
    pokemonDetail.length = 0;
    notificationSuccess('Pokemon deleted sucessfully!!');
    dispatch(getAllPokemon());
    history('/home');
  }

  return (
    <main className={pokemonDetail.length > 0 ? styles.containerButtons : styles.hideButton }>

      <Link to = '/home'>
        <button 
          className={`${styles.buttonsDetail} ${styles.buttonReturn}`}
          onClick={() => pokemonDetail.length = 0}
          >Return
        </button>
      </Link>

      <Modal handleDelete={handleDelete} pokemonDetail={pokemonDetail} />
      <button 
        className={id.length > 8 ? `${styles.buttonsDetail} ${styles.buttonDelete}` : styles.hideButton}
        data-bs-toggle="modal" 
        data-bs-target="#staticBackdrop"
        >Delete
      </button>

      <Link to = {`/create/${id}`}>
        <button 
          className={id.length > 8 ? `${styles.buttonsDetail} ${styles.buttonUpdate}` : styles.hideButton}
        >Update
        </button>
      </Link>
    </main>
  )
}
