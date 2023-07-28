const { Pokemon, Type } = require('../db');
const { Router } = require('express');
const router = Router();
const { getAllPokemon } = require('./apiControllers');

// Crear un Pokemon
router.post('/', async (req, res) => {
  let { name, image, types, hp, attack, defense, speed, height, weight, createdInDB } = req.body;
  
  try {
    let newPokemon = await Pokemon.create(
    { name, image, hp, attack, defense, speed, height, weight, createdInDB })
    
    let addTypes = await Type.findAll({ where: { name: types } })
    newPokemon.addType(addTypes);
  
    res.send('Pokemon creado con éxito');
  } catch (error) {
      console.log(error)
      res.status(404).send(error)
    }

});


// Eliminar un Pokemon
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const allPokemon = await getAllPokemon();
  let index = allPokemon.findIndex(el => el.id == id);
  
  try {
    if (index >= 0) {
      allPokemon.splice(index, 1);
      res.send('Pokemon deleted succesfully!!');
    } else {
      res.status(404).send(`Pokemon with ID "${id}" not found, try with another`);
      }
  
    if (id) {
      await Pokemon.destroy({
        where : {id : id}
      })
    }
  } catch (error) {
      console.log(error)
      res.status(404).send(error)
    }
});


// Actualizar un Pokemon
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  // Info a actualizar pasada por el usuario
  let { name, image, types, hp, attack, defense, speed, height, weight,
  } = req.body;

  // Validar si el ID existe en la DB
  try {
    const pokemonToUpdate = await Pokemon.findByPk(id)
    if (!pokemonToUpdate) {
      res.status(400).send(`Pokemon with ID ${id} not found`)
    } else {
      // Actualizar la nueva info en la DB Pokemon
      pokemonToUpdate.update ({
        name, image, hp, attack, defense, speed, height, weight, 
      });

      const typesToUpdate = await Type.findAll({ where: { name: types } });
      await pokemonToUpdate.setTypes([]);
      await pokemonToUpdate.addTypes(typesToUpdate); 

      res.send('Pokemon modified succesfully!!');
      }
  } catch (error) {
      console.log(error)
      res.status(404).send(error)
    }
});

// Obtener todos los nombres de Pokemon || Buscar por nombre
router.get('/', async (req, res) => {
  const { name } = req.query;
  const allPokemon = await getAllPokemon();

  if (name) {
    try {
      const findPokemonName = allPokemon.filter(el => el.name.toLowerCase() === name.toLowerCase());
      if (findPokemonName.length > 0 ) {
        res.send(findPokemonName)
      }
    } catch (error) {
        console.log(error)
        res.status(404).send(`No existe ningún pokemon con nombre "${name}" intenta con otro nombre`);
      }
  } else {
      res.send(allPokemon);
    }
});


// Buscar Pokemon por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const allPokemon = await getAllPokemon();

  if (id) {
    try {
      const findPokemonId = allPokemon.filter(el => el.id == id);
      if (findPokemonId.length > 0) {
        res.send(findPokemonId) 
      } 
    } catch (error) {
        console.log(error)
        res.status(404).send(`No existe ningún pokemon con id "${id}" intenta con otro id`);
      }
  } else {
      res.send(allPokemon);
    }
});

module.exports = router;