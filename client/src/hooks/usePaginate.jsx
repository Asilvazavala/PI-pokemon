import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

export const usePaginate = () => {
  const pokemonPerPage = 12;
  
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPokemon, setCurrentPokemon] = useState([]);

  const allPokemon = useSelector((state) => state.allPokemon);
  const pokemon = useSelector((state) => state.pokemon);

  const pageNumber = []
  for (let i = 1; i <= Math.ceil(allPokemon.length/pokemonPerPage); i++) {
    pageNumber.push(i)
  }

  const setPage = (page) => {
    setCurrentPage(page)
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevState => prevState - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < pageNumber.length) {
      setCurrentPage(prevState => prevState + 1)
    }
  }

  useEffect(() => {    
    const firstPokemonIndex = (currentPage - 1) * pokemonPerPage;
    const lastPokemonIndex = firstPokemonIndex + pokemonPerPage;
    setCurrentPokemon(allPokemon.slice(firstPokemonIndex, lastPokemonIndex));
  },[currentPage, allPokemon])  

  
  return { 
    allPokemon, 
    pokemon, 
    currentPage, 
    setCurrentPage, 
    currentPokemon, 
    pokemonPerPage,
    setPage,
    goToPrevPage,
    goToNextPage, 
    pageNumber
   }
}
