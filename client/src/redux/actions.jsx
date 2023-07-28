import axios from 'axios';
import { useNotification } from '../hooks/useNotification';

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
    const { notificationError } = useNotification();
    try {
      let json = await axios.get(`/pokemon?name=${search}`);
      return dispatch({
        type: 'SEARCH_POKEMON_BY_NAME',
        payload: json.data
      })
    }
    catch(error) {
      return notificationError(`Pokemon "${search}" not found, try with another`)
    }
  }
};
export const SEARCH_POKEMON_BY_NAME = 'SEARCH_POKEMON_BY_NAME';


// FILTER POKEMON---------------------------------------------------------------------
export const filterPokemon = () => {
  return {
    type: 'FILTER_POKEMON',
  }
};
export const FILTER_POKEMON= 'FILTER_POKEMON';

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
      console.error(error);
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

// ACTIVE FILTERS-----------------------------------------------------------------------------------
export const setActiveFilters = (payload, filterType) => {
      return ({
        type: 'SET_ACTIVE_FILTERS',
        payload,
        filterType
      })
  }
export const SET_ACTIVE_FILTERS = 'SET_ACTIVE_FILTERS';

// RESET FILTERS-----------------------------------------------------------------------------------
export const resetFilters = () => {
      return ({
        type: 'RESET_FILTERS',
      })
  }
export const RESET_FILTERS = 'RESET_FILTERS';

// CHANGE PAGE-----------------------------------------------------------------------------------
export const updatePage = (payload) => {
      return ({
        type: 'SET_PAGE',
        payload
      })
  }
export const SET_PAGE = 'SET_PAGE';

