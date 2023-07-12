import { useNotification } from '../hooks/useNotification';

import {
  GET_POKEMON,
  GET_TYPES,
  SEARCH_POKEMON_BY_NAME,
  FILTER_POKEMON,
  GET_POKEMON_DETAIL,
  POST_POKEMON,
  DELETE_POKEMON,
  UPDATE_POKEMON,
  SET_ACTIVE_FILTERS,
  RESET_FILTERS,
  RESET_POKEMON,
} from './actions';

const initialState = {
  pokemon: [],
  allPokemon: [],
  types: [],
  allTypes: [],
  detail: [],
  activeFilter: {
    order: null,
    source: null,
    type: null
  }
}

const rootReducer = (state = initialState, action) => {
  const { notificationError } = useNotification();
  switch(action.type) {
    case GET_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
        allPokemon: action.payload,
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
        allTypes: action.payload
      };

    case SEARCH_POKEMON_BY_NAME:
      
      return {
        ...state,
        allPokemon: action.payload
      };

    case FILTER_POKEMON:
      let filter = [...state.pokemon];

      if (state.activeFilter.source === 'Custom') {
        filter = filter.filter(el => el.createdInDB);
      }

      if (state.activeFilter.source === 'Api') {
        filter = filter.filter(el => !el.createdInDB);
      }

      if(state.activeFilter.type !== null) {
        const filterTypeDb = filter.filter(el => {
          if(el.createdInDB) {
            let typeDb = el.types
            return typeDb.map(el => el.name).includes(state.activeFilter.type)
          }
        })
  
        const filterTypeApi = filter.filter(el => {
          if(el.types) {
            const typeApi = el.types
            return typeApi.includes(state.activeFilter.type)
          }
        })
  
        const allTypes = filterTypeApi.concat(filterTypeDb);
        if (!allTypes.length) {
          notificationError(`No pokemon of type "${state.activeFilter.type}" try with another`)
            filter = state.allPokemon
          } else {
              filter = allTypes;
            }
      }

      if (state.activeFilter.order === 'A-Z') {
        filter = filter.sort((a, b) => a.name.localeCompare(b.name));
      }

      if (state.activeFilter.order === 'Z-A') {
        filter = filter.sort((a, b) => b.name.localeCompare(a.name)); 
      }

      if (state.activeFilter.order === 'Number Asc') {
        filter = filter.sort((a, b) => a.id - b.id);
      }

      if (state.activeFilter.order === 'Number Des') {
        filter = filter.sort((a, b) => b.id - a.id); 
      }

      return {
        ...state,
        allPokemon: filter
      }

    case GET_POKEMON_DETAIL:
      return{
        ...state,
        detail: action.payload
      }

    case POST_POKEMON:
      return {
        ...state,
      }

    case DELETE_POKEMON:
      return {
        ...state,
      }
      
    case UPDATE_POKEMON:
      return {
        ...state,
      }

    case SET_ACTIVE_FILTERS:      
      let activeFilters = state.activeFilter 

      for (let key in activeFilters) {
        if (key === action.filterType) {
          if (activeFilters[key] === action.payload) {
            activeFilters[key] = null
          } else {
            activeFilters[key] = action.payload
          }
        }
      }
  
      return {
        ...state,
        activeFilter: activeFilters
      }

    case RESET_FILTERS:      
      let resetFilters = state.activeFilter 
      for (let key in resetFilters) {
        resetFilters[key] = null      
    }
  
      return {
        ...state,
        activeFilter: resetFilters
      }

    case RESET_POKEMON:      
      return {
        ...state,
        allPokemon: state.pokemon
      }
    
      default:
        return state;
    }
  }


export default rootReducer;