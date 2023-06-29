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
  RESET_POKEMON
} from './actions';

const initialState = {
  pokemon: [],
  allPokemon: [],
  types: [],
  allTypes: [],
  detail: [],
}

const rootReducer = (state = initialState, action) => {
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
    let orderName = action.payload === 'A-Z' ?
      state.allPokemon.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
            return -1;
        }
        return 0 
      }) : 
      state.allPokemon.sort(function (a, b) {
        if (a.name > b.name) {
          return -1;
        } else if (a.name < b.name) {
            return 1;
        }
        return 0 
      })
      return {
        ...state,
        allPokemon: orderName
      }
      
    case ORDER_POKEMON_BY_ATTACK:
      let orderAttack = action.payload === 'worstAttack' ?
        state.allPokemon.sort(function (a, b) {
          if (a.attack > b.attack) {
            return 1;
          } else if (a.attack < b.attack) {
              return -1;
          }
          return 0 
        }) : 
        state.allPokemon.sort(function (a, b) {
          if (a.attack > b.attack) {
            return -1;
          } else if (a.attack < b.attack) {
              return 1;
          }
          return 0 
        })
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
            alert('No pokemon in the DB yet :(')
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
            alert(`No pokemon of type "${action.payload}" try with another`)
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

    case RESET_POKEMON:
      return { ...state, pokemon: false}
    
      default:
        return state;
    }
  }


export default rootReducer;