import { useDispatch, useSelector } from 'react-redux';
import { searchPokemonByName, getAllPokemon } from '../redux/actions';
import { Link, useNavigate, useParams, useLocation, NavLink } from 'react-router-dom';

export const useFunctions = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  return { dispatch, searchPokemonByName, getAllPokemon, Link, history, id, useSelector, location, NavLink }
}
