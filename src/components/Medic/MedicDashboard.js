import React, { useState } from 'react';
import { 
  LogOut, 
  Users, 
  Activity, 
  Calendar, 
  FileText, 
  Settings,
  Bell,
  Search,
  Plus,
  TrendingUp,
  Heart,
  AlertTriangle
} from 'lucide-react';
import NewPatientModal from './NewPatientModal';
import PatientViewModal from './PatientViewModal';
import PatientEditModal from './PatientEditModal';
import PatientReportModal from './PatientReportModal';
import AppointmentModal from './AppointmentModal';
import NotificationModal from './NotificationModal';
import '../../styles/Medic/MedicDashboard.css';
import '../../styles/Medic/MedicPatients.css';
import '../../styles/Medic/MedicAppointments.css';
import '../../styles/Medic/MedicReports.css';
import '../../styles/Medic/MedicSettings.css';
import '../../styles/Medic/MedicNotifications.css';

import Glucosa from '../../assets/images/Glucosa.png';
import Hipertension_Regression from '../../assets/images/Hipertension_Regression.png';
import Hipertension from '../../assets/images/Hipertension.png';
import Caminata from '../../assets/images/Caminata.png';
import FrecuenciaCardiaca from '../../assets/images/FrecuenciaCardiaca.png';
import IndiceRiesgo from '../../assets/images/IndiceRiesgo.png';
import Pulso from '../../assets/images/Pulso.png';
import RitmoCardiaco from '../../assets/images/RitmoCardiaco.png';
import Frecuencia from '../../assets/images/Frecuencia.png'

