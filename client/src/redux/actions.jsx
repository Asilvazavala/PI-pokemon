import axios from 'axios';

// GET ALL POKEMON--------------------------------------------------------------------------------
export const getAllPokemon = () => {
  return async (dispatch) => {
    let json = await axios.get(`/pokemon`);
    return dispatch({
      type: 'GET_POKEMON',
      payload: json.data
    })
  }
};
export const GET_POKEMON = 'GET_POKEMON';

// GET ALL TYPES--------------------------------------------------------------------------------
export const getAllTypes = () => {
  return async (dispatch) => {
    let json = await axios.get(`/type`);
    return dispatch({
      type: 'GET_TYPES',
      payload: json.data
    })
  }
};
export const GET_TYPES = 'GET_TYPES';

// SEARCH POKEMON BY NAME-------------------------------------------------------------------------
export const searchPokemonByName = (search) => {
  return async (dispatch) => {
    try {
      let json = await axios.get(`/pokemon?name=${search}`);
      return dispatch({
        type: 'SEARCH_POKEMON_BY_NAME',
        payload: json.data
      })
    }
    catch(error) {
      alert(`Pokemon "${search}" not found, try with another`)
    }
  }
};
export const SEARCH_POKEMON_BY_NAME = 'SEARCH_POKEMON_BY_NAME';

// ORDER POKEMON BY NAME--------------------------------------------------------------------------
export const orderPokemonByName = (payload) => {
  return {
    type: 'ORDER_POKEMON_BY_NAME',
    payload
  }
};
export const ORDER_POKEMON_BY_NAME = 'ORDER_POKEMON_BY_NAME';

// ORDER POKEMON BY ATTACK--------------------------------------------------------------------------
export const orderPokemonByAttack = (payload) => {
  return {
    type: 'ORDER_POKEMON_BY_ATTACK',
    payload
  }
};
export const ORDER_POKEMON_BY_ATTACK = 'ORDER_POKEMON_BY_ATTACK';

// FILTER POKEMON BY DB OR API---------------------------------------------------------------------
export const filterPokemonByDbOrApi = (payload) => {
  return {
    type: 'FILTER_POKEMON_BY_DB_OR_API',
    payload
  }
};
export const FILTER_POKEMON_BY_DB_OR_API= 'FILTER_POKEMON_BY_DB_OR_API';

// FILTER_POKEMON_BY_TYPE-------------------------------------------------------------------------
export const filterPokemonByType = (payload) => {
  return {
    type: 'FILTER_POKEMON_BY_TYPE',
    payload
  }
};
export const FILTER_POKEMON_BY_TYPE= 'FILTER_POKEMON_BY_TYPE';

// GET POKEMON DETAIL-----------------------------------------------------------------------------
export const getPokemonDetail = (id) => {
  return async function(dispatch) {
    try {
      let json = await axios.get(`/pokemon/${id}`);
      return dispatch ({
        type: 'GET_POKEMON_DETAIL',
        payload: json.data
      })
    }
    catch(error) {
      console.log(error);
    }
  }
};
export const GET_POKEMON_DETAIL= 'GET_POKEMON_DETAIL';

// POST POKEMON -----------------------------------------------------------------------------------
export const postPokemon = (payload) => {
  return async function ()  {
    const newPokemon = await axios.post(`/pokemon`, payload);
    return newPokemon;
  }
};
export const POST_POKEMON= 'POST_POKEMON';

// DELETE POKEMON -----------------------------------------------------------------------------------
export const deletePokemon = (id) => {
  return async function() {
    const deletePokemon = await axios.delete(`/pokemon/${id}`);
    return deletePokemon;
  }
};
export const DELETE_POKEMON= 'DELETE_POKEMON';

// UPDATE POKEMON -----------------------------------------------------------------------------------
export const updatePokemon = (id, payload) => {
  return async function ()  {
    const updatePokemon = await axios.put(`/pokemon/${id}`, payload);
    return updatePokemon;
  }
};
export const UPDATE_POKEMON= 'UPDATE_POKEMON';

// RESET POKEMON -----------------------------------------------------------------------------------
export const resetPokemon = () => {
  return {
    type: RESET_POKEMON,
  }
}
export const RESET_POKEMON= 'RESET_POKEMON';

