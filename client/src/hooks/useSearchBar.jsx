import { useState } from 'react';
import { useFunctions } from './useFunctions';
import { useNotification } from './useNotification';
import { searchPokemonByName, updatePage, resetFilters } from '../redux/actions'

export const useSearchBar = () => {
  const { dispatch, history } = useFunctions();
  const { notificationError } = useNotification();
  
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');
  const [sidebarState, setSidebarState] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {    
    dispatch(updatePage(1));
    dispatch(resetFilters());
    e.preventDefault();
    if (!search) {
      return notificationError('Enter a valid pokemon please')
    }
    dispatch(searchPokemonByName(search));
    setSearch('');
    history('/home');    
  };

  const handleResults = (items) => {
    setResults(items);
  };

  const handleItemSelected = (item) => {  
    dispatch(updatePage(1));
    dispatch(resetFilters());
    setSearch(item);
    dispatch(searchPokemonByName(item));
    setSearch('');
    history('/home');
  }

  return { results, handleChange, handleSubmit, handleResults, handleItemSelected, search, sidebarState, setSidebarState }
}