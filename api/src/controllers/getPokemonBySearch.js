require('dotenv').config()
const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { Op } = require("sequelize");

const getPokemonBySearch = async (search) => {
  const customPokemon = await Pokemon.findAll({
    where: {
      name: {
        [Op.iLike]: `%${search}`,
      },
    },
    include: Type
  });

  if (customPokemon.length > 0) return customPokemon

  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
    const apiPokemon = res.data;
    if (apiPokemon.name) return apiPokemon; 
  } catch (error) {
    console.log(error);
  }

  throw {
    status: false,
    message: 'Not Found!'
  };

}

module.exports = getPokemonBySearch;