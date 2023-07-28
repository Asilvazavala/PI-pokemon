require('dotenv').config()
const axios = require("axios").default;
const { Pokemon, Type } = require("../db");

const getPokemonDetail = async (id) => {
  const numericId = !isNaN(+id)
  if (numericId) {
    const fetchedPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      headers: {
        "Accept-Encoding": "null",
      },    
    });
    return fetchedPokemon.data;
  }

  const detail = await Pokemon.findOne({
    where: { id },
    include: Type
  });
  if (!detail) throw { message: "Not Found!" };
  return detail;
};

module.exports = getPokemonDetail;