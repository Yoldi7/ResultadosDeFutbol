const express = require('express');
const app = express();
const PORT = 3000;

// Importa el enrutador de equipos
const equiposRoutes = require('./scr/routes/equiposRoutes');

// Middleware para procesar JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.status(200).send('¡Hola! El servidor de tu API está funcionando.');
});

// Usa el enrutador de equipos para todas las peticiones que empiecen con '/equipos'
// Es lo que se conoce como un "middleware de rutas"
app.use('/equipos', equiposRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});