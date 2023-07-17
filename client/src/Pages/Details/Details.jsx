import { useEffect } from 'react';
import styles from './Details.module.css';
import { NavBar } from '../../components/NavBar/NavBar';
import { Footer } from '../../components/Footer/Footer';
import { DetailsButtons } from './DetailsButtons/DetailsButtons';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { SkeletonLoaderDetails } from '../../components/SkeletonLoader/SkeletonLoaderDetails';
import { useDetails } from '../../hooks/useDetails';

export const Details = () => {
  const { 
    typeClassesApi, 
    typeClassesDB,
    nextPokemon,
    findNext,
    prevPokemon,
    findPrev,
    Link,
    handleGoHome,
    handleNextPokemon,
    handlePrevPokemon,
    id,
    dispatch,
    getPokemonDetail,
    pokemonDetail,
  } = useDetails()

  useEffect(() => {
    if (id) {
      dispatch(getPokemonDetail(id));
    }
  },[dispatch, id]);

  return (
    <main className={styles.mainContainer}>
     <NavBar /> 

     { 
        pokemonDetail.length > 0 
          ?
          <section className={styles.detailsContainer}>
            {/* <div className={styles.prevNextPokemon}>
              <article className={styles.prevPokemon} onClick={handlePrevPokemon}>
                <Link to= {`/details/${prevPokemon < 1 ? 40 : prevPokemon}`}>
                  <i className='bx bx-left-arrow-circle'></i>
                </Link>
                <p className={styles.id}>N.° {findPrev?.id}</p>
                <p className={styles.name}>{findPrev?.name}</p>
              </article>

              <article className={styles.nextPokemon} onClick={handleNextPokemon}>
                <p className={styles.name}>{findNext?.name}</p>
                <p className={styles.id}>N.° {findNext?.id}</p>
                <Link to= {`/details/${nextPokemon > 40 ? 1 : nextPokemon}`}>
                  <i className='bx bx-right-arrow-circle'></i>
                </Link>
              </article>
            </div> */}


            <header>
              <div>
                <p>{pokemonDetail[0].name}</p>
                <span>N.° {pokemonDetail[0].id}</span>
              </div>

              <div>
                <button onClick={handleGoHome}><i className='bx bx-home'></i></button>
              </div>
            </header>

            <footer>
              <picture>
                <img 
                  src = {pokemonDetail[0].img ? pokemonDetail[0].img : pokemonDetail[0].image} 
                  alt = {pokemonDetail[0].name}
                />
              </picture>

              <aside className={styles.textTypeContainer}>
                <main className={styles.textContainer}>
                  <section>
                    <ProgressBar value={pokemonDetail[0].attack} nameVal='Attack' />
                    <ProgressBar value={pokemonDetail[0].defense} nameVal='Defense' />
                    <ProgressBar value={pokemonDetail[0].height} nameVal='Height' />
                  </section>

                  <section>
                    <ProgressBar value={pokemonDetail[0].hp} nameVal='Hp' />
                    <ProgressBar value={pokemonDetail[0].speed} nameVal='Speed' />
                    <ProgressBar value={pokemonDetail[0].weight} nameVal='Weight' />
                  </section>
                </main>

                <section className={styles.types}>
                  <h2>Types</h2>
                  <footer>
                    {
                      !pokemonDetail[0].createdInDB 
                      ? typeClassesApi.map((type, index) => (
                            <span key={index} className={`${styles[type]} ${styles.typesCard}`}>
                              {type}
                            </span>
                          ))
                      : typeClassesDB.map((type, index) => (
                          <span key={index} className={`${styles[type]} ${styles.typesCard}`}>
                            {type}
                          </span>
                        ))
                    }
                  </footer>
                </section>
              </aside>
            </footer>
          </section> 
          : <SkeletonLoaderDetails />
     }

      {/* <DetailsButtons pokemonDetail={pokemonDetail} /> */}
      <Footer />
    </main>
  )
}
