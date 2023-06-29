import { useState } from 'react'
import { useSelector } from 'react-redux';

export const usePaginate = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(12);
  const [orden, setOrden] = useState('');

  const allPokemon = useSelector((state) => state.allPokemon);
  const pokemon = useSelector((state) => state.pokemon);

  // Delimitar el indíce de los pokemon a paginar
  const lastPokemonIndex = currentPage * pokemonPerPage;
  const firstPokemonIndex = lastPokemonIndex - pokemonPerPage;
  const currentPokemon = allPokemon.slice(firstPokemonIndex, lastPokemonIndex);
  
  return { allPokemon, pokemon, currentPage, setCurrentPage, currentPokemon, setOrden, pokemonPerPage }
}