function MedicDashboard({ doctor, onLogout }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPatientModal, setShowNewPatientModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState('all');
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'María González',
      age: 72,
      lastVisit: '2024-01-15',
      condition: 'Hipertensión',
      status: 'stable',
      nextAppointment: '2024-02-15'
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      age: 68,
      lastVisit: '2024-01-12',
      condition: 'Diabetes Tipo 2',
      status: 'monitoring',
      nextAppointment: '2024-02-10'
    },
    {
      id: 3,
      name: 'Ana Jiménez',
      age: 75,
      lastVisit: '2024-01-10',
      condition: 'Artritis',
      status: 'stable',
      nextAppointment: '2024-02-20'
    }
  ]);

  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      patientId: 1,
      patientName: 'María González', 
      date: '2024-01-20',
      time: '09:00', 
      reason: 'Consulta de rutina',
      status: 'scheduled',
      notes: 'Control mensual de hipertensión'
    },
    { 
      id: 2, 
      patientId: 2,
      patientName: 'Carlos Mendoza', 
      date: '2024-01-20',
      time: '10:30', 
      reason: 'Seguimiento diabetes',
      status: 'scheduled',
      notes: 'Revisión de niveles de glucosa'
    },
    { 
      id: 3, 
      patientId: 3,
      patientName: 'Ana Jiménez', 
      date: '2024-01-20',
      time: '14:00', 
      reason: 'Revisión artritis',
      status: 'completed',
      notes: 'Evaluación de dolor articular'
    },
    { 
      id: 4, 
      patientId: 1,
      patientName: 'María González', 
      date: '2024-01-21',
      time: '15:30', 
      reason: 'Primera consulta',
      status: 'scheduled',
      notes: 'Consulta inicial'
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Recordatorio de Cita',
      subtitle: 'Su cita médica está programada para mañana a las 10:00 AM',
      recipients: 'all',
      recipientCount: 127,
      createdAt: '2024-01-20T09:00:00Z',
      status: 'sent'
    },
    {
      id: 2,
      title: 'Resultados de Laboratorio',
      subtitle: 'Sus resultados de laboratorio están disponibles para revisión',
      recipients: [1, 2],
      recipientCount: 2,
      createdAt: '2024-01-19T14:30:00Z',
      status: 'sent'
    },
    {
      id: 3,
      title: 'Cambio de Horario',
      subtitle: 'La consulta del viernes ha sido reprogramada para el lunes',
      recipients: [3],
      recipientCount: 1,
      createdAt: '2024-01-18T16:45:00Z',
      status: 'failed'
    }
  ]);

  const [appointmentFilter, setAppointmentFilter] = useState('all');

  const alerts = [
    { id: 1, type: 'urgent', message: 'Paciente María González - Presión arterial elevada', time: '10:30' },
    { id: 2, type: 'reminder', message: 'Recordatorio: Cita con Carlos Mendoza en 30 min', time: '10:00' },
    { id: 3, type: 'info', message: 'Nuevos resultados de laboratorio disponibles', time: '09:45' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable': return '#22c55e';
      case 'monitoring': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'stable': return 'Estable';
      case 'monitoring': return 'En seguimiento';
      case 'critical': return 'Crítico';
      default: return 'Sin estado';
    }
  };

  const handleNewPatient = (newPatient) => {
    setPatients(prev => [...prev, newPatient]);
    setShowNewPatientModal(false);
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setShowViewModal(true);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setShowEditModal(true);
  };

  const handleSavePatient = (updatedPatient) => {
    setPatients(prev => prev.map(p => p.id === updatedPatient.id ? updatedPatient : p));
    setShowEditModal(false);
    setSelectedPatient(null);
  };

  const handleShowReport = (patient) => {
    setSelectedPatient(patient);
    setShowReportModal(true);
  };

  const handleNewAppointment = () => {
    setEditingAppointment(null);
    setShowAppointmentModal(true);
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setShowAppointmentModal(true);
  };

  const handleSaveAppointment = (appointmentData) => {
    if (editingAppointment) {
      // Editar consulta existente
      setAppointments(prev => prev.map(apt => 
        apt.id === editingAppointment.id ? appointmentData : apt
      ));
    } else {
      // Nueva consulta
      setAppointments(prev => [...prev, appointmentData]);
    }
    setShowAppointmentModal(false);
    setEditingAppointment(null);
  };

  const handleNewNotification = () => {
    setShowNotificationModal(true);
  };

  const handleSaveNotification = (notificationData) => {
    setNotifications(prev => [notificationData, ...prev]);
    setShowNotificationModal(false);
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleResendNotification = (notificationId) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, status: 'sent', createdAt: new Date().toISOString() } : n
    ));
  };

  const handleCompleteAppointment = (appointmentId) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'completed' } : apt
    ));
  };

  const handleCancelAppointment = (appointmentId) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
    ));
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFilteredAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (appointmentFilter) {
      case 'today':
        return appointments.filter(apt => apt.date === today);
      case 'scheduled':
        return appointments.filter(apt => apt.status === 'scheduled');
      case 'completed':
        return appointments.filter(apt => apt.status === 'completed');
      case 'cancelled':
        return appointments.filter(apt => apt.status === 'cancelled');
      default:
        return appointments;
    }
  };

  const getAppointmentStats = () => {
    const today = new Date().toISOString().split('T')[0];
    return {
      today: appointments.filter(apt => apt.date === today).length,
      scheduled: appointments.filter(apt => apt.status === 'scheduled').length,
      completed: appointments.filter(apt => apt.status === 'completed').length,
      cancelled: appointments.filter(apt => apt.status === 'cancelled').length
    };
  };

  const getFilteredNotifications = () => {
    switch (notificationFilter) {
      case 'sent':
        return notifications.filter(n => n.status === 'sent');
      case 'pending':
        return notifications.filter(n => n.status === 'pending');
      case 'failed':
        return notifications.filter(n => n.status === 'failed');
      default:
        return notifications;
    }
  };

  const getNotificationStats = () => {
    return {
      total: notifications.length,
      sent: notifications.filter(n => n.status === 'sent').length,
      pending: notifications.filter(n => n.status === 'pending').length,
      failed: notifications.filter(n => n.status === 'failed').length
    };
  };

  const renderDashboard = () => (
    <div className="medic-dashboard-content">
      <div className="medic-stats-grid">
        <div className="medic-stat-card">
          <div className="medic-stat-icon patients">
            <Users size={24} />
          </div>
          <div className="medic-stat-info">
            <h3>Pacientes Activos</h3>
            <p className="medic-stat-number">127</p>
            <span className="medic-stat-change positive">+5 este mes</span>
          </div>
        </div>

        <div className="medic-stat-card">
          <div className="medic-stat-icon appointments">
            <Calendar size={24} />
          </div>
          <div className="medic-stat-info">
            <h3>Citas Hoy</h3>
            <p className="medic-stat-number">8</p>
            <span className="medic-stat-change">4 completadas</span>
          </div>
        </div>

        <div className="medic-stat-card">
          <div className="medic-stat-icon reports">
            <FileText size={24} />
          </div>
          <div className="medic-stat-info">
            <h3>Informes Pendientes</h3>
            <p className="medic-stat-number">12</p>
            <span className="medic-stat-change warning">Revisar</span>
          </div>
        </div>

        <div className="medic-stat-card">
          <div className="medic-stat-icon alerts">
            <AlertTriangle size={24} />
          </div>
          <div className="medic-stat-info">
            <h3>Alertas</h3>
            <p className="medic-stat-number">3</p>
            <span className="medic-stat-change urgent">Requieren atención</span>
          </div>
        </div>
      </div>

      <div className="medic-dashboard-sections">
        <div className="medic-section">
          <div className="medic-section-header">
            <h3>
              <Calendar size={20} />
              Citas de Hoy
            </h3>
            <button className="medic-btn-small" onClick={handleNewAppointment}>
              <Plus size={16} />
              Nueva Cita
            </button>
          </div>
          <div className="medic-appointments-list">
            {appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).map(appointment => (
              <div key={appointment.id} className="medic-appointment-item">
                <div className="medic-appointment-time">{appointment.time}</div>
                <div className="medic-appointment-details">
                  <h4>{appointment.patientName}</h4>
                  <p>{appointment.reason}</p>
                </div>
                <button 
                  className="medic-btn-action"
                  onClick={() => handleEditAppointment(appointment)}
                >
                  Ver
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="medic-section">
          <div className="medic-section-header">
            <h3>
              <Bell size={20} />
              Alertas Recientes
            </h3>
          </div>
          <div className="medic-alerts-list">
            {alerts.map(alert => (
              <div key={alert.id} className={`medic-alert-item ${alert.type}`}>
                <div className="medic-alert-content">
                  <p>{alert.message}</p>
                  <span className="medic-alert-time">{alert.time}</span>
                </div>
                <button className="medic-alert-dismiss">×</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="medic-patients-content">
      <div className="medic-patients-header">
        <h3>Gestión de Pacientes</h3>
        <div className="medic-patients-actions">
          <div className="medic-search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="medic-btn medic-btn-primary" onClick={() => setShowNewPatientModal(true)}>
            <Plus size={20} />
            Nuevo Paciente
          </button>
        </div>
      </div>

      <div className="medic-patients-table">
        <div className="medic-table-header">
          <div>Paciente</div>
          <div>Edad</div>
          <div>Última Visita</div>
          <div>Estado</div>
          <div>Próxima Cita</div>
          <div>Acciones</div>
        </div>
        {filteredPatients.map(patient => (
          <div key={patient.id} className="medic-table-row">
            <div className="medic-patient-info">
              <strong>{patient.name}</strong>
            </div>
            <div>{patient.age} años</div>
            <div>{patient.lastVisit}</div>
            <div>
              <span 
                className="medic-status-badge"
                style={{ backgroundColor: getStatusColor(patient.status) }}
              >
                {getStatusText(patient.status)}
              </span>
            </div>
            <div>{patient.nextAppointment}</div>
            <div className="medic-table-actions">
              <button 
                className="medic-btn-small"
                onClick={() => handleViewPatient(patient)}
              >
                Ver
              </button>
              <button 
                className="medic-btn-small"
                onClick={() => handleEditPatient(patient)}
              >
                Editar
              </button>
              <button 
                className="medic-btn-small medic-btn-report"
                onClick={() => handleShowReport(patient)}
              >
                Informe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAppointments = () => {
    const stats = getAppointmentStats();
    const filteredAppointments = getFilteredAppointments();

    return (
      <div className="medic-appointments-content">
        <div className="medic-appointments-header">
          <h3>Gestión de Consultas</h3>
          <div className="medic-appointments-actions">
            <div className="medic-appointments-filters">
              <select 
                value={appointmentFilter} 
                onChange={(e) => setAppointmentFilter(e.target.value)}
                className="medic-filter-select"
              >
                <option value="all">Todas las consultas</option>
                <option value="today">Hoy</option>
                <option value="scheduled">Programadas</option>
                <option value="completed">Completadas</option>
                <option value="cancelled">Canceladas</option>
              </select>
            </div>
            <button className="medic-btn medic-btn-primary" onClick={handleNewAppointment}>
              <Plus size={20} />
              Nueva Consulta
            </button>
          </div>
        </div>

        <div className="medic-appointments-stats">
          <div className="medic-appointment-stat today">
            <h4>Consultas Hoy</h4>
            <p className="stat-number">{stats.today}</p>
          </div>
          <div className="medic-appointment-stat pending">
            <h4>Programadas</h4>
            <p className="stat-number">{stats.scheduled}</p>
          </div>
          <div className="medic-appointment-stat completed">
            <h4>Completadas</h4>
            <p className="stat-number">{stats.completed}</p>
          </div>
          <div className="medic-appointment-stat cancelled">
            <h4>Canceladas</h4>
            <p className="stat-number">{stats.cancelled}</p>
          </div>
        </div>

        <div className="medic-appointments-table">
          <div className="medic-appointments-table-header">
            <div>Paciente</div>
            <div>Fecha</div>
            <div>Hora</div>
            <div>Motivo</div>
            <div>Estado</div>
            <div>Acciones</div>
          </div>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map(appointment => (
              <div key={appointment.id} className="medic-appointments-table-row">
                <div className="medic-appointment-patient">
                  <strong>{appointment.patientName}</strong>
                  {appointment.isRecurring && (
                    <div className="medic-recurring-indicator">
                      <span>Recurrente</span>
                    </div>
                  )}
                </div>
                <div className="medic-appointment-datetime">
                  <div className="medic-appointment-date">
                    {new Date(appointment.date).toLocaleDateString('es-ES')}
                  </div>
                </div>
                <div className="medic-appointment-datetime">
                  <div className="medic-appointment-time">{appointment.time}</div>
                </div>
                <div className="medic-appointment-reason">{appointment.reason}</div>
                <div>
                  <span 
                    className={`medic-appointment-status ${appointment.status}`}
                  >
                    {appointment.status === 'scheduled' ? 'Programada' :
                     appointment.status === 'completed' ? 'Completada' :
                     appointment.status === 'cancelled' ? 'Cancelada' : 'En progreso'}
                  </span>
                </div>
                <div className="medic-appointment-actions">
                  <button 
                    className="medic-btn-appointment edit"
                    onClick={() => handleEditAppointment(appointment)}
                  >
                    Editar
                  </button>
                  {appointment.status === 'scheduled' && (
                    <>
                      <button 
                        className="medic-btn-appointment complete"
                        onClick={() => handleCompleteAppointment(appointment.id)}
                      >
                        Completar
                      </button>
                      <button 
                        className="medic-btn-appointment cancel"
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="medic-no-appointments">
              <h4>No hay consultas</h4>
              <p>No se encontraron consultas con los filtros seleccionados.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderNotifications = () => {
    const stats = getNotificationStats();
    const filteredNotifications = getFilteredNotifications();

    return (
      <div className="medic-notifications-content">
        <div className="medic-notifications-header">
          <h3>
            <Bell size={24} />
            Gestión de Notificaciones
          </h3>
          <div className="medic-notifications-actions">
            <div className="medic-notifications-filters">
              <select 
                value={notificationFilter} 
                onChange={(e) => setNotificationFilter(e.target.value)}
                className="medic-filter-select"
              >
                <option value="all">Todas las notificaciones</option>
                <option value="sent">Enviadas</option>
                <option value="pending">Pendientes</option>
                <option value="failed">Fallidas</option>
              </select>
            </div>
            <button className="medic-btn medic-btn-primary" onClick={handleNewNotification}>
              <Plus size={20} />
              Crear Notificación
            </button>
          </div>
        </div>

        <div className="medic-notifications-stats">
          <div className="medic-notification-stat total">
            <h4>Total Notificaciones</h4>
            <p className="stat-number">{stats.total}</p>
          </div>
          <div className="medic-notification-stat sent">
            <h4>Enviadas</h4>
            <p className="stat-number">{stats.sent}</p>
          </div>
          <div className="medic-notification-stat pending">
            <h4>Pendientes</h4>
            <p className="stat-number">{stats.pending}</p>
          </div>
          <div className="medic-notification-stat failed">
            <h4>Fallidas</h4>
            <p className="stat-number">{stats.failed}</p>
          </div>
        </div>

        <div className="medic-notifications-list">
          <div className="medic-notifications-list-header">
            <div>Notificación</div>
            <div>Destinatarios</div>
            <div>Fecha</div>
            <div>Estado</div>
            <div>Acciones</div>
          </div>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <div key={notification.id} className="medic-notifications-list-row">
                <div className="medic-notification-content">
                  <h4 className="medic-notification-title">{notification.title}</h4>
                  <p className="medic-notification-subtitle">{notification.subtitle}</p>
                </div>
                <div className="medic-notification-recipients">
                  <Users size={16} />
                  <span>
                    {notification.recipients === 'all' 
                      ? `Todos (${notification.recipientCount})` 
                      : `${notification.recipientCount} paciente${notification.recipientCount > 1 ? 's' : ''}`
                    }
                  </span>
                </div>
                <div className="medic-notification-date">
                  {new Date(notification.createdAt).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div>
                  <span className={`medic-notification-status ${notification.status}`}>
                    {notification.status === 'sent' ? 'Enviada' :
                     notification.status === 'pending' ? 'Pendiente' : 'Fallida'}
                  </span>
                </div>
                <div className="medic-notification-actions">
                  <button className="medic-btn-notification view">
                    Ver
                  </button>
                  {notification.status === 'failed' && (
                    <button 
                      className="medic-btn-notification resend"
                      onClick={() => handleResendNotification(notification.id)}
                    >
                      Reenviar
                    </button>
                  )}
                  <button 
                    className="medic-btn-notification delete"
                    onClick={() => handleDeleteNotification(notification.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="medic-no-notifications">
              <h4>No hay notificaciones</h4>
              <p>No se encontraron notificaciones con los filtros seleccionados.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderReports = () => (
    <div className="medic-reports-content">
      <div className="medic-reports-header">
        <h3>Informes y Estadísticas</h3>
        <select className="medic-select">
          <option>Último mes</option>
          <option>Últimos 3 meses</option>
          <option>Último año</option>
        </select>
      </div>

      {/* Gráficos de Salud */}
      <div className="medic-health-charts-section">
        <h4>Gráficos de Seguimiento de Salud</h4>
        <div className="medic-health-charts-grid">
          <div className="medic-chart-item">
            <h5>Control de Glucosa</h5>
            <img 
              src={Glucosa} 
              alt="Gráfico de Control de Glucosa" 
              className="medic-health-chart"
            />
            <p>Monitoreo de niveles de glucosa en sangre y control diabético.</p>
          </div>

          <div className="medic-chart-item">
            <h5>Regresión de Hipertensión</h5>
            <img 
              src={Hipertension_Regression}
              alt="Gráfico de Regresión de Hipertensión" 
              className="medic-health-chart"
            />
            <p>Análisis de regresión y tendencias en el control de la hipertensión.</p>
          </div>

          <div className="medic-chart-item">
            <h5>Control de Hipertensión</h5>
            <img 
              src={Hipertension}
              alt="Gráfico de Control de Hipertensión" 
              className="medic-health-chart"
            />
            <p>Seguimiento de presión arterial y efectividad del tratamiento.</p>
          </div>

          <div className="medic-chart-item">
            <h5>Uso de Aplicacion</h5>
            <img 
              src={Frecuencia}
              alt="Gráfico del uso de la aplicacion" 
              className="medic-health-chart"
            />
            <p>Análisis del uso de la aplicacion.</p>
          </div>

          <div className="medic-chart-item">
            <h5>Actividad de Caminata</h5>
            <img 
              src={Caminata}
              alt="Gráfico de Actividad de Caminata" 
              className="medic-health-chart"
            />
            <p>Registro de actividad física diaria y patrones de ejercicio.</p>
          </div>

          <div className="medic-chart-item">
            <h5>Frecuencia Cardíaca</h5>
            <img 
              src={FrecuenciaCardiaca}
              alt="Gráfico de Frecuencia Cardíaca" 
              className="medic-health-chart"
            />
            <p>Monitoreo continuo de frecuencia cardíaca en reposo y actividad.</p>
          </div>

          <div className="medic-chart-item">
            <h5>Índice de Riesgo</h5>
            <img 
              src={IndiceRiesgo}
              alt="Gráfico de Índice de Riesgo" 
              className="medic-health-chart"
            />
            <p>Evaluación del índice de riesgo cardiovascular y factores asociados.</p>
          </div>

          <div className="medic-chart-item">
            <h5>Monitoreo de Pulso</h5>
            <img 
              src={Pulso} 
              alt="Gráfico de Pulso" 
              className="medic-health-chart"
            />
            <p>Registro del pulso en diferentes momentos y condiciones.</p>
          </div>

          <div className="medic-chart-item">
            <h5>Ritmo Cardíaco</h5>
            <img 
              src={RitmoCardiaco}
              alt="Gráfico de Ritmo Cardíaco" 
              className="medic-health-chart"
            />
            <p>Análisis del ritmo cardíaco y variabilidad a lo largo del tiempo.</p>
          </div>
        </div>
      </div>
      <div className="medic-reports-grid">
        <div className="medic-report-card">
          <div className="medic-report-header">
            <h4>Consultas por Mes</h4>
            <TrendingUp size={20} />
          </div>
          <div className="medic-report-chart">
            <div className="medic-chart-placeholder">
              <p>Gráfico de consultas mensuales</p>
              <div className="medic-chart-bars">
                <div className="medic-chart-bar" style={{height: '60%'}}></div>
                <div className="medic-chart-bar" style={{height: '80%'}}></div>
                <div className="medic-chart-bar" style={{height: '45%'}}></div>
                <div className="medic-chart-bar" style={{height: '90%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="medic-report-card">
          <div className="medic-report-header">
            <h4>Condiciones Más Comunes</h4>
            <Heart size={20} />
          </div>
          <div className="medic-conditions-list">
            <div className="medic-condition-item">
              <span>Hipertensión</span>
              <span className="medic-condition-count">45%</span>
            </div>
            <div className="medic-condition-item">
              <span>Diabetes</span>
              <span className="medic-condition-count">32%</span>
            </div>
            <div className="medic-condition-item">
              <span>Artritis</span>
              <span className="medic-condition-count">28%</span>
            </div>
            <div className="medic-condition-item">
              <span>Otros</span>
              <span className="medic-condition-count">15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="medic-settings-content">
      <h3>Configuración del Portal Médico</h3>
      <div className="medic-settings-sections">
        {/* Perfil Profesional */}
        <div className="medic-settings-section">
          <h4>Perfil Profesional</h4>
          <div className="medic-settings-form">
            <div className="medic-settings-grid">
              <div className="medic-form-group">
                <label>Nombre Completo</label>
                <input type="text" value={doctor.name} className="medic-form-input" />
              </div>
              <div className="medic-form-group">
                <label>Especialidad</label>
                <input type="text" value={doctor.specialty} className="medic-form-input" />
              </div>
              <div className="medic-form-group">
                <label>Número de Licencia</label>
                <input type="text" value={doctor.license} className="medic-form-input" />
              </div>
              <div className="medic-form-group">
                <label>Teléfono de Contacto</label>
                <input type="tel" placeholder="+52 55 1234 5678" className="medic-form-input" />
              </div>
              <div className="medic-form-group">
                <label>Email Profesional</label>
                <input type="email" placeholder="doctor@clinica.com" className="medic-form-input" />
              </div>
              <div className="medic-form-group">
                <label>Institución</label>
                <input type="text" placeholder="Centro Médico Geriátrico" className="medic-form-input" />
              </div>
            </div>
          </div>
        </div>

        {/* Configuración de Consultas */}
        <div className="medic-settings-section">
          <h4>
            <Calendar size={20} />
            Configuración de Consultas
          </h4>
          <div className="medic-settings-form">
            <div className="medic-settings-grid">
              <div className="medic-form-group">
                <label>Duración por Defecto (minutos)</label>
                <select className="medic-form-input">
                  <option value="30">30 minutos</option>
                  <option value="45">45 minutos</option>
                  <option value="60" selected>60 minutos</option>
                  <option value="90">90 minutos</option>
                </select>
              </div>
              <div className="medic-form-group">
                <label>Horario de Inicio</label>
                <input type="time" value="08:00" className="medic-form-input" />
              </div>
              <div className="medic-form-group">
                <label>Horario de Fin</label>
                <input type="time" value="18:00" className="medic-form-input" />
              </div>
              <div className="medic-form-group">
                <label>Días Laborales</label>
                <div className="medic-days-selector">
                  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, index) => (
                    <label key={day} className="medic-day-checkbox">
                      <input 
                        type="checkbox" 
                        defaultChecked={index < 5} 
                      />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="medic-form-group">
              <label className="medic-checkbox-label">
                <input type="checkbox" defaultChecked />
                Permitir consultas de emergencia fuera del horario
              </label>
              <label className="medic-checkbox-label">
                <input type="checkbox" defaultChecked />
                Confirmar automáticamente consultas recurrentes
              </label>
            </div>
          </div>
        </div>

        {/* Notificaciones y Alertas */}
        <div className="medic-settings-section">
          <h4>
            <Bell size={20} />
            Notificaciones y Alertas
          </h4>
          <div className="medic-settings-options">
            <div className="medic-notification-group">
              <h5>Alertas Médicas</h5>
              <label className="medic-checkbox-label">
                <input type="checkbox" defaultChecked />
                Alertas de pacientes críticos
              </label>
              <label className="medic-checkbox-label">
                <input type="checkbox" defaultChecked />
                Signos vitales fuera de rango
              </label>
              <label className="medic-checkbox-label">
                <input type="checkbox" defaultChecked />
                Síntomas detectados por Navi
              </label>
            </div>
            
            <div className="medic-notification-group">
              <h5>Recordatorios</h5>
              <label className="medic-checkbox-label">
                <input type="checkbox" defaultChecked />
                Recordatorios de citas (30 min antes)
              </label>
              <label className="medic-checkbox-label">
                <input type="checkbox" defaultChecked />
                Seguimientos pendientes
              </label>
              <label className="medic-checkbox-label">
                <input type="checkbox" />
                Renovación de recetas
              </label>
            </div>

            <div className="medic-notification-group">
              <h5>Reportes</h5>
              <label className="medic-checkbox-label">
                <input type="checkbox" />
                Reportes semanales
              </label>
              <label className="medic-checkbox-label">
                <input type="checkbox" defaultChecked />
                Resumen mensual de pacientes
              </label>
              <label className="medic-checkbox-label">
                <input type="checkbox" />
                Estadísticas de consultas
              </label>
            </div>
          </div>
        </div>

        {/* Configuración de Navi */}
        <div className="medic-settings-section">
          <h4>
            <Activity size={20} />
            Configuración de Navi (IA)
          </h4>
          <div className="medic-settings-form">
            <div className="medic-settings-grid">
              <div className="medic-form-group">
                <label>Sensibilidad de Detección</label>
                <select className="medic-form-input">
                  <option value="low">Baja - Solo síntomas evidentes</option>
                  <option value="medium" selected>Media - Balance recomendado</option>
                  <option value="high">Alta - Máxima sensibilidad</option>
                </select>
              </div>
              <div className="medic-form-group">
                <label>Frecuencia de Reportes</label>
                <select className="medic-form-input">
                  <option value="daily">Diario</option>
                  <option value="weekly" selected>Semanal</option>
                  <option value="monthly">Mensual</option>
                </select>
              </div>
            </div>
            <div className="medic-form-group">
              <label className="medic-checkbox-label">
                <input type="checkbox" defaultChecked />
                Alertas automáticas por síntomas críticos
              </label>
              <label className="medic-checkbox-label">
                <input type="checkbox" defaultChecked />
                Incluir análisis de estado de ánimo
              </label>
              <label className="medic-checkbox-label">
                <input type="checkbox" />
                Monitoreo nocturno de patrones de sueño
              </label>
            </div>
          </div>
        </div>

        {/* Seguridad y Privacidad */}
        <div className="medic-settings-section">
          <h4>
            Seguridad y Privacidad
          </h4>
          <div className="medic-settings-form">
            <div className="medic-settings-grid">
              <div className="medic-form-group">
                <label>Tiempo de Sesión (minutos)</label>
                <select className="medic-form-input">
                  <option value="30">30 minutos</option>
                  <option value="60">60 minutos</option>
                  <option value="120" selected>120 minutos</option>
                  <option value="240">240 minutos</option>
                </select>
              </div>
              <div className="medic-form-group">
                <label>Backup de Datos</label>
                <select className="medic-form-input">
                  <option value="daily" selected>Diario</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensual</option>
                </select>
              </div>
            </div>
            <div className="medic-form-group">
              <label className="medic-checkbox-label">
                <input type="checkbox" defaultChecked />
                Autenticación de dos factores
              </label>
              <label className="medic-checkbox-label">
                <input type="checkbox" defaultChecked />
                Cifrado de datos sensibles
              </label>
              <label className="medic-checkbox-label">
                <input type="checkbox" />
                Auditoría de accesos
              </label>
            </div>
          </div>
        </div>

        {/* Personalización de Interfaz */}
        <div className="medic-settings-section">
          <h4>
            <Settings size={20} />
            Personalización de Interfaz
          </h4>
          <div className="medic-settings-form">
            <div className="medic-settings-grid">
              <div className="medic-form-group">
                <label>Tema de Color</label>
                <select className="medic-form-input">
                  <option value="blue" selected>Azul Médico</option>
                  <option value="green">Verde Salud</option>
                  <option value="purple">Púrpura Profesional</option>
                  <option value="dark">Modo Oscuro</option>
                </select>
              </div>
              <div className="medic-form-group">
                <label>Idioma</label>
                <select className="medic-form-input">
                  <option value="es" selected>Español</option>
                  <option value="en">English</option>
                  <option value="pt">Português</option>
                </select>
              </div>
              <div className="medic-form-group">
                <label>Zona Horaria</label>
                <select className="medic-form-input">
                  <option value="america/mexico_city" selected>Ciudad de México (GMT-6)</option>
                  <option value="america/new_york">Nueva York (GMT-5)</option>
                  <option value="america/los_angeles">Los Ángeles (GMT-8)</option>
                </select>
              </div>
              <div className="medic-form-group">
                <label>Elementos por Página</label>
                <select className="medic-form-input">
                  <option value="10">10</option>
                  <option value="25" selected>25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="medic-settings-actions">
          <button className="medic-btn medic-btn-primary">
            Guardar Configuración
          </button>
          <button className="medic-btn-secondary">
            Restaurar Valores por Defecto
          </button>
          <button className="medic-btn-export">
            Exportar Configuración
          </button>
          </div>
        </div>
      </div>
  );

  return (
    <div className="medic-dashboard-container">
      <div className="medic-header">
        <div className="medic-header-left">
          <div className="medic-logo">
            <Activity size={32} />
            <span>MediPanel</span>
          </div>
          <div className="medic-doctor-info">
            <h2>Bienvenido, {doctor.name}</h2>
            <p>{doctor.specialty} • {doctor.license}</p>
          </div>
        </div>
        <div className="medic-header-right">
          <button className="medic-notification-btn">
            <Bell size={20} />
            <span className="medic-notification-badge">3</span>
          </button>
          <button onClick={onLogout} className="medic-logout-btn">
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="medic-main-content">
        <div className="medic-sidebar">
          <nav className="medic-nav">
            <button 
              className={`medic-nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveSection('dashboard')}
            >
              <Activity size={20} />
              Dashboard
            </button>
            <button 
              className={`medic-nav-item ${activeSection === 'patients' ? 'active' : ''}`}
              onClick={() => setActiveSection('patients')}
            >
              <Users size={20} />
              Pacientes
            </button>
            <button 
              className={`medic-nav-item ${activeSection === 'appointments' ? 'active' : ''}`}
              onClick={() => setActiveSection('appointments')}
            >
              <Calendar size={20} />
              Consultas
            </button>
            <button 
              className={`medic-nav-item ${activeSection === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveSection('reports')}
            >
              <FileText size={20} />
              Informes
            </button>
            <button 
              className={`medic-nav-item ${activeSection === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveSection('settings')}
            >
              <Settings size={20} />
              Configuración
            </button>
            <button 
              className={`medic-nav-item ${activeSection === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveSection('notifications')}
            >
              <Bell size={20} />
              Notificaciones
            </button>
          </nav>
        </div>

        <div className="medic-content">
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'patients' && renderPatients()}
          {activeSection === 'appointments' && renderAppointments()}
          {activeSection === 'notifications' && renderNotifications()}
          {activeSection === 'reports' && renderReports()}
          {activeSection === 'settings' && renderSettings()}
        </div>
      </div>

      <NewPatientModal
        isOpen={showNewPatientModal}
        onClose={() => setShowNewPatientModal(false)}
        onSave={handleNewPatient}
      />

      <PatientViewModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedPatient(null);
        }}
        patient={selectedPatient}
      />

      <PatientEditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedPatient(null);
        }}
        patient={selectedPatient}
        onSave={handleSavePatient}
      />

      <PatientReportModal
        isOpen={showReportModal}
        onClose={() => {
          setShowReportModal(false);
          setSelectedPatient(null);
        }}
        patient={selectedPatient}
      />

      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => {
          setShowAppointmentModal(false);
          setEditingAppointment(null);
        }}
        patients={patients}
        onSave={handleSaveAppointment}
        editingAppointment={editingAppointment}
      />

      <NotificationModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        patients={patients}
        onSave={handleSaveNotification}
      />
    </div>
  );
}

export default MedicDashboard;