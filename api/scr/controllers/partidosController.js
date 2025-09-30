// src/controllers/partidosController.js

// Importa el array de equipos desde el controlador de equipos.
// La clave es que equiposController.equipos es un array,
// y por lo tanto, tiene el método .find()
const equiposController = require('./equiposController');
const equipos = equiposController.equipos;

const partidos = [
    {
      id: 1,
      equipoLocalId: 1, // Real Madrid
      equipoVisitanteId: 2, // FC Barcelona
      horaInicio: '19:00',
      fecha: '2025-09-22',
      resultado: '1 - 2'
    },
    {
      id: 2,
      equipoLocalId: 3, // Atlético de Madrid
      equipoVisitanteId: 4, // Sevilla FC
      horaInicio: '17:30',
      fecha: '2025-09-23',
      resultado: null
    },
    {
      id: 3,
      equipoLocalId: 5, // Real Betis
      equipoVisitanteId: 6, // Villarreal CF
      horaInicio: '16:00',
      fecha: '2025-09-22',
      resultado: '2 - 1'
    },
    {
      id: 4,
      equipoLocalId: 15, // Rayo Vallecano
      equipoVisitanteId: 10, // CA Osasuna
      horaInicio: '12:00',
      fecha: '2025-09-24',
      resultado: null
    }
];

const ESTADO_PARTIDO = {
  PROGRAMADO: 'Programado',
  EN_JUEGO: 'En juego',
  TERMINADO: 'Terminado',
};

// Obtener todos los partidos
exports.getPartidos = (req, res) => {
  const partidosConDetalles = partidos.map(partido => {
    const ahora = new Date();
    const hoy = ahora.toISOString().split('T')[0];
    const [horaActual, minutoActual] = ahora.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit', hour12: false}).split(':').map(Number);
    const [horaPartido, minutoPartido] = partido.horaInicio.split(':').map(Number);

    let estado = '';

    if (partido.fecha < hoy || partido.resultado) { // Si hay resultado, está terminado.
      estado = ESTADO_PARTIDO.TERMINADO;
    } else if (partido.fecha === hoy) {
      if (horaActual >= horaPartido && (horaActual < horaPartido + 2)) { // Lógica simple para 'en juego'
        estado = ESTADO_PARTIDO.EN_JUEGO;
      } else if (horaActual > horaPartido + 2) {
        estado = ESTADO_PARTIDO.TERMINADO;
      } else {
        estado = ESTADO_PARTIDO.PROGRAMADO;
      }
    } else {
      estado = ESTADO_PARTIDO.PROGRAMADO;
    }

    // Generar resultado automático si el partido está terminado y no tiene resultado
    if (estado === ESTADO_PARTIDO.TERMINADO && !partido.resultado) {
      const golesLocal = Math.floor(Math.random() * 6); // Goles entre 0 y 5
      const golesVisitante = Math.floor(Math.random() * 6);
      partido.resultado = `${golesLocal} - ${golesVisitante}`;
    }

    // Aquí es donde la magia ocurre: usamos .find() en el array de equipos importado
    const equipoLocal = equipos.find(eq => eq.id === partido.equipoLocalId);
    const equipoVisitante = equipos.find(eq => eq.id === partido.equipoVisitanteId);

    return {
      id: partido.id,
      estado: estado,
      equipoLocal: equipoLocal ? equipoLocal.nombre : 'Desconocido',
      equipoVisitante: equipoVisitante ? equipoVisitante.nombre : 'Desconocido',
      resultado: partido.resultado,
      horaInicio: partido.horaInicio,
      fecha: partido.fecha,
    };
  });

  res.status(200).json(partidosConDetalles);
};

