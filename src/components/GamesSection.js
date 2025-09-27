import React, { useState, useEffect } from 'react';
import { Play, Trophy, Clock, Star } from 'lucide-react';
import { gamesData } from '../assets/data/mockData';
import Mascota from '../assets/images/Mascota.png';
import '../styles/GamesSection.css'

function GamesSection() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [showMascotTip, setShowMascotTip] = useState(false);
  const [currentTip, setCurrentTip] = useState('');

  const mascotTips = [
    "¡Excelente! Los juegos ayudan a mantener la mente activa y saludable.",
    "Recuerda tomar descansos entre juegos. Tu bienestar es lo más importante.",
    "¡Muy bien! Cada juego que completas fortalece tu memoria.",
    "No te preocupes si no lo logras al primer intento. La práctica hace al maestro.",
    "¡Fantástico! Mantener la mente ocupada es una excelente forma de cuidarse."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% de probabilidad cada 10 segundos
        const randomTip = mascotTips[Math.floor(Math.random() * mascotTips.length)];
        setCurrentTip(randomTip);
        setShowMascotTip(true);
        
        setTimeout(() => {
          setShowMascotTip(false);
        }, 5000); // Mostrar por 5 segundos
      }
    }, 10000); // Cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  const handlePlayGame = (game) => {
    setSelectedGame(game);
    // Simular inicio de juego
    setTimeout(() => {
      alert(`¡Iniciando ${game.name}! (Esta es una simulación)`);
      setSelectedGame(null);
    }, 1000);
  };

  return (
    <div className="games-section">
      <div className="section-header">
        <h2>🎮 Juegos Divertidos</h2>
        <p>Mantén tu mente activa con estos entretenidos juegos</p>
      </div>

      {showMascotTip && (
        <div className="mascot-tip-overlay">
          <div className="mascot-tip">
            <img src={Mascota} alt="Mascota" className="tip-mascot" />
            <div className="tip-bubble">
              <p>{currentTip}</p>
            </div>
          </div>
        </div>
      )}

      <div className="games-grid">
        {gamesData.map((game) => (
          <div key={game.id} className="game-card">
            <div className="game-icon">{game.icon}</div>
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            <div className="game-difficulty">
              <Star size={16} />
              <span>Dificultad: {game.difficulty}</span>
            </div>
            <button 
              className="play-button"
              onClick={() => handlePlayGame(game)}
              disabled={selectedGame?.id === game.id}
            >
              {selectedGame?.id === game.id ? (
                <>
                  <Clock size={20} />
                  Cargando...
                </>
              ) : (
                <>
                  <Play size={20} />
                  Jugar Ahora
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="games-stats">
        <div className="stat-card">
          <Trophy size={24} />
          <div>
            <h4>Juegos Completados</h4>
            <p>23 juegos</p>
          </div>
        </div>
        <div className="stat-card">
          <Clock size={24} />
          <div>
            <h4>Tiempo Total</h4>
            <p>5 horas 45 min</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamesSection;