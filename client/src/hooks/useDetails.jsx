import { useFunctions } from './useFunctions';
import { useNotification } from './useNotification';
import { getPokemonDetail, deletePokemon, getAllPokemon, resetPokemon } from '../redux/actions';
import { useState } from 'react';

export const useDetails = () => {
  const { dispatch, id, useSelector, history, Link } = useFunctions();
  const { notificationSuccess } = useNotification();

  const pokemonDetail = useSelector((state) => state.detail)
  const pokemon = useSelector((state) => state.pokemon)

  const typeClassesDB = pokemonDetail[0]?.types.map(el => el.name)
  const typeClassesApi = pokemonDetail[0]?.types

  const [showModal, setShowModal] = useState(false)

  const [nextPokemon, setNextPokemon] = useState(parseInt(id) + 1)
  const findNext = nextPokemon > 40 
    ? pokemon.find(el => el.id === 1) 
    : pokemon.find(el => el.id === nextPokemon)

    const [prevPokemon, setPrevPokemon] = useState(parseInt(id) - 1)
    const findPrev = prevPokemon < 1 
    ? pokemon.find(el => el.id === 40) 
    : pokemon.find(el => el.id === prevPokemon)
  
  function handleGoHome() {
    pokemonDetail.length = 0;
    history('/home');
  }

  function handleNextPokemon() {
    if(nextPokemon > 40) {
      pokemonDetail.length = 0;
      dispatch(getPokemonDetail(1));
    } else {
        pokemonDetail.length = 0;
        dispatch(getPokemonDetail(nextPokemon));
      } 
  }

  function handlePrevPokemon() {
    if(prevPokemon < 1) {
      pokemonDetail.length = 0;
      dispatch(getPokemonDetail(40));
    } else {
        pokemonDetail.length = 0;
        dispatch(getPokemonDetail(prevPokemon));
      } 
  }

  const handleDelete = () => {
    dispatch(deletePokemon(id));
    pokemonDetail.length = 0;
    notificationSuccess('Pokemon deleted sucessfully!!');
    dispatch(getAllPokemon());

    setTimeout(() => {
      history('/home');
    },2000)
  }

  return { 
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
    handleDelete,
    id,
    dispatch,
    getPokemonDetail,
    pokemonDetail,
    setNextPokemon,
    setPrevPokemon,
    showModal,
    setShowModal
  }
}
