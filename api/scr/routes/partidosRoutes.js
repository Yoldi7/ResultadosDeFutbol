const express = require('express');
const router = express.Router();
const partidosController = require('../controllers/partidosController');

// Rutas GET
router.get('/', partidosController.getPartidos);
router.get('/:id', partidosController.getPartidoById);

// NUEVAS RUTAS
router.post('/', partidosController.crearPartido);
router.put('/:id', partidosController.modificarPartido);
router.delete('/:id', partidosController.eliminarPartido);

module.exports = router;