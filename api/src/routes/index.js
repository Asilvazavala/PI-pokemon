const { Router } = require('express');
const router = Router();


// Importar todos los routers
const apiRoutes = require('../controllers/apiControllers');
const dbRoutes = require('../controllers/dbControllers');
const typeRoutes = require('../controllers/type'); 


// Configurar los routers 
router.use('/pokemon', dbRoutes);
router.use('/type', typeRoutes);


module.exports = router;
