import {useEffect, useState} from 'react';
import styles from './Card.module.css';
import { usePaginate } from '../../hooks/usePaginate'
import { useFunctions } from '../../hooks/useFunctions'

export const Card = () => {
  const { currentPokemon } = usePaginate();
  const { dispatch, getAllPokemon, Link } = useFunctions();

  // Ejecuto en automático la action para obtener la info de la DB y actualizar las card
  useEffect(() => {
  dispatch(getAllPokemon());
  },[])

  // Recargar todos los pokemon 
  const handleLoadPokemon = (e) => {
    e.preventDefault();
    dispatch(getAllPokemon());
  };

  // const [mainImage, setMainImage] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)
  
 const changeImage = (el) => {  
  const URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${el.id}.gif`  
  const indexChange = currentPokemon.findIndex(e => e.id === el.id) 
  const change = currentPokemon[indexChange].image = URL 
  setCurrentImage(change)
  dispatch(getAllPokemon())
 }

 const regretImage = (el) => {
  const URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${el.id}.png`
  const indexChange = currentPokemon.findIndex(e => e.id === el.id) 
  currentPokemon[indexChange].image = URL
 }


  return (
    <div>
      <button 
        className={currentPokemon.length > 0 ? `${styles.buttonLoad} d-flex mt-2` : styles.hideElement} 
        onClick={handleLoadPokemon} 
        >Load Pokemon
      </button>
      <ul className={styles.cardContainer}>
      
      {
        currentPokemon.length > 0 ? 
        currentPokemon.map((el) => {
          return ( 
          <div 
            // onMouseEnter={() => changeImage(el)} 
            // onMouseLeave={() => regretImage(el)} 
            title='Clic to see more details' key = {el.id} >
            <li className={styles.card}>          
              <Link className={styles.Link} to= {`/details/${el.id}`}>
                  {/* Elementos de la card */}
                  <img 
                    className={styles.imgCenter} 
                    src={el.image} id={'image'} alt={el.name} width='200px' height='200px'/>
                  <h1 className={styles.textBig}>{el.name}</h1>
                  <h2 className={styles.textMedium}>Type(s): {!el.createdInDB ? `${el.types}` : `${el.types.map(el => el.name)}`}</h2>
                  <h3 className={styles.textMedium}>{`Pokedex Id: ${el.id}`}</h3>
              </Link>
            </li>                      
          </div>
          )
        }) 
        : <span className={styles.loader}></span>
       }

      </ul>  
    </div>
  )
}
