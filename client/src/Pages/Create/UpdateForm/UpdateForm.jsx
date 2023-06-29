import { useEffect } from 'react';
import styles from './UpdateForm.module.css';
import { updatePokemon, getPokemonDetail, getAllPokemon } from '../../../redux/actions';
import { useFunctions } from '../../../hooks/useFunctions';

export const UpdateForm = ({ input, setInput, disabled }) => {
  const { dispatch, history, id, useSelector } = useFunctions();

  const detail = useSelector((state) => state.detail);  

  // Ejecuto en automático la action para traer la info del pokemon que necesito actualizar
  useEffect(() => {
    if(id) dispatch(getPokemonDetail(id));
  },[dispatch, id])

  // Ejecuto en automático la action para obtener los pokemon 
  useEffect(() => {
    dispatch(getAllPokemon());
  },[dispatch])

  // Al cargar la página con ID, actualizar en los inputs la información del pokemon
  const updateInputs = () => {
    if(detail.length > 0) { 
      setInput({
        name: detail[0].name,
        image: detail[0].img ? detail[0].img : detail[0].image,
        types: detail[0].types.map(el => el.name),
        attack: detail[0].attack,
        defense: detail[0].defense,
        hp: detail[0].hp,
        speed: detail[0].speed,
        height: detail[0].height,
        weight: detail[0].weight,
      })
      detail.length = 0;
    }  
  };

  // Ejecutar updateInputs 
  setTimeout(() => {
    if(id) updateInputs();
  }, "0010") 


  // Actualizar la información del Pokemon en la DB
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updatePokemon(id, input));
    alert('Pokemon modified sucessfully!!')
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
    dispatch(getAllPokemon());
    history.push('/home');
  };

  return (
    <div>
      {/* Button update */}
      <button 
        className={id ? `${styles.buttonUpdate} btn btn-warning` : styles.hideButton} 
        onClick={(e) => handleUpdate(e)}
        disabled={disabled || !input.name}
        type="button"
      >Update Pokemon
      </button>
    </div>
  )
}
