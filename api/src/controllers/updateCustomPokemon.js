const { Pokemon, Type } = require('../db');

const updateCustomPokemon = async (id, formData) => {
  const {
    name, image, types, hp, attack, defense, speed, height, weight
  } = formData

  if (!name || !image || !types) {
    throw {
      status: false,
      message: 'Missing required information.'
    }
  }

  try {
    const pokemonToUpdate = await Pokemon.findByPk(id)
    if (!pokemonToUpdate) {
      throw {
        status: false,
        message: `Pokemon with ID ${id} not found`
      }
    } else {
      await pokemonToUpdate.update({
        name, image, hp, attack, defense, speed, height, weight
      });

      // Obtener los objetos Type asociados al Pokémon
      const typesToUpdate = await Type.findAll({ where: { name: types } });

      // Eliminar cualquier relación existente entre el Pokémon y los types
      await pokemonToUpdate.setTypes([]);

      // Establecer las nuevas relaciones con los types actualizados
      await pokemonToUpdate.addTypes(typesToUpdate);

      return {
        status: 'done',
        message: "Pokemon modified successfully!",
      };
    }
  } catch (error) {
    throw {
      status: false,
      message: error
    };
  }
};

module.exports = updateCustomPokemon;