import { useSelector } from 'react-redux';
import { updatePage } from '../redux/actions'
import { useFunctions } from './useFunctions';

export const usePaginate = () => {
  const { dispatch } = useFunctions();
  const pokemonPerPage = 12;

  const allPokemon = useSelector((state) => state.allPokemon);
  const pokemon = useSelector((state) => state.pokemon);
  const currentPage = useSelector((state) => state.currentPage);
  const currentPokemon = useSelector((state) => state.currentPokemon);

  const pageNumber = []
  for (let i = 1; i <= Math.ceil(pokemon.length/pokemonPerPage); i++) {
    pageNumber.push(i)
  }  

  const setPage = (page) => {
    dispatch(updatePage(page));
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      dispatch(updatePage(currentPage - 1))
    }
  }

  const goToNextPage = () => {
    if (currentPage < pageNumber.length) {
      dispatch(updatePage(currentPage + 1))
    }
  }
  
  return { 
    allPokemon, 
    pokemon, 
    currentPage, 
    pokemonPerPage,
    setPage,
    goToPrevPage,
    goToNextPage, 
    pageNumber,
    currentPokemon
   }
}
