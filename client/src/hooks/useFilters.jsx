import { getAllTypes, resetPokemon, setActiveFilters, resetFilters, filterPokemon } from '../redux/actions';
import { useFunctions } from '../hooks/useFunctions'
import { usePaginate } from '../hooks/usePaginate'
import { useState, useEffect, useRef } from 'react'

export const useFilters = () => {
  const { dispatch, useSelector } = useFunctions();
  const { setOrden, setCurrentPage } = usePaginate();

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
    dispatch(getAllTypes());

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
  },[dispatch])

  const handleOrderPokemonByName = (e) => {
    dispatch(setActiveFilters(e.target.id, 'order'));
    dispatch(filterPokemon());
    e.preventDefault();
    setOrden(`Ordenado ${e.target.id}`);
    setCurrentPage(1);
    toggleMenu('orderBy')
  };

  const handleOrderPokemonByAttack = (e) => {
    dispatch(setActiveFilters(e.target.id, 'order'));
    dispatch(filterPokemon());
    e.preventDefault();
    setOrden(`Ordenado ${e.target.id}`);
    setCurrentPage(1);
    toggleMenu('orderBy');
  };

  const handleFilterPokemonByDbOrApi = (e) => {
    dispatch(setActiveFilters(e.target.id, 'source'));
    dispatch(filterPokemon());
    e.preventDefault();
    setOrden(`Ordenado ${e.target.id}`);
    setCurrentPage(1);
    toggleMenu('selectSource');
  };

  const handleFilterPokemonByType = (e) => {
    const typeId = e.target.id;
    dispatch(setActiveFilters(typeId, 'type'));
    dispatch(filterPokemon())
    e.preventDefault();
    setCurrentPage(1);

    if (selectedType === typeId) {
      setSelectedType(null);
    } else {
        setSelectedType(typeId);
      }
  };

  const handleReset = () => {
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
    handleOrderPokemonByAttack, 
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
