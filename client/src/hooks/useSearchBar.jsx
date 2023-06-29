import { useState } from 'react'
import { useFunctions } from './useFunctions'
import { usePaginate } from './usePaginate'

export const useSearchBar = () => {
  const { dispatch, history, searchPokemonByName } = useFunctions();
  const { setCurrentPage } = usePaginate();
  
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');
  const [sidebarState, setSidebarState] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSidebarState(false);
    history('/home');
    setCurrentPage(1);
    dispatch(searchPokemonByName(search));
    setSearch('');
  };

  const handleResults = (items) => {
    setResults(items);
  };

  const handleItemSelected = (item) => {  
    setSearch(item)
    setSidebarState(false);
    history('/home');
    setCurrentPage(1);
    dispatch(searchPokemonByName(item))
    setSearch('');
  }

  return { results, handleChange, handleSubmit, handleResults, handleItemSelected, search, sidebarState, setSidebarState }
}