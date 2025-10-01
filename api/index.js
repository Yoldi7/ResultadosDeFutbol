// server.js (o index.js)

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Importa los enrutadores de equipos y partidos
const equiposRoutes = require('./scr/routes/equiposRoutes');
const partidosRoutes = require('./scr/routes/partidosRoutes');

// Middleware para procesar JSON en las peticiones
app.use(express.json());
app.use(cors());

// Ruta de prueba inicial
app.get('/', (req, res) => {
  res.status(200).send('¡Hola! El servidor de tu API está funcionando.');
});

// Usa los enrutadores para definir los endpoints
app.use('/equipos', equiposRoutes);
app.use('/partidos', partidosRoutes);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});