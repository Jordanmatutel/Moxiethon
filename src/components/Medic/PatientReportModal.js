import React from 'react';
import { X, FileText, User, TrendingUp, Heart, Activity, Calendar, Download, Printer as Print } from 'lucide-react';
import '../../styles/Medic/PatientReportModal.css';
import Caminata from '../../assets/images/Caminata.png'
import FrecuenciaCardiaca from '../../assets/images/FrecuenciaCardiaca.png'
import Hipertension from '../../assets/images/Hipertension.png'
import Pulso from '../../assets/images/Pulso.png'
import RitmoCardiaco from '../../assets/images/RitmoCardiaco.png'

function PatientReportModal({ isOpen, onClose, patient }) {
  if (!isOpen || !patient) return null;

  const generateReportDate = () => {
    return new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMobilityText = (mobility) => {
    const level = parseInt(mobility);
    const descriptions = {
      0: 'Nula',
      1: 'Muy limitada',
      2: 'Limitada',
      3: 'Moderada',
      4: 'Buena',
      5: 'Excelente'
    };
    return descriptions[level] || 'No especificado';
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'stable': return 'Estable';
      case 'monitoring': return 'En seguimiento';
      case 'critical': return 'Crítico';
      default: return 'Sin estado';
    }
  };

  const formatConditions = (conditions) => {
    if (Array.isArray(conditions)) {
      return conditions.length > 0 ? conditions.join(', ') : 'Ninguna registrada';
    }
    return conditions || 'Ninguna registrada';
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Simular descarga de PDF
    alert('Funcionalidad de descarga en desarrollo. El informe se descargaría como PDF.');
  };

  return (
    <div className="patient-report-modal-overlay">
      <div className="patient-report-modal">
        <div className="patient-report-modal-header">
          <h3>
            <FileText size={24} />
            Informe Médico - {patient.name}
          </h3>
          <div className="report-actions">
            <button onClick={handlePrint} className="btn-action">
              <Print size={20} />
              Imprimir
            </button>
            <button onClick={handleDownload} className="btn-action">
              <Download size={20} />
              Descargar PDF
            </button>
            <button onClick={onClose} className="patient-report-modal-close">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="patient-report-modal-content">
          <div className="report-content">
            {/* Header del Informe */}
            <div className="report-header">
              <div className="clinic-info">
                <h2>Centro Médico Geriátrico</h2>
                <p>Informe Médico Integral</p>
                <p className="report-date">Fecha del informe: {generateReportDate()}</p>
              </div>
            </div>

            {/* Síntomas Captados por Navi */}
            <div className="report-section">
              <h3>
                <Activity size={20} />
                Síntomas Captados por Navi
              </h3>
              <div className="navi-symptoms">
                <p><strong>Síntomas reportados durante las interacciones con el asistente virtual:</strong></p>
                <ul className="symptoms-list">
                  <li>Dolor leve en articulaciones matutino</li>
                  <li>Sensación de fatiga después de actividades moderadas</li>
                  <li>Dificultad ocasional para conciliar el sueño</li>
                  <li>Mareos leves al levantarse rápidamente</li>
                  <li>Pérdida de apetito intermitente</li>
                </ul>
                <p className="navi-note">
                  <em>Nota: Estos síntomas fueron identificados mediante el análisis de conversaciones 
                  con el asistente virtual Navi durante el período de monitoreo.</em>
                </p>
              </div>
            </div>

            {/* Información del Paciente */}
            <div className="report-section">
              <h3>
                <User size={20} />
                Datos del Paciente
              </h3>
              <div className="report-grid">
                <div className="report-item">
                  <strong>Nombre:</strong> {patient.name}
                </div>
                <div className="report-item">
                  <strong>Edad:</strong> {patient.age} años
                </div>
                <div className="report-item">
                  <strong>Peso:</strong> {patient.weight}
                </div>
                <div className="report-item">
                  <strong>Estatura:</strong> {patient.height}
                </div>
                <div className="report-item">
                  <strong>Última visita:</strong> {patient.lastVisit}
                </div>
                <div className="report-item">
                  <strong>Estado actual:</strong> {getStatusText(patient.status)}
                </div>
              </div>
            </div>

          {/* Gráficos de Progreso de Salud */}
          <div className="report-section">
            <h3>
              <TrendingUp size={20} />
              Progreso Diario de Salud
            </h3>
            <div className="health-charts-grid">
              <div className="chart-item">
                <h4>Ritmo Cardíaco</h4>
                <img 
                  src={RitmoCardiaco} 
                  alt="Gráfico de Ritmo Cardíaco" 
                  className="health-chart-image"
                />
                <p className="chart-description">
                  Monitoreo continuo del ritmo cardíaco durante los últimos 7 días. 
                  Se observa estabilidad en los valores con ligeras variaciones normales.
                </p>
              </div>

              <div className="chart-item">
                <h4>Pulso</h4>
                <img 
                  src={Pulso}
                  alt="Gráfico de Pulso" 
                  className="health-chart-image"
                />
                <p className="chart-description">
                  Registro del pulso en diferentes momentos del día. 
                  Los valores se mantienen dentro del rango normal para la edad del paciente.
                </p>
              </div>

              <div className="chart-item">
                <h4>Actividad Física - Caminata</h4>
                <img 
                  src={Caminata} 
                  alt="Gráfico de Actividad de Caminata" 
                  className="health-chart-image"
                />
                <p className="chart-description">
                  Seguimiento de la actividad de caminata diaria. 
                  Se observa una tendencia positiva en la duración y frecuencia de las caminatas.
                </p>
              </div>

              <div className="chart-item">
                <h4>Frecuencia Cardíaca</h4>
                <img 
                  src={FrecuenciaCardiaca}
                  alt="Gráfico de Frecuencia Cardíaca" 
                  className="health-chart-image"
                />
                <p className="chart-description">
                  Análisis detallado de la frecuencia cardíaca en reposo y durante actividad. 
                  Los patrones muestran una respuesta cardiovascular adecuada.
                </p>
              </div>

              <div className="chart-item">
                <h4>Control de Hipertensión</h4>
                <img 
                  src={Hipertension}
                  alt="Gráfico de Control de Hipertensión" 
                  className="health-chart-image"
                />
                <p className="chart-description">
                  Monitoreo de la presión arterial y efectividad del tratamiento antihipertensivo. 
                  Se evidencia un control adecuado con el régimen actual.
                </p>
              </div>
            </div>

            <div className="charts-summary">
              <h4>Resumen del Progreso</h4>
              <p>
                Los gráficos de seguimiento muestran una evolución positiva en los indicadores 
                de salud del paciente. Se observa estabilidad en los signos vitales y una 
                mejora gradual en la actividad física. El control de la hipertensión se 
                mantiene dentro de parámetros aceptables con el tratamiento actual.
              </p>
            </div>
          </div>

            {/* Signos Vitales */}
            <div className="report-section">
              <h3>
                <TrendingUp size={20} />
                Signos Vitales
              </h3>
              <div className="vitals-table">
                <div className="vital-row">
                  <span className="vital-label">Presión Arterial:</span>
                  <span className="vital-value">{patient.bloodPressure || 'No registrado'}</span>
                </div>
                <div className="vital-row">
                  <span className="vital-label">Frecuencia Cardíaca:</span>
                  <span className="vital-value">{patient.heartRate || 'No registrado'}</span>
                </div>
                <div className="vital-row">
                  <span className="vital-label">Pulso:</span>
                  <span className="vital-value">{patient.pulse || 'No registrado'}</span>
                </div>
                <div className="vital-row">
                  <span className="vital-label">Ritmo Cardíaco Promedio:</span>
                  <span className="vital-value">{patient.avgHeartRhythm || 'No registrado'}</span>
                </div>
              </div>
            </div>

            {/* Evaluación Funcional */}
            <div className="report-section">
              <h3>
                <Activity size={20} />
                Evaluación Funcional
              </h3>
              <div className="mobility-assessment">
                <div className="mobility-score">
                  <strong>Nivel de Movilidad:</strong> {patient.mobility}/5 - {getMobilityText(patient.mobility)}
                </div>
                <div className="mobility-bar">
                  <div 
                    className="mobility-fill" 
                    style={{ width: `${(parseInt(patient.mobility) / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Condiciones Médicas */}
            <div className="report-section">
              <h3>
                <Heart size={20} />
                Condiciones Médicas
              </h3>
              <div className="conditions-list">
                <p><strong>Padecimientos actuales:</strong></p>
                <p>{formatConditions(patient.conditions)}</p>
              </div>
              <div className="allergies-info">
                <p><strong>Alergias conocidas:</strong></p>
                <p>{patient.allergies || 'Ninguna registrada'}</p>
              </div>
            </div>

            {/* Seguimiento */}
            <div className="report-section">
              <h3>
                <Calendar size={20} />
                Plan de Seguimiento
              </h3>
              <div className="follow-up-info">
                <p><strong>Próxima cita programada:</strong> {patient.nextAppointment}</p>
                <p><strong>Recomendaciones:</strong></p>
                <ul className="recommendations">
                  <li>Continuar con el plan de tratamiento actual</li>
                  <li>Monitoreo regular de signos vitales</li>
                  <li>Mantener actividad física según capacidad</li>
                  <li>Seguimiento de medicación prescrita</li>
                </ul>
              </div>
            </div>

            {/* Observaciones */}
            <div className="report-section">
              <h3>Observaciones Médicas</h3>
              <div className="observations">
                <p>El paciente presenta un estado general {getStatusText(patient.status).toLowerCase()}. 
                Se recomienda continuar con el seguimiento médico regular y mantener las medidas 
                preventivas establecidas.</p>
              </div>
            </div>

            {/* Footer del Informe */}
            <div className="report-footer">
              <div className="signature-section">
                <div className="signature-line">
                  <p>_________________________</p>
                  <p><strong>Dr. María Rodríguez</strong></p>
                  <p>Especialista en Geriatría</p>
                  <p>Cédula Profesional: MED-2024-001</p>
                </div>
              </div>
              <div className="report-disclaimer">
                <p><small>Este informe es confidencial y está destinado únicamente para uso médico profesional.</small></p>
              </div>
            </div>
          </div>
        </div>

        <div className="patient-report-modal-footer">
          <button onClick={onClose} className="btn-close">
            Cerrar Informe
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientReportModal;