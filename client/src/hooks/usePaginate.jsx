import { useState } from 'react'
import { useSelector } from 'react-redux';

export const usePaginate = () => {
  const [pokemonPerPage, setPokemonPerPage] = useState(12);
  const [orden, setOrden] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const allPokemon = useSelector((state) => state.allPokemon);
  const pokemon = useSelector((state) => state.pokemon);

  // Delimitar el indíce de los pokemon a paginar
  const lastPokemonIndex = currentPage * pokemonPerPage;
  const firstPokemonIndex = lastPokemonIndex - pokemonPerPage;
  const currentPokemon = allPokemon.slice(firstPokemonIndex, lastPokemonIndex);

  const pageNumber = []
  for (let i = 1; i <= Math.ceil(allPokemon.length/pokemonPerPage); i++) {
    pageNumber.push(i)
  }

  const setPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage !== pageNumber.length) setCurrentPage(currentPage + 1);
  };
  
  return { 
    allPokemon, 
    pokemon, 
    currentPage, 
    setCurrentPage, 
    currentPokemon, 
    setOrden, 
    pokemonPerPage,
    setPage,
    goToPrevPage,
    goToNextPage, 
    pageNumber
   }
}
