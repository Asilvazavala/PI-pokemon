import { useNotification } from '../hooks/useNotification';

import {
  GET_POKEMON,
  GET_TYPES,
  SEARCH_POKEMON_BY_NAME,
  ORDER_POKEMON_BY_NAME,
  ORDER_POKEMON_BY_ATTACK,
  FILTER_POKEMON_BY_DB_OR_API,
  FILTER_POKEMON_BY_TYPE,
  GET_POKEMON_DETAIL,
  POST_POKEMON,
  DELETE_POKEMON,
  UPDATE_POKEMON,
  SET_ACTIVE_FILTERS,
  RESET_FILTERS,
  RESET_POKEMON
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

    case ORDER_POKEMON_BY_NAME:
      const sortedPokemonName = [...state.allPokemon];
      const orderName = action.payload === 'A-Z' 
        ? sortedPokemonName.sort((a, b) => a.name.localeCompare(b.name)) 
        : sortedPokemonName.sort((a, b) => b.name.localeCompare(a.name)); 

      return {
        ...state,
        allPokemon: orderName
      }
      
    case ORDER_POKEMON_BY_ATTACK:
      const sortedPokemon = [...state.allPokemon]; 
      const orderAttack = action.payload === 'Worst-attack' 
        ? sortedPokemon.sort((a, b) => a.attack - b.attack) 
        : sortedPokemon.sort((a, b) => b.attack - a.attack); 
        
      return {
        ...state,
        allPokemon: orderAttack
      };

    case FILTER_POKEMON_BY_DB_OR_API:
      const filterPokemonByDbOrApi = action.payload === 'Custom'
        ? state.pokemon.filter(el => el.createdInDB)
        : state.pokemon.filter(el => !el.createdInDB);

      return {
        ...state,
        allPokemon: filterPokemonByDbOrApi
      }

    case FILTER_POKEMON_BY_TYPE:
      const allPokemonTypes = state.pokemon
      const filterTypeDb = allPokemonTypes.filter(el => {
        if(el.createdInDB) {
          let typeDb = el.types
          return typeDb.map(el => el.name).includes(action.payload)
        }
      })

      const filterTypeApi = allPokemonTypes.filter(el => {
        if(el.types) {
          const typeApi = el.types
          return typeApi.includes(action.payload)
        }
      })

      const allTypes = filterTypeApi.concat(filterTypeDb);
      const resultFilter = () => {  
        if (!allTypes.length) {
          notificationError(`No pokemon of type "${action.payload}" try with another`)
            return state.allPokemon
          } else {
              return allTypes;
            }
        }
      return {
        ...state,
        allPokemon: resultFilter()
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