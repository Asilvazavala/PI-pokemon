// const { Router } = require('express');
// const router = Router();

// const pokemonRoutes = require('../controllers/dbControllers');
// const typeRoutes = require('../controllers/type'); 

// router.use('/pokemon', pokemonRoutes);
// router.use('/type', typeRoutes);

// module.exports = router;

const { Router } = require('express');

// Importar todos los routers;
const typesRouter = require('./typesRouter')
const pokemonsRouter = require('./pokemonsRouter')

const router = Router();

// Configurar los routers
router.use('/type', typesRouter)
router.use('/pokemon', pokemonsRouter)

module.exports = router;