import {useEffect} from 'react';
import styles from './Card.module.css';
import { usePaginate } from '../../hooks/usePaginate'
import { useFunctions } from '../../hooks/useFunctions'

export const Card = () => {
  const { currentPokemon } = usePaginate();
  const { dispatch, getAllPokemon, Link } = useFunctions();

  useEffect(() => {    
    if (currentPokemon.length === 0) {
      dispatch(getAllPokemon());
    }
  },[currentPokemon, dispatch, getAllPokemon])  

  return (
    <main>
      <ul className={styles.cardContainer}>
      
      {
        currentPokemon.length > 0 ? 
        currentPokemon.map((el) => {
          const typeClassesDB = el.types.map((type) => [type.name])
          const typeClassesApi = el.types.map(el=> [el])
          return ( 
          <section 
            title='Clic to see more details' key = {el.id} >
            <li className={styles.card}>          
              <Link className={styles.Link} to= {`/details/${el.id}`}>
                <img 
                  className={styles.imgCenter} 
                  src={el.image} 
                  id={'image'} 
                  alt={el.name} 
                  width='200px' 
                  height='200px'
                />
                <h1 className={styles.textBig}>{el.name}</h1>
                <h2 className={styles.textMedium}> 
                {!el.createdInDB 
                  ? typeClassesApi.map((type, index) => (
                      <span key={index} className={styles[type]}>
                        {type}
                      </span>
                    ))
                  : typeClassesDB.map((type, index) => (
                      <span key={index} className={styles[type]}>
                        {type}
                      </span>
                    ))
                }
                </h2>
                <h3 className={styles.textMedium}>{`N.° ${el.id}`}</h3>
              </Link>
            </li>                      
          </section>
          )
        }) 
        : <span className={styles.loader}></span>
       }

      </ul>  
    </main>
  )
}
