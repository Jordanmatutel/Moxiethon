import React, { useState } from 'react';
import { 
  LogOut, 
  Heart, 
  Activity, 
  MessageCircle, 
  BarChart3,
  User,
  Calendar,
  TrendingUp,
  Clock,
  Phone
} from 'lucide-react';
import '../../styles/family/FamilyDashboard.css';

import RitmoCardiaco from '../../assets/images/RitmoCardiaco.png';
import FrecuenciaCardiaca from '../../assets/images/FrecuenciaCardiaca.png';
import Caminata from '../../assets/images/Caminata.png';
import Pulso from '../../assets/images/Pulso.png';

function FamilyDashboard({ familyMember, onLogout }) {
  const [activeSection, setActiveSection] = useState('overview');

  // Datos simulados del paciente
  const patientData = {
    name: 'María González',
    age: 72,
    lastActivity: '2024-01-20 14:30',
    status: 'stable',
    location: 'En casa',
    emergencyContact: '+52 55 1234 5678'
  };

  const healthMetrics = {
    heartRate: '75 bpm',
    bloodPressure: '130/80 mmHg',
    steps: '2,450 pasos',
    sleep: '7.5 horas',
    mood: 'Positivo',
    lastUpdate: '14:30'
  };

  const recentActivities = [
    { time: '14:30', activity: 'Conversación con Navi', status: 'normal' },
    { time: '12:00', activity: 'Medicamento tomado', status: 'completed' },
    { time: '10:15', activity: 'Caminata matutina', status: 'completed' },
    { time: '08:30', activity: 'Desayuno', status: 'completed' }
  ];

  const naviInsights = [
    {
      type: 'mood',
      title: 'Estado de Ánimo',
      content: 'María se encuentra de buen humor hoy. Ha mencionado sentirse bien y con energía.',
      time: '2 horas'
    },
    {
      type: 'health',
      title: 'Síntomas Reportados',
      content: 'No ha reportado dolor o molestias. Menciona dormir bien anoche.',
      time: '4 horas'
    },
    {
      type: 'activity',
      title: 'Actividad Física',
      content: 'Completó su caminata matutina de 30 minutos. Se siente satisfecha con su rutina.',
      time: '6 horas'
    }
  ];

  const renderOverview = () => (
    <div className="family-overview-content">
      {/* Estado General */}
      <div className="family-status-card">
        <div className="family-status-header">
          <div className="family-patient-info">
            <div className="family-patient-avatar">
              <User size={32} />
            </div>
            <div>
              <h2>{patientData.name}</h2>
              <p>{patientData.age} años • {patientData.location}</p>
            </div>
          </div>
          <div className="family-status-indicator">
            <div className={`family-status-dot ${patientData.status}`}></div>
            <span>Estado: Estable</span>
          </div>
        </div>
        <div className="family-last-activity">
          <Clock size={16} />
          <span>Última actividad: {patientData.lastActivity}</span>
        </div>
      </div>

      {/* Métricas de Salud */}
      <div className="family-metrics-grid">
        <div className="family-metric-card">
          <div className="family-metric-icon heart">
            <Heart size={24} />
          </div>
          <div className="family-metric-info">
            <h4>Ritmo Cardíaco</h4>
            <p>{healthMetrics.heartRate}</p>
            <small>Normal</small>
          </div>
        </div>

        <div className="family-metric-card">
          <div className="family-metric-icon pressure">
            <Activity size={24} />
          </div>
          <div className="family-metric-info">
            <h4>Presión Arterial</h4>
            <p>{healthMetrics.bloodPressure}</p>
            <small>Controlada</small>
          </div>
        </div>

        <div className="family-metric-card">
          <div className="family-metric-icon steps">
            <TrendingUp size={24} />
          </div>
          <div className="family-metric-info">
            <h4>Pasos Hoy</h4>
            <p>{healthMetrics.steps}</p>
            <small>Meta: 3,000</small>
          </div>
        </div>

        <div className="family-metric-card">
          <div className="family-metric-icon sleep">
            <Clock size={24} />
          </div>
          <div className="family-metric-info">
            <h4>Sueño Anoche</h4>
            <p>{healthMetrics.sleep}</p>
            <small>Buena calidad</small>
          </div>
        </div>
      </div>

      {/* Actividades Recientes */}
      <div className="family-section">
        <h3>
          <Calendar size={20} />
          Actividades Recientes
        </h3>
        <div className="family-activities-list">
          {recentActivities.map((activity, index) => (
            <div key={index} className="family-activity-item">
              <div className="family-activity-time">{activity.time}</div>
              <div className="family-activity-content">
                <p>{activity.activity}</p>
                <span className={`family-activity-status ${activity.status}`}>
                  {activity.status === 'completed' ? 'Completado' : 'Normal'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNaviInsights = () => (
    <div className="family-navi-content">
      <div className="family-navi-header">
        <h3>
          <MessageCircle size={24} />
          Información de Navi
        </h3>
        <p>Análisis e insights basados en las conversaciones con Navi</p>
      </div>

      <div className="family-insights-grid">
        {naviInsights.map((insight, index) => (
          <div key={index} className={`family-insight-card ${insight.type}`}>
            <div className="family-insight-header">
              <div className="family-insight-icon">
                {insight.type === 'mood' && <Heart size={20} />}
                {insight.type === 'health' && <Activity size={20} />}
                {insight.type === 'activity' && <TrendingUp size={20} />}
              </div>
              <div>
                <h4>{insight.title}</h4>
                <small>Hace {insight.time}</small>
              </div>
            </div>
            <p>{insight.content}</p>
          </div>
        ))}
      </div>

      <div className="family-navi-summary">
        <h4>Resumen del Día</h4>
        <div className="family-summary-content">
          <p>
            <strong>Estado General:</strong> María ha tenido un día positivo. Se encuentra 
            de buen ánimo y ha completado sus actividades rutinarias sin problemas.
          </p>
          <p>
            <strong>Salud:</strong> No ha reportado síntomas preocupantes. Sus signos vitales 
            se mantienen estables y dentro de los rangos normales.
          </p>
          <p>
            <strong>Actividad:</strong> Ha mantenido su rutina de ejercicio y se muestra 
            motivada para continuar con sus hábitos saludables.
          </p>
        </div>
      </div>
    </div>
  );

  const renderHealthReports = () => (
    <div className="family-reports-content">
      <div className="family-reports-header">
        <h3>
          <BarChart3 size={24} />
          Reportes de Salud
        </h3>
        <p>Tendencias y análisis de salud de los últimos días</p>
      </div>

      <div className="family-charts-grid">
        <div className="family-chart-card">
          <h4>Ritmo Cardíaco (7 días)</h4>
          <img 
            src={RitmoCardiaco}
            alt="Gráfico de Ritmo Cardíaco" 
            className="family-chart-image"
          />
          <p>Promedio: 73 bpm • Rango: 68-78 bpm</p>
        </div>

        <div className="family-chart-card">
          <h4>Pulso (7 días)</h4>
          <img 
            src={Pulso}
            alt="Gráfico de Presión Arterial" 
            className="family-chart-image"
          />
          <p>Promedio: 132/82 mmHg • Controlada</p>
        </div>

        <div className="family-chart-card">
          <h4>Actividad Física (7 días)</h4>
          <img 
            src={Caminata} 
            alt="Gráfico de Actividad Física" 
            className="family-chart-image"
          />
          <p>Promedio: 2,800 pasos/día • Tendencia positiva</p>
        </div>

        <div className="family-chart-card">
          <h4>Frecuencia Cardíaca (7 días)</h4>
          <img 
            src={FrecuenciaCardiaca} 
            alt="Gráfico de Frecuencia Cardíaca" 
            className="family-chart-image"
          />
          <p>Variabilidad normal • Sin irregularidades</p>
        </div>
      </div>

      <div className="family-health-summary">
        <h4>Resumen Semanal</h4>
        <div className="family-summary-cards">
          <div className="family-summary-card positive">
            <Heart size={20} />
            <div>
              <h5>Signos Vitales</h5>
              <p>Estables y dentro del rango normal</p>
            </div>
          </div>
          <div className="family-summary-card positive">
            <Activity size={20} />
            <div>
              <h5>Actividad Física</h5>
              <p>Cumple con las metas diarias</p>
            </div>
          </div>
          <div className="family-summary-card neutral">
            <TrendingUp size={20} />
            <div>
              <h5>Tendencias</h5>
              <p>Mejora gradual en todos los indicadores</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="family-dashboard-container">
      <div className="family-header">
        <div className="family-header-left">
          <div className="family-logo">
            <Heart size={32} />
            <span>Portal Familiar</span>
          </div>
          <div className="family-member-info">
            <h2>Bienvenida, {familyMember.name}</h2>
            <p>{familyMember.relationship} de {familyMember.patientName}</p>
          </div>
        </div>
        <div className="family-header-right">
          <button className="family-emergency-btn">
            <Phone size={20} />
            Emergencia
          </button>
          <button onClick={onLogout} className="family-logout-btn">
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="family-main-content">
        <div className="family-sidebar">
          <nav className="family-nav">
            <button 
              className={`family-nav-item ${activeSection === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveSection('overview')}
            >
              <Activity size={20} />
              Resumen
            </button>
            <button 
              className={`family-nav-item ${activeSection === 'navi' ? 'active' : ''}`}
              onClick={() => setActiveSection('navi')}
            >
              <MessageCircle size={20} />
              Información de Navi
            </button>
            <button 
              className={`family-nav-item ${activeSection === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveSection('reports')}
            >
              <BarChart3 size={20} />
              Reportes de Salud
            </button>
          </nav>
        </div>

        <div className="family-content">
          {activeSection === 'overview' && renderOverview()}
          {activeSection === 'navi' && renderNaviInsights()}
          {activeSection === 'reports' && renderHealthReports()}
        </div>
      </div>
    </div>
  );
}

export default FamilyDashboard;