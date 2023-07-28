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
  SET_PAGE
} from './actions';

const initialState = {
  pokemon: [],
  allPokemon: [],
  types: [],
  detail: [],
  activeFilter: {
    order: null,
    source: null,
    type: null
  },
  currentPage: 1,
  currentPokemon: [],
}

const rootReducer = (state = initialState, action) => {
  const { notificationError } = useNotification();
  switch(action.type) {
    case GET_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
        allPokemon: action.payload,
        currentPokemon: action.payload
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case SEARCH_POKEMON_BY_NAME:
      
      return {
        ...state,
        currentPokemon: action.payload,
        pokemon: action.payload
      };

    case FILTER_POKEMON:
      let filter = [...state.allPokemon];

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
            filter = state.currentPokemon
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
        currentPokemon: filter,
        pokemon: filter
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
      return {
        ...state,
        activeFilter: {
          ...state.activeFilter,
          [action.filterType]: state.activeFilter[action.filterType] === action.payload
            ? null
            : action.payload
        }
      };

    case RESET_FILTERS:
      const resetFilters = {
        order: null,
        source: null,
        type: null
      };
    
      return {
        ...state,
        activeFilter: resetFilters
      };

    case RESET_POKEMON:      
      return {
        ...state,
        currentPokemon: state.allPokemon,
        pokemon: state.allPokemon
      }
    
    case SET_PAGE:
      state.currentPage = action.payload;

      const firstPokemonIndex = (state.currentPage - 1) * 12;
      const lastPokemonIndex = firstPokemonIndex + 12;
      const currentPokemon = state.pokemon.slice(firstPokemonIndex, lastPokemonIndex);
      return {
        ...state,
        currentPokemon: currentPokemon
      }

        
      default:
        return state;
    }
  }


export default rootReducer;