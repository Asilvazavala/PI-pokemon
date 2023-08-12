import { useFunctions } from './useFunctions';
import { useNotification } from './useNotification';
import { getPokemonDetail, deletePokemon } from '../redux/actions';
import { useState, useEffect } from 'react';

export const useDetails = () => {
  const { dispatch, id, useSelector, history, Link } = useFunctions();
  const { notificationSuccess } = useNotification();

  const pokemonDetail = useSelector((state) => state.detail)
  const pokemon = useSelector((state) => state.allPokemon)

  const typeClassesDB = pokemonDetail[0]?.types.map(el => el.name)
  const typeClassesApi = pokemonDetail[0]?.types

  const [showModal, setShowModal] = useState(false)

  const [nextPokemon, setNextPokemon] = useState(parseInt(id) + 1)
  const findNext = nextPokemon > 100 
    ? pokemon.find(el => el.id === 1) 
    : pokemon.find(el => el.id === nextPokemon)

    const [prevPokemon, setPrevPokemon] = useState(parseInt(id) - 1)
    const findPrev = prevPokemon < 1 
    ? pokemon.find(el => el.id === 100) 
    : pokemon.find(el => el.id === prevPokemon)
  
  function handleGoHome() {
    pokemonDetail.length = 0;
    history('/home');
  }

  function handleNextPokemon() {
    if(nextPokemon > 100) {
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
      dispatch(getPokemonDetail(100));
    } else {
        pokemonDetail.length = 0;
        dispatch(getPokemonDetail(prevPokemon));
      } 
  }

  const handleDelete = () => {
    dispatch(deletePokemon(id));
    pokemonDetail.length = 0;
    notificationSuccess('Pokemon deleted sucessfully!!');
    
    setTimeout(() => {
      history('/home');
    },2500)
  }

  useEffect(() => {
    setNextPokemon(parseInt(id) + 1);
    setPrevPokemon(parseInt(id) - 1);
  }, [id]);

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
