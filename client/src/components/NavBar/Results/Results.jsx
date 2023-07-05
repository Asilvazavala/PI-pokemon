import {useState, useMemo, useEffect} from 'react';
import { MarkedItem } from '../MarkedItem/MarkedItem';

export const Results = ({ allPokemon, onItemSelected, search, onResultsCalculated, setSidebarState }) => {
  
  // Resultados de la búsqueda en la SearchBar
  const [results, setResults] = useState([]);

  // Actualizar la cantidad de elementos que se muestran
  useEffect(() => {
    onResultsCalculated(results);
  },[results, onResultsCalculated])

  // Hacer la búsqueda y mostrar el resultado
  const findMatch = (allPokemon, search) => {
    let res = allPokemon.filter(el => {
      return el.name.toLowerCase().indexOf(search) >= 0 && search.length > 0
    })
    setResults(res);
    res = res.slice(0, 5)
    return res;
  }

  // Actualizar los elementos mostrados
  const filteredItem = useMemo(() => 
    findMatch(allPokemon, search), 
    [allPokemon, search]); 

  
  return (
    <div>
      {
        search !== '' ?
        filteredItem.map(el => 
          <MarkedItem 
            key={el.id} 
            item={el} 
            search={search}
            onClick={onItemSelected}
            setSidebarState={setSidebarState}
          />)
        : ''
      }
    </div>
  )
}
