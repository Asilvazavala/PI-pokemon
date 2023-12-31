import { useEffect } from 'react';
import styles from './Details.module.css';
import colorType from '../../Helpers/ColorTypes.module.css';
import { NavBar } from '../../components/NavBar/NavBar';
import { Footer } from '../../components/Footer/Footer';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { SLDetails } from '../../components/SkeletonLoader/SLDetails';
import { useDetails } from '../../hooks/useDetails';
import { Modal } from '../../components/Modal/Modal';

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
    showModal,
    setShowModal,
    handleDelete
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
            <div className={pokemonDetail[0].id.length > 10 ? styles.hide : styles.prevNextPokemon}>
              <Link style={{textDecoration: 'none'}} to= {`/details/${prevPokemon < 1 ? 100 : prevPokemon}`}>
                <article className={styles.prevPokemon} onClick={handlePrevPokemon}>
                  <i className='bx bx-left-arrow-circle'></i>
                  <p className={styles.id}>N.° {findPrev?.id}</p>
                  <p className={styles.name}>{findPrev?.name}</p>
                </article>
              </Link>

              <Link style={{textDecoration: 'none'}} to= {`/details/${nextPokemon > 100 ? 1 : nextPokemon}`}>
                <article className={styles.nextPokemon} onClick={handleNextPokemon}>
                  <p className={styles.name}>{findNext?.name}</p>
                  <p className={styles.id}>N.° {findNext?.id}</p>
                  <i className='bx bx-right-arrow-circle'></i>
                </article>
              </Link>
            </div>
          


            <header>
              <div>
                <p>{pokemonDetail[0].name}</p>
                <span>{pokemonDetail[0].id.length > 10 ? '' : `N.° ${pokemonDetail[0].id}`}</span>
              </div>

              <div>
                <button onClick={handleGoHome}><i className='bx bx-home'></i></button>
              </div>
            </header>

            <section className={id.length > 8 ? styles.buttonsContainer : styles.hide}>
              <button
                className={styles.btnDelete}
                onClick={() => setShowModal(true)}>Delete
              </button>
              <Link to = {`/create/${id}`}>
                <button 
                  className={styles.btnUpdate}
                >Update
                </button>
              </Link>
              {
                showModal && <Modal  
                setShowModal={setShowModal}
                titulo='Are you sure?' 
                mensaje={`This action DELETE pokemon "${pokemonDetail[0].name}"`} 
                textButton1='Accept' 
                textButton2='Cancel' 
                handleFunction={handleDelete}
                />
              }
            </section>

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
                  <article>
                    {
                      !pokemonDetail[0].createdInDB 
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
                  </article>
                </section>
              </aside>
            </footer>
          </section> 
          : <SLDetails />
     }
      <Footer />
    </main>
  )
}
