import { useDispatch, useSelector } from 'react-redux';
import { searchPokemonByName, getAllPokemon, deletePokemon, getPokemonDetail, updatePokemon, postPokemon, resetPokemon } from '../redux/actions';
import { Link, useNavigate, useParams, useLocation, NavLink } from 'react-router-dom';

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

  return { dispatch, goTop, searchPokemonByName, getAllPokemon, deletePokemon, getPokemonDetail, updatePokemon, postPokemon, resetPokemon, Link, history, id, useSelector, location, NavLink }
}
