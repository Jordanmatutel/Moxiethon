import React, { useState, useEffect } from 'react';
import { LogOut, Heart, Gamepad2, MessageCircle, BarChart3 } from 'lucide-react';
import GamesSection from './GamesSection';
import ChatSection from './ChatSection';
import StatisticsSection from './StatisticsSection';
import Mascota from '../assets/images/Mascota.png';
import '../styles/WelcomePage.css';

function WelcomePage({ username, userType, onLogout }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [petMessage, setPetMessage] = useState('');
  const [activeSection, setActiveSection] = useState('welcome');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const messages = [
      '¡Hola Maria! Me alegra mucho verte hoy 😊',
      '¡Bienvenido de vuelta! Espero que tengas un día maravilloso 🌟',
      '¡Qué bueno verte! Estoy aquí para acompañarte',
      '¡Hola Maria! Espero que estés teniendo un gran día ☀️',
      '¡Me da mucha alegría verte! ¿Cómo te sientes hoy?'
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setPetMessage(randomMessage);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'games':
        return <GamesSection />;
      case 'chat':
        return <ChatSection />;
      case 'statistics':
        return <StatisticsSection />;
      default:
        return (
          <>
            <div className="time-display">
              <div className="current-time">{formatTime(currentTime)}</div>
              <div className="current-date">{formatDate(currentTime)}</div>
            </div>

            <div className="greeting-section">
              <h1>{getGreeting()}, {username}!</h1>
              {userType === 'guest' && (
                <p className="guest-notice">Estás navegando como invitado</p>
              )}
            </div>

            <div className="pet-section">
              <div className="pet-character">
                <img 
                  src={Mascota} 
                  alt="Mascota" 
                  className="pet-image"
                />
              </div>

              <div className="pet-speech-bubble">
                <div className="speech-content">
                  <p>{petMessage}</p>
                </div>
                <div className="speech-tail"></div>
              </div>
            </div>

            <div className="welcome-actions">
              <div className="action-card">
                <h3>¡Todo está listo!</h3>
                <p>Moxie está aquí para acompañarle. Explore las diferentes secciones usando los botones de abajo.</p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <div className="header-title">
          {activeSection === 'welcome' && 'Inicio'}
          {activeSection === 'games' && 'Juegos'}
          {activeSection === 'chat' && 'Charla'}
          {activeSection === 'statistics' && 'Estadísticas'}
        </div>
        <button onClick={onLogout} className="logout-btn">
          <LogOut size={20} />
          Cerrar Sesión
        </button>
      </div>

      <div className="welcome-content">
        {renderContent()}
      </div>

      <div className="bottom-navigation">
        <button 
          className={`nav-button ${activeSection === 'welcome' ? 'active' : ''}`}
          onClick={() => setActiveSection('welcome')}
        >
          <Heart size={24} />
          <span>Inicio</span>
        </button>
        <button 
          className={`nav-button ${activeSection === 'games' ? 'active' : ''}`}
          onClick={() => setActiveSection('games')}
        >
          <Gamepad2 size={24} />
          <span>Juegos</span>
        </button>
        <button 
          className={`nav-button ${activeSection === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveSection('chat')}
        >
          <MessageCircle size={24} />
          <span>Charla</span>
        </button>
        <button 
          className={`nav-button ${activeSection === 'statistics' ? 'active' : ''}`}
          onClick={() => setActiveSection('statistics')}
        >
          <BarChart3 size={24} />
          <span>Estadísticas</span>
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;