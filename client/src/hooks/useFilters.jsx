import { resetPokemon, setActiveFilters, resetFilters, filterPokemon, updatePage } from '../redux/actions';
import { useFunctions } from '../hooks/useFunctions'
import { useState, useEffect, useRef } from 'react'

export const useFilters = () => {
  const { dispatch, useSelector } = useFunctions();
  const [selectedType, setSelectedType] = useState(null);
  
  const [isOpen, setIsOpen] = useState({
    orderBy: false,
    selectSource: false
  });

  const [isRotated, setIsRotated] = useState({
    orderBy: false,
    selectSource: false
  });

  const allTypes = useSelector((state) => state.types);
  const activeFilters = useSelector((state) => state.activeFilter);
  
  const orderByRef = useRef(null);
  const selectSourceRef = useRef(null);

  useEffect(() => {
    handleReset();

    const handleClickOutside = (event) => {
      if (
        orderByRef.current &&
        !orderByRef.current.contains(event.target) &&
        selectSourceRef.current &&
        !selectSourceRef.current.contains(event.target)
      ) {
        setIsOpen({
          orderBy: false,
          selectSource: false
        });

        setIsRotated({
          orderBy: false,
          selectSource: false
        });
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  },[])

  const handleOrderPokemonByName = (e) => {
    dispatch(updatePage(1));
    dispatch(setActiveFilters(e.target.id, 'order'));
    dispatch(filterPokemon());
    e.preventDefault();
    toggleMenu('orderBy');
  };

  const handleOrderPokemonByNumber = (e) => {
    dispatch(updatePage(1));
    dispatch(setActiveFilters(e.target.id, 'order'));
    dispatch(filterPokemon());
    e.preventDefault();
    toggleMenu('orderBy');
  };

  const handleFilterPokemonByDbOrApi = (e) => {
    dispatch(updatePage(1));
    dispatch(setActiveFilters(e.target.id, 'source'));
    dispatch(filterPokemon());
    e.preventDefault();
    toggleMenu('selectSource');
  };

  const handleFilterPokemonByType = (e) => {
    dispatch(updatePage(1));
    const typeId = e.target.id;
    dispatch(setActiveFilters(typeId, 'type'));
    dispatch(filterPokemon())
    e.preventDefault();

    if (selectedType === typeId) {
      setSelectedType(null);
    } else {
        setSelectedType(typeId);
      }
  };

  const handleReset = () => {
    dispatch(updatePage(1));
    dispatch(resetPokemon());
    dispatch(resetFilters());
    setSelectedType(null);
  };
  
  const toggleMenu = (menu) => {
    setIsOpen((prevOpen) => ({
      ...prevOpen,
      [menu]: !prevOpen[menu]
    }));
  
    setIsRotated((prevRotated) => ({
      ...prevRotated,
      [menu]: !prevRotated[menu]
    }));
  };

  return { 
    handleOrderPokemonByName, 
    handleOrderPokemonByNumber, 
    handleFilterPokemonByDbOrApi, 
    handleFilterPokemonByType,
    handleReset,
    isOpen, 
    isRotated, 
    toggleMenu,
    allTypes, 
    orderByRef, 
    selectSourceRef,
    selectedType,
    activeFilters,
  }
}
