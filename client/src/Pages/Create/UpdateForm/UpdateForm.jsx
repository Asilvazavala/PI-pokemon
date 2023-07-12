import { useEffect } from 'react';
import styles from './UpdateForm.module.css';
import { useFunctions } from '../../../hooks/useFunctions';
import { useNotification } from '../../../hooks/useNotification';

export const UpdateForm = ({ input, setInput, disabled }) => {
  const { dispatch, history, id, useSelector, resetPokemon, getPokemonDetail, updatePokemon } = useFunctions();
  const { notificationSuccess } = useNotification();
  const detail = useSelector((state) => state.detail);  

  useEffect(() => {
    if (id) { 
      dispatch(getPokemonDetail(id)) 
      dispatch(resetPokemon());
    }
  },[id])

  const updateInputs = () => {
    if(detail.length > 0) { 
      const { name, img, image, types, attack, defense, hp, speed, height, weight } = detail[0];
      setInput({
        name: name,
        image: img ? img : image,
        types: types.map(el => el.name),
        attack: attack,
        defense: defense,
        hp: hp,
        speed: speed,
        height: height,
        weight: weight,
      })
      detail.length = 0;
    }  
  };

  setTimeout(() => {
    if(id) updateInputs();
  }, "0010") 

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updatePokemon(id, input));
    notificationSuccess('Pokemon modified sucessfully!!')
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
    dispatch(resetPokemon());
    history('/home');
  };

  return (
    <main>
      <button 
        className={id ? `${styles.buttonUpdate} btn btn-warning` : styles.hideButton} 
        onClick={(e) => handleUpdate(e)}
        disabled={disabled || !input.name}
        type="button"
      >Update Pokemon
      </button>
    </main>
  )
}
