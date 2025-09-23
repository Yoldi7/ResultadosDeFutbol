// src/routes/equiposRoutes.js

const express = require('express');
const router = express.Router();
const equiposController = require('../controllers/equiposController');

// Rutas GET
router.get('/', equiposController.getEquipos);
router.get('/:id', equiposController.getEquipoById);

// Rutas POST y DELETE
router.post('/', equiposController.crearEquipo);
router.delete('/:id', equiposController.borrarEquipo);

// **NUEVA RUTA PUT para editar un equipo**
router.put('/:id', equiposController.modificarEquipo);

module.exports = router;