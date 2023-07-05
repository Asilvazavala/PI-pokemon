import { useState } from 'react'
import { useFunctions } from './useFunctions'
import { usePaginate } from './usePaginate'
import { useNotification } from './useNotification'

export const useSearchBar = () => {
  const { dispatch, history, searchPokemonByName } = useFunctions();
  const { setCurrentPage } = usePaginate();
  const { notificationError } = useNotification();
  
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');
  const [sidebarState, setSidebarState] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {    
    e.preventDefault();
    if (!search) {
      return notificationError('Enter a valid pokemon please')
    }
    dispatch(searchPokemonByName(search));
    setSearch('');
    setCurrentPage(1);
    history('/home');    
  };

  const handleResults = (items) => {
    setResults(items);
  };

  const handleItemSelected = (item) => {  
    setSearch(item)
    setCurrentPage(1);
    dispatch(searchPokemonByName(item))
    setSearch('');
    history('/home');
  }

  return { results, handleChange, handleSubmit, handleResults, handleItemSelected, search, sidebarState, setSidebarState }
}