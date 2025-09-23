// Array de datos de equipos de LaLiga.
const equipos = [
  { id: 1, nombre: 'Real Madrid', ciudad: 'Madrid', fechaCreacion: '1902-03-06', clasificacion: 1 },
  { id: 2, nombre: 'FC Barcelona', ciudad: 'Barcelona', fechaCreacion: '1899-11-29', clasificacion: 2 },
  { id: 3, nombre: 'Atlético de Madrid', ciudad: 'Madrid', fechaCreacion: '1903-04-26', clasificacion: 3 },
  { id: 4, nombre: 'Sevilla FC', ciudad: 'Sevilla', fechaCreacion: '1890-01-25', clasificacion: 4 },
  { id: 5, nombre: 'Real Betis', ciudad: 'Sevilla', fechaCreacion: '1907-09-12', clasificacion: 5 },
  { id: 6, nombre: 'Villarreal CF', ciudad: 'Villarreal', fechaCreacion: '1923-03-10', clasificacion: 6 },
  { id: 7, nombre: 'Real Sociedad', ciudad: 'San Sebastián', fechaCreacion: '1909-09-07', clasificacion: 7 },
  { id: 8, nombre: 'Athletic Club', ciudad: 'Bilbao', fechaCreacion: '1898-07-28', clasificacion: 8 },
  { id: 9, nombre: 'Valencia CF', ciudad: 'Valencia', fechaCreacion: '1919-03-18', clasificacion: 9 },
  { id: 10, nombre: 'CA Osasuna', ciudad: 'Pamplona', fechaCreacion: '1920-10-24', clasificacion: 10 },
  { id: 11, nombre: 'Celta de Vigo', ciudad: 'Vigo', fechaCreacion: '1923-08-23', clasificacion: 11 },
  { id: 12, nombre: 'Getafe CF', ciudad: 'Getafe', fechaCreacion: '1946-03-03', clasificacion: 12 },
  { id: 13, nombre: 'RCD Espanyol', ciudad: 'Barcelona', fechaCreacion: '1900-10-28', clasificacion: 13 },
  { id: 14, nombre: 'CD Alfaro', ciudad: 'Alfaro', fechaCreacion: '1922-07-25', clasificacion: 14 },
  { id: 15, nombre: 'Rayo Vallecano', ciudad: 'Madrid', fechaCreacion: '1924-05-29', clasificacion: 15 },
  { id: 16, nombre: 'Oviedo FC', ciudad: 'Oviedo', fechaCreacion: '1926-03-26', clasificacion: 16 },
  { id: 17, nombre: 'CD Mendi', ciudad: 'Mendigorría', fechaCreacion: '1970-05-15', clasificacion: 17 },
  { id: 18, nombre: 'Deportivo Alavés', ciudad: 'Vitoria-Gasteiz', fechaCreacion: '1921-01-23', clasificacion: 18 },
  { id: 19, nombre: 'Elche CF', ciudad: 'Elche', fechaCreacion: '1923-08-15', clasificacion: 19 },
  { id: 20, nombre: 'UD Levante', ciudad: 'Valencia', fechaCreacion: '1909-08-01', clasificacion: 20 }
];


exports.getEquipos = (req, res) => {
  // Simplemente devolvemos el array de equipos como una respuesta JSON
  res.status(200).json(equipos);
};


exports.getEquipoById = (req, res) => {
  const equipoId = parseInt(req.params.id); // Captura el ID de la URL
  const equipo = equipos.find(e => e.id === equipoId);

  if (equipo) {
    res.status(200).json(equipo); // Devuelve el equipo encontrado
  } else {
    res.status(404).json({ message: 'Equipo no encontrado' }); // Si no se encuentra, envía un 404
  }
};

exports.crearEquipo = (req, res) => {
  const nuevoEquipo = req.body;
  if (!nuevoEquipo.nombre || !nuevoEquipo.ciudad) {
    return res.status(400).json({ message: 'Faltan datos obligatorios: nombre y ciudad' });
  }
  
  // Asignar un ID único (en un caso real, la base de datos lo haría automáticamente)
  const nuevoId = equipos.length > 0 ? Math.max(...equipos.map(e => e.id)) + 1 : 1;
  const equipoConId = {
    id: nuevoId,
    ...nuevoEquipo
  };
  
  equipos.push(equipoConId);
  res.status(201).json(equipoConId);
};

exports.borrarEquipo = (req, res) => {
  const equipoId = parseInt(req.params.id);
  const indice = equipos.findIndex(e => e.id === equipoId);

  if (indice !== -1) {
    // Elimina el equipo del array
    equipos.splice(indice, 1);
    // 204 No Content es una respuesta común para operaciones de borrado exitosas
    res.status(204).json({ message: 'Equipo eliminado con exito' });
  } else {
    res.status(404).json({ message: 'Equipo no encontrado' });
  }
};