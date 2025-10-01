import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [expandedMatch, setExpandedMatch] = useState(null);

  useEffect(() => {
    // Fetch teams from the API
    fetch('http://localhost:3000/equipos')
      .then(response => response.json())
      .then(data => setTeams(data))
      .catch(error => console.error('Error fetching teams:', error));

    // Fetch matches from the API
    fetch('http://localhost:3000/partidos')
      .then(response => response.json())
      .then(data => setMatches(data))
      .catch(error => console.error('Error fetching matches:', error));
  }, []);

  const toggleTeamDetails = (id) => {
    setExpandedTeam(expandedTeam === id ? null : id);
  };

  const toggleMatchDetails = (id) => {
    setExpandedMatch(expandedMatch === id ? null : id);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Resultados de Futbol</h1>
      </header>
      <main className="app-main">
        <section className="teams-section">
          <h2>Equipos</h2>
          <div className="teams-list">
            {teams.map(team => (
              <div className="team-item" key={team.id}>
                <label>
                  <span>{team.nombre}</span>
                  <button onClick={() => toggleTeamDetails(team.id)}>
                    {expandedTeam === team.id ? 'Ver menos' : 'Más información'}
                  </button>
                </label>
                {expandedTeam === team.id && (
                  <div className="team-details">
                    <p>Ciudad: {team.ciudad}</p>
                    <p>Fecha de Creación: {team.fechaCreacion}</p>
                    <p>Clasificación: {team.clasificacion}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="matches-section">
          <h2>Partidos</h2>
          <div className="matches-list">
            {matches.map(match => (
              <div className="match-item" key={match.id}>
                <label>
                  <span>{`${match.equipoLocal} vs ${match.equipoVisitante}`}</span>
                  <button onClick={() => toggleMatchDetails(match.id)}>
                    {expandedMatch === match.id ? 'Ver menos' : 'Más información'}
                  </button>
                </label>
                {expandedMatch === match.id && (
                  <div className="match-details">
                    <p>Estado: {match.estado}</p>
                    <p>Resultado: {match.resultado}</p>
                    <p>Hora de Inicio: {match.horaInicio}</p>
                    <p>Fecha: {match.fecha}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
