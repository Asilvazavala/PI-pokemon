import { getAllPokemon, deletePokemon } from '../../../redux/actions';
import { Link } from 'react-router-dom';
import styles from './DetailsButtons.module.css';
import { Modal } from '../../../components/Modal/Modal';

export const DetailsButtons = ({ id, pokemonDetail, history, dispatch }) => {

  // Borrar un pokemon
  const handleDelete = () => {
    dispatch(deletePokemon(id));
    pokemonDetail.length = 0;
    alert('Pokemon deleted sucessfully!!');
    dispatch(getAllPokemon());
    history.push('/home');
  }


  return (
    <div className={pokemonDetail.length > 0 ? styles.containerButtons : styles.hideButton }>

      {/* Botón Return */}
      <Link to = '/home'>
        <button 
          className={`${styles.buttonsDetail} ${styles.buttonReturn}`}
          onClick={() => pokemonDetail.length = 0}
          >Return
        </button>
      </Link>

      {/* Botón Delete */}
      <Modal handleDelete={handleDelete} pokemonDetail={pokemonDetail} />
      <button 
        className={id.length > 8 ? `${styles.buttonsDetail} ${styles.buttonDelete}` : styles.hideButton}
        data-bs-toggle="modal" 
        data-bs-target="#staticBackdrop"
        >Delete
      </button>

      {/* Botón Update */}
      <Link to = {`/create/${id}`}>
        <button 
          className={id.length > 8 ? `${styles.buttonsDetail} ${styles.buttonUpdate}` : styles.hideButton}
        >Update
        </button>
      </Link>
    </div>
  )
}
