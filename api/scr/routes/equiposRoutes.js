const express = require('express');
const router = express.Router();
const equiposController = require('../controllers/equiposController.js');

// Define el endpoint GET para obtener todos los equipos
// Cuando alguien acceda a /equipos, se ejecuta la función getEquipos del controlador
router.get('/', equiposController.getEquipos);

// Define el endpoint GET para obtener un equipo específico por su ID
// Por ejemplo: /equipos/3
router.get('/:id', equiposController.getEquipoById);

// Ruta POST para crear un nuevo equipo
router.post('/', equiposController.crearEquipo);

// Ruta DELETE para borrar un equipo por su ID
router.delete('/:id', equiposController.borrarEquipo);

module.exports = router;