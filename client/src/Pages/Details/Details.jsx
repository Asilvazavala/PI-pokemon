import { useEffect } from 'react';
import { getPokemonDetail, getAllPokemon } from '../../redux/actions';
import styles from './Details.module.css';
import { NavBar } from '../../components/NavBar/NavBar';
import { DetailsButtons } from './DetailsButtons/DetailsButtons';
import { useFunctions } from '../../hooks/useFunctions';

export const Details = () => {
  const { dispatch, id, useSelector } = useFunctions();
  const pokemonDetail = useSelector((state) => state.detail)

  useEffect(() => {
    if (id) {
      dispatch(getPokemonDetail(id));
      dispatch(getAllPokemon());
    }
  },[dispatch, id]);

  return (
    <main className={styles.containerDetails}>
     <NavBar /> 
     { 
        pokemonDetail.length > 0 
          ?
          <section className={pokemonDetail.length > 0 ? styles.cardContainer : styles.hideDetails}>
            <picture>
              <img 
                className={styles.imgCenter}
                src = {pokemonDetail[0].img ? pokemonDetail[0].img : pokemonDetail[0].image} 
                alt = {pokemonDetail[0].name}
                width = '200px'
                height = '200px' 
              />
            </picture>

            <section>
              <h1 className={styles.textBig}>{pokemonDetail[0].name}</h1>
              <h2 className={styles.textMedium}> Type(s): {!pokemonDetail[0].createdInDB ? pokemonDetail[0].types + ' ' : `${pokemonDetail[0].types.map(el => el.name)}`}</h2>
              <h3 className={styles.textSmall}> Attack: {pokemonDetail[0].attack}</h3>
              <h2 className={styles.textMedium}> Defense: {pokemonDetail[0].defense}</h2>
              <h3 className={styles.textSmall}> Height: {pokemonDetail[0].height}</h3>
              <h2 className={styles.textMedium}> Hp: {pokemonDetail[0].hp}</h2>
              <h3 className={styles.textSmall}> Speed: {pokemonDetail[0].speed}</h3>
              <h2 className={styles.textMedium}> Weight: {pokemonDetail[0].weight}</h2>
              <h3 className={styles.textSmall}> Number: {pokemonDetail[0].id}</h3>
            </section>
          </section> 
          : 
          <aside className={styles.containerLoader}><span className={styles.loader}></span></aside>
     }
      <DetailsButtons pokemonDetail={pokemonDetail} />
    </main>
  )
}