// Obtener un partido por ID
exports.getPartidoById = (req, res) => {
  const partidoId = parseInt(req.params.id);
  const partido = partidos.find(p => p.id === partidoId);

  if (!partido) {
    return res.status(404).json({ message: 'Partido no encontrado' });
  }

  // Se repite la lógica del estado (idealmente, esto debería estar en una función aparte)
  const ahora = new Date();
  const hoy = ahora.toISOString().split('T')[0];
  const [horaActual, minutoActual] = ahora.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit', hour12: false}).split(':').map(Number);
  const [horaPartido, minutoPartido] = partido.horaInicio.split(':').map(Number);
  
  let estado = '';
  if (partido.fecha < hoy || partido.resultado) {
      estado = ESTADO_PARTIDO.TERMINADO;
  } else if (partido.fecha === hoy) {
      if (horaActual >= horaPartido && (horaActual < horaPartido + 2)) {
          estado = ESTADO_PARTIDO.EN_JUEGO;
      } else if (horaActual > horaPartido + 2) {
          estado = ESTADO_PARTIDO.TERMINADO;
      } else {
          estado = ESTADO_PARTIDO.PROGRAMADO;
      }
  } else {
      estado = ESTADO_PARTIDO.PROGRAMADO;
  }
  
  const equipoLocal = equipos.find(eq => eq.id === partido.equipoLocalId);
  const equipoVisitante = equipos.find(eq => eq.id === partido.equipoVisitanteId);

  res.status(200).json({
    id: partido.id,
    estado: estado,
    equipoLocal: equipoLocal ? equipoLocal.nombre : 'Desconocido',
    equipoVisitante: equipoVisitante ? equipoVisitante.nombre : 'Desconocido',
    resultado: partido.resultado,
    horaInicio: partido.horaInicio,
    fecha: partido.fecha,
  });
};

// NUEVA FUNCIÓN: Crear un partido (POST)
exports.crearPartido = (req, res) => {
  const nuevoPartido = req.body;

  // Verificación de datos obligatorios
  if (!nuevoPartido.equipoLocalId || !nuevoPartido.equipoVisitanteId || !nuevoPartido.fecha || !nuevoPartido.horaInicio) {
    return res.status(400).json({ message: 'Faltan datos obligatorios para crear el partido.' });
  }

  // Asignar un ID único
  const nuevoId = partidos.length > 0 ? Math.max(...partidos.map(p => p.id)) + 1 : 1;
  const partidoConId = { id: nuevoId, ...nuevoPartido };
  
  partidos.push(partidoConId);
  res.status(201).json(partidoConId);
};

// NUEVA FUNCIÓN: Modificar un partido (PUT)
exports.modificarPartido = (req, res) => {
  const partidoId = parseInt(req.params.id);
  const datosModificados = req.body;
  const indice = partidos.findIndex(p => p.id === partidoId);

  if (indice === -1) {
    return res.status(404).json({ message: 'Partido no encontrado para modificar.' });
  }

  // Validar que solo se actualicen campos existentes
  const camposValidos = ['equipoLocalId', 'equipoVisitanteId', 'fecha', 'horaInicio', 'resultado'];
  const datosFiltrados = Object.keys(datosModificados)
    .filter(campo => camposValidos.includes(campo))
    .reduce((obj, campo) => {
      obj[campo] = datosModificados[campo];
      return obj;
    }, {});

  // Si no hay campos válidos para actualizar, devolver un error
  if (Object.keys(datosFiltrados).length === 0) {
    return res.status(400).json({ message: 'No se proporcionaron campos válidos para actualizar.' });
  }

  // Validar que los nuevos equipos existan
  if (datosFiltrados.equipoLocalId && !equipos.find(e => e.id === datosFiltrados.equipoLocalId)) {
    return res.status(400).json({ message: 'El equipo local proporcionado no existe.' });
  }

  if (datosFiltrados.equipoVisitanteId && !equipos.find(e => e.id === datosFiltrados.equipoVisitanteId)) {
    return res.status(400).json({ message: 'El equipo visitante proporcionado no existe.' });
  }

  // Aplicar las modificaciones
  const partidoOriginal = partidos[indice];
  partidos[indice] = {
    ...partidoOriginal, // Mantener datos originales
    ...datosFiltrados // Sobrescribir con los nuevos datos
  };

  res.status(200).json(partidos[indice]);
};

// NUEVA FUNCIÓN: Eliminar un partido (DELETE)
exports.eliminarPartido = (req, res) => {
  const partidoId = parseInt(req.params.id);
  const indice = partidos.findIndex(p => p.id === partidoId);

  if (indice === -1) {
    return res.status(404).json({ message: 'Partido no encontrado para eliminar.' });
  }

  partidos.splice(indice, 1);
  res.status(204).send();
};
