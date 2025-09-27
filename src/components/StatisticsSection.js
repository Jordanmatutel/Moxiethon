import React, { useState } from 'react';
import { User, Calendar, Trophy, Mail, Heart, Activity, Scale, Ruler, TrendingUp, Shield, Zap, BarChart3, Moon, HeartPulse as Pulse } from 'lucide-react';
import { userData, messagesData, healthReportsData } from '../assets/data/mockData';
import '../styles/StatisticsSection.css'

function StatisticsSection() {
  const [activeTab, setActiveTab] = useState('profile');
  const [messages, setMessages] = useState(messagesData);

  const markAsRead = (messageId) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  };

  const getMessageIcon = (type) => {
    switch (type) {
      case 'system': return '🔔';
      case 'reminder': return '⏰';
      case 'achievement': return '🏆';
      case 'tip': return '💡';
      case 'social': return '👥';
      default: return '📧';
    }
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  return (
    <div className="statistics-section">
      <div className="section-header">
        <h2>📊 Mi Perfil y Estadísticas</h2>
        <p>Revisa tu progreso, mensajes importantes e informes</p>
      </div>

      <div className="stats-tabs">
        <button 
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User size={20} />
          Mi Perfil
        </button>
        <button 
          className={`tab-button ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          <Mail size={20} />
          Mensajes
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
        </button>
        <button 
          className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <BarChart3 size={20} />
          Informes
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="profile-content">
          <div className="user-info-card">
            <div className="user-avatar">
              <User size={48} />
            </div>
            <div className="user-details">
              <h3>{userData.name}</h3>
              <p>{userData.age} años</p>
              <p>Miembro desde: {userData.joinDate}</p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <Scale size={24} />
              </div>
              <div className="stat-info">
                <h4>Peso Actual</h4>
                <p className="stat-number">{userData.weight}</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <Ruler size={24} />
              </div>
              <div className="stat-info">
                <h4>Estatura</h4>
                <p className="stat-number">{userData.height}</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <Heart size={24} />
              </div>
              <div className="stat-info">
                <h4>Presión Arterial</h4>
                <p className="stat-number">{userData.bloodPressure}</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <Activity size={24} />
              </div>
              <div className="stat-info">
                <h4>Frecuencia Cardíaca</h4>
                <p className="stat-number">{userData.heartRate}</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <Zap size={24} />
              </div>
              <div className="stat-info">
                <h4>Pulso</h4>
                <p className="stat-number">{userData.pulse}</p>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <TrendingUp size={24} />
              </div>
              <div className="stat-info">
                <h4>Ritmo Cardíaco Promedio</h4>
                <p className="stat-number">{userData.avgHeartRhythm}</p>
              </div>
            </div>
          </div>

          <div className="health-info-section">
            <h3>
              <Heart size={24} />
              Información de Salud
            </h3>
            <div className="health-info-grid">
              <div className="health-info-item">
                <Activity size={20} />
                <div>
                  <h4>Movilidad</h4>
                  <p>{userData.mobility}</p>
                </div>
              </div>
              <div className="health-info-item">
                <Shield size={20} />
                <div>
                  <h4>Alergias</h4>
                  <p>{userData.allergies}</p>
                </div>
              </div>
              <div className="health-info-item">
                <Calendar size={20} />
                <div>
                  <h4>Último Chequeo</h4>
                  <p>{userData.healthMetrics.lastCheckup}</p>
                </div>
              </div>
              <div className="health-info-item">
                <Calendar size={20} />
                <div>
                  <h4>Próxima Cita</h4>
                  <p>{userData.healthMetrics.nextAppointment}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="wellness-section">
            <h3>
              <Trophy size={24} />
              Metas de Bienestar
            </h3>
            <div className="wellness-grid">
              <div className="wellness-item">
                <span className="wellness-icon">🏃‍♀️</span>
                <div>
                  <h4>Ejercicio Diario</h4>
                  <p>{userData.healthMetrics.exerciseGoal}</p>
                </div>
              </div>
              <div className="wellness-item">
                <span className="wellness-icon">💧</span>
                <div>
                  <h4>Hidratación</h4>
                  <p>{userData.healthMetrics.waterIntake}</p>
                </div>
              </div>
              <div className="wellness-item">
                <span className="wellness-icon">😴</span>
                <div>
                  <h4>Descanso</h4>
                  <p>{userData.healthMetrics.sleepHours}</p>
                </div>
              </div>
              <div className="wellness-item">
                <span className="wellness-icon">💊</span>
                <div>
                  <h4>Recordatorios</h4>
                  <p>{userData.healthMetrics.medicationReminders} medicamentos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="messages-content">
          <div className="messages-header">
            <h3>Mis Mensajes</h3>
            <span className="messages-count">
              {unreadCount > 0 ? `${unreadCount} sin leer` : 'Todos leídos'}
            </span>
          </div>

          <div className="messages-list">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message-item ${!message.read ? 'unread' : ''}`}
                onClick={() => markAsRead(message.id)}
              >
                <div className="message-icon">
                  {getMessageIcon(message.type)}
                </div>
                <div className="message-details">
                  <h4>{message.title}</h4>
                  <p>{message.content}</p>
                  <span className="message-date">{message.date}</span>
                </div>
                {!message.read && <div className="unread-dot"></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="reports-content">
          <div className="reports-header">
            <h3>Informes de Salud</h3>
            <p>Seguimiento semanal de tus indicadores de salud</p>
          </div>

          <div className="charts-container">
            {/* Gráfico de Presión Arterial */}
            <div className="chart-card">
              <div className="chart-header">
                <Heart size={24} />
                <h4>Presión Arterial (Última Semana)</h4>
              </div>
              <div className="chart-content">
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color systolic"></div>
                    <span>Sistólica</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color diastolic"></div>
                    <span>Diastólica</span>
                  </div>
                </div>
                <div className="simple-chart">
                  {healthReportsData.bloodPressure.map((data, index) => (
                    <div key={index} className="chart-bar-group">
                      <div className="chart-bars">
                        <div 
                          className="chart-bar systolic" 
                          style={{ height: `${(data.systolic / 150) * 100}%` }}
                          title={`Sistólica: ${data.systolic}`}
                        ></div>
                        <div 
                          className="chart-bar diastolic" 
                          style={{ height: `${(data.diastolic / 100) * 100}%` }}
                          title={`Diastólica: ${data.diastolic}`}
                        ></div>
                      </div>
                      <span className="chart-label">{data.date}</span>
                      <div className="chart-values">
                        <small>{data.systolic}/{data.diastolic}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Gráfico de Ritmo Cardíaco */}
            <div className="chart-card">
              <div className="chart-header">
                <Pulse size={24} />
                <h4>Ritmo Cardíaco (Última Semana)</h4>
              </div>
              <div className="chart-content">
                <div className="simple-chart">
                  {healthReportsData.heartRate.map((data, index) => (
                    <div key={index} className="chart-bar-group">
                      <div className="chart-bars">
                        <div 
                          className="chart-bar heart-rate" 
                          style={{ height: `${(data.rate / 100) * 100}%` }}
                          title={`${data.rate} bpm`}
                        ></div>
                      </div>
                      <span className="chart-label">{data.date}</span>
                      <div className="chart-values">
                        <small>{data.rate} bpm</small>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chart-summary">
                  <div className="summary-item">
                    <span>Promedio:</span>
                    <strong>73 bpm</strong>
                  </div>
                  <div className="summary-item">
                    <span>Rango:</span>
                    <strong>68-78 bpm</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Gráfico de Ciclos de Sueño */}
            <div className="chart-card">
              <div className="chart-header">
                <Moon size={24} />
                <h4>Ciclos de Sueño (Última Semana)</h4>
              </div>
              <div className="chart-content">
                <div className="simple-chart">
                  {healthReportsData.sleepCycles.map((data, index) => (
                    <div key={index} className="chart-bar-group">
                      <div className="chart-bars">
                        <div 
                          className={`chart-bar sleep ${data.quality.toLowerCase()}`}
                          style={{ height: `${(data.hours / 10) * 100}%` }}
                          title={`${data.hours} horas - ${data.quality}`}
                        ></div>
                      </div>
                      <span className="chart-label">{data.date}</span>
                      <div className="chart-values">
                        <small>{data.hours}h</small>
                        <small className={`quality-${data.quality.toLowerCase()}`}>
                          {data.quality}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="sleep-legend">
                  <div className="legend-item">
                    <div className="legend-color excelente"></div>
                    <span>Excelente</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color buena"></div>
                    <span>Buena</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color regular"></div>
                    <span>Regular</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="health-summary">
            <h4>Resumen de la Semana</h4>
            <div className="summary-grid">
              <div className="summary-card good">
                <Heart size={20} />
                <div>
                  <h5>Presión Arterial</h5>
                  <p>Dentro del rango normal</p>
                </div>
              </div>
              <div className="summary-card good">
                <Pulse size={20} />
                <div>
                  <h5>Ritmo Cardíaco</h5>
                  <p>Estable y saludable</p>
                </div>
              </div>
              <div className="summary-card excellent">
                <Moon size={20} />
                <div>
                  <h5>Calidad del Sueño</h5>
                  <p>Promedio: 7.5 horas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatisticsSection;