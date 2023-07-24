const { Pokemon, Type } = require('../db');
const { Router } = require('express');
const router = Router();
const { getAllPokemon } = require('./apiControllers');

// Crear un Pokemon
router.post('/', async (req, res) => {
  // Nueva info pasada por el usuario
  let { name, image, types, hp, attack, defense, speed, height, weight, createdInDB } = req.body;
  
  // Crear el pokemon en la DB Pokemon
  let newPokemon = await Pokemon.create(
  { name, image, hp, attack, defense, speed, height, weight, createdInDB })
  
  // Agregar el tipo de Pokemon
  let addTypes = await Type.findAll({ where: { name: types } })
  newPokemon.addType(addTypes);

  res.send('Pokemon creado con éxito');

});


// Eliminar un Pokemon
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const allPokemon = await getAllPokemon();
  let index = allPokemon.findIndex(el => el.id == id);
  
  if(index >= 0) {
    allPokemon.splice(index, 1);
    res.send('Pokemon deleted succesfully!!');
  } else {
    res.status(404).send(`Pokemon with ID "${id}" not found, try with another`);
    }

  if(id) {
    await Pokemon.destroy({
      where : {id : id}
    })
  }
});


// Actualizar un Pokemon
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  // Info a actualizar pasada por el usuario
  let { name, image, types, hp, attack, defense, speed, height, weight,
  } = req.body;

  // Validar si el ID existe en la DB
  const findId = await Pokemon.findByPk(id)
  if (!findId) {
    res.status(400).send(`Pokemon with ID ${id} not found`)
  } else {
    // Actualizar la nueva info en la DB Pokemon
    Pokemon.update ({
      name, image, types, hp, attack, defense, speed, height, weight, 
      },
      {
        where : { id, }
      },
    ); 
    res.send('Pokemon modified succesfully!!');
    }

});

// Obtener todos los nombres de Pokemon || Buscar por nombre
router.get('/', async (req, res) => {
  const allPokemon = await getAllPokemon();
  const name = req.query.name;

  if(name) {
    const findPokemonName = allPokemon.filter(el => el.name.toLowerCase() === name.toLowerCase());
    findPokemonName.length > 0 
      ? res.send(findPokemonName) 
      : res.status(404).send(`No existe ningún pokemon con nombre "${name}" intenta con otro nombre`);
  } else {
      res.send(allPokemon);
    }
});


// Buscar Pokemon por ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const allPokemon = await getAllPokemon();

  if(id) {
    const findPokemonId = allPokemon.filter(el => el.id == id);
    findPokemonId.length > 0 
      ? res.send(findPokemonId) 
      : res.status(404).send(`No existe ningún pokemon con id "${id}" intenta con otro id`);
  } else {
      res.send(allPokemon);
    }
});

module.exports = router;