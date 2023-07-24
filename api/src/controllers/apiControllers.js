const axios = require('axios');
const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const { Pokemon, Type } = require('../db');
const { Router } = require('express');
const router = Router();

// Obtener info de la Api
const getApiInfo = async () => {
  // Crear array y pushearle la primer página con 20 pokemon 
  const fisrtPage = await axios.get(API_URL);
  const pokemon = [];
  pokemon.push(...fisrtPage.data.results);

  // Agregar pokemon del 20 al 100
  let offset = 20;
  for(let i = 0;  i < 4; i++) {
    let apiUrl = await axios.get(`${API_URL}?offset=${offset}&limit=20`)
    pokemon.push(...apiUrl.data.results);

    offset += 20;
  }
  
  // Mostrar los datos necesarios 
  const apiInfo = pokemon.map(async (el) => {
    const data = await axios.get(`${API_URL}/${el.name}`);
    return {
      id: data.data.id,
      name: data.data.forms[0].name.charAt(0).toUpperCase() + data.data.forms[0].name.slice(1),
      image: data.data.sprites.other.home.front_default,
      types: data.data.types.map(el => el.type.name.charAt(0).toUpperCase() + el.type.name.slice(1)),
      hp: data.data.stats[0].base_stat,
      attack: data.data.stats[1].base_stat,
      defense: data.data.stats[2].base_stat,
      speed: data.data.stats[5].base_stat,
      height: data.data.height,
      weight: data.data.weight,
    };
});
  const finalData = await Promise.all(apiInfo).then((data) => data);
  return finalData
};


// Obtener info de mi DB 
const getDbInfo = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
    through: {
      attributes: [],
      },
    }
  })
};


// Unir la info de la Api y la info de  mi DB
const getAllPokemon = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allInfo = apiInfo.concat(dbInfo);
  return allInfo;
};


module.exports = { router, getAllPokemon };