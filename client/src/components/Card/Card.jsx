import styles from './Card.module.css';
import { useEffect } from 'react';
import { getAllPokemon } from '../../redux/actions';
import colorType from '../../Helpers/ColorTypes.module.css';
import { usePaginate } from '../../hooks/usePaginate'
import { useFunctions } from '../../hooks/useFunctions'
import { SLCards } from '../SkeletonLoader/SLCards';

export const Card = () => {
  const { currentPokemon } = usePaginate();
  const { Link, goTop, dispatch } = useFunctions();
  
  useEffect(() => {
    if (currentPokemon.length === 0) {
      dispatch(getAllPokemon());
    }
  }, []);

  return (
    <main>
      <ul className={styles.cardContainer}>
      {
        currentPokemon.length > 0 
        ? currentPokemon.slice(0, 12).map((el) => {
          const typeClassesDB = el.types.map((type) => [type.name])
          const typeClassesApi = el.types.map(el=> [el])
          return ( 
          <section key = {el.id} >
            <li className={styles.card}>          
              <Link className={styles.Link} onClick={goTop} to= {`/details/${el.id}`}>
                <img 
                  className={styles.imgCard} 
                  src={el.image} 
                  alt={el.name} 
                />

                <span className={styles.fullInfo}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M17.303 5.197A7.5 7.5 0 006.697 15.803a.75.75 0 01-1.061 1.061A9 9 0 1121 10.5a.75.75 0 01-1.5 0c0-1.92-.732-3.839-2.197-5.303zm-2.121 2.121a4.5 4.5 0 00-6.364 6.364.75.75 0 11-1.06 1.06A6 6 0 1118 10.5a.75.75 0 01-1.5 0c0-1.153-.44-2.303-1.318-3.182zm-3.634 1.314a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68z" clipRule="evenodd" />
                  </svg>
                  Click to see full info!
                </span>

                <p className={styles.numberCard}>{`N.° ${el.id}`}</p>
                <h2 className={styles.titleCard}>{el.name}</h2>

                <section className={styles.typesContainer}> 
                  {!el.createdInDB 
                    ? typeClassesApi.map((type, index) => (
                        <span key={index} className={`${colorType[type]} ${styles.typesCard}`}>
                          {type}
                        </span>
                      ))
                    : typeClassesDB.map((type, index) => (
                        <span key={index} className={`${colorType[type]} ${styles.typesCard}`}>
                          {type}
                        </span>
                      ))
                  }
                </section>
              </Link>
            </li>                      
          </section>
          )
        }) 
        : <SLCards />
       }
      </ul>  
    </main>
  )
}
