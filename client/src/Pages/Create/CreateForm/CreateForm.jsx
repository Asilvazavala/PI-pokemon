import { useEffect } from 'react';
import styles from './CreateForm.module.css';
import { useFunctions } from '../../../hooks/useFunctions';
import { useNotification } from '../../../hooks/useNotification';

export const CreateForm = ({ input, setInput, disabled }) => {
  const { dispatch, history, id, resetPokemon, postPokemon } = useFunctions();
  const { notificationSuccess } = useNotification();

  useEffect(() => {
    dispatch(resetPokemon());
  },[dispatch])

  function handleSubmit(e) {
    e.preventDefault(); 
    dispatch(postPokemon(input));
    notificationSuccess('Pokemon created succesfully!!'); 
    setInput({
      name: '',
      image: '',
      types: [],
      hp:'',
      attack: '',
      defense: '',
      speed:'',
      height: '',
      weight: '',
    })
    history.push('/home');
  }


  return (
    <main>
      <button 
        className={id ? styles.hideButton : `${styles.buttonCreate} btn btn-primary`} 
        type="button"
        onClick={(e) => handleSubmit(e)}
        disabled={disabled || !input.types.length}
      >Create Pokemon
      </button>
    </main>
  )
}
