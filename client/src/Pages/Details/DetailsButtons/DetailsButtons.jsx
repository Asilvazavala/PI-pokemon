import styles from './DetailsButtons.module.css';
import { useState } from 'react';
import { Modal } from '../../../components/Modal/Modal';
import { useFunctions } from '../../../hooks/useFunctions';
import { useNotification } from '../../../hooks/useNotification';
import { useDetails } from '../../../hooks/useDetails';

export const DetailsButtons = () => {
  const { history, dispatch, id, Link, resetPokemon, deletePokemon } = useFunctions();
  const { notificationSuccess } = useNotification();
  const { pokemonDetail } = useDetails();
  const [showModal, setShowModal] = useState(false)


  const handleDelete = () => {
    dispatch(deletePokemon(id));
    pokemonDetail.length = 0;
    notificationSuccess('Pokemon deleted sucessfully!!');
    dispatch(resetPokemon());
    setTimeout(() => {
      history('/home');
    },2000)
  }

  return (
    <main className={pokemonDetail.length > 0 ? styles.containerButtons : styles.hideButton }>

      <button
        className={id.length > 8 ? `${styles.buttonsDetail} ${styles.buttonDelete}` : styles.hideButton}
        onClick={() => setShowModal(true)}>Delete</button>
      {
        showModal && <Modal  
        setShowModal={setShowModal}
        titulo='titulo' 
        mensaje='mensaje' 
        textButton1='Accept' 
        textButton2='Cancel' 
        handleFunction={handleDelete}
        />
      }

      <Link to = {`/create/${id}`}>
        <button 
          className={id.length > 8 ? `${styles.buttonsDetail} ${styles.buttonUpdate}` : styles.hideButton}
        >Update
        </button>
      </Link>
    </main>
  )
}
