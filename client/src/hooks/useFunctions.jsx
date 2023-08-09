import { useDispatch, useSelector } from 'react-redux';
import { searchPokemonByName, getAllPokemon, deletePokemon, getPokemonDetail, updatePokemon, postPokemon, resetPokemon } from '../redux/actions';
import { Link, useNavigate, useParams, useLocation, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const useFunctions = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const goTop = () => {
    window.scrollTo({
      top: 0
    })
  }

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    function handleResize () {
      setIsSmallScreen(window.innerWidth < 800)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    };
  }, [])

  return { dispatch, isSmallScreen, goTop, searchPokemonByName, getAllPokemon, deletePokemon, getPokemonDetail, updatePokemon, postPokemon, resetPokemon, Link, history, id, useSelector, location, NavLink }
}
