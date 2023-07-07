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
  RESET_POKEMON,
  SET_ACTIVE_FILTERS
} from './actions';

const initialState = {
  pokemon: [],
  allPokemon: [],
  types: [],
  allTypes: [],
  detail: [],
  activeFilter: []
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
      const sortedPokemonName = [...state.allPokemon]; // Crear una copia de la lista de Pokémon
      const orderName = action.payload === 'A-Z' 
        ? sortedPokemonName.sort((a, b) => a.name.localeCompare(b.name)) // Orden ascendente
        : sortedPokemonName.sort((a, b) => b.name.localeCompare(a.name)); // Orden descendente
      return {
        ...state,
        allPokemon: orderName
      }
      
    case ORDER_POKEMON_BY_ATTACK:
      const sortedPokemon = [...state.allPokemon]; // Crear una copia de la lista de Pokémon
      const orderAttack = action.payload === 'worstAttack' 
        ? sortedPokemon.sort((a, b) => a.attack - b.attack) // Orden ascendente
        : sortedPokemon.sort((a, b) => b.attack - a.attack); // Orden descendente
      return {
        ...state,
        allPokemon: orderAttack
      };

    case FILTER_POKEMON_BY_DB_OR_API:
      const filterPokemonByDbOrApi = action.payload === 'db' ? state.pokemon.filter(el => el.createdInDB) : state.pokemon.filter(el => !el.createdInDB)
      const resultfilterPokemonByDbOrApi = () => {
        if (action.payload === 'allPokemon') { 
          return state.pokemon
        } else if (!filterPokemonByDbOrApi.length) {
          notificationError('No pokemon in the DB yet :(')
            return state.allPokemon
          } else {
              return filterPokemonByDbOrApi;
            }
      }
      return {
        ...state,
        allPokemon: resultfilterPokemonByDbOrApi()
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
        if (action.payload === 'allTypes') { 
          return allPokemonTypes 
        } else if (!allTypes.length) {
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
      let activeFilters = [...state.activeFilter] // Crear una copia de la lista de Pokémon
      if (activeFilters.includes(action.payload)) {
        activeFilters = activeFilters.filter((filterType) => filterType !== action.payload);
      } else {
        activeFilters = [...activeFilters, action.payload];
        }
  
      return {
        ...state,
        activeFilter: activeFilters
      }
    
      default:
        return state;
    }
  }


export default rootReducer;