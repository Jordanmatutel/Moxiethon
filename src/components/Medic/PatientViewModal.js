import React from 'react';
import { X, User, Scale, Ruler, Activity, Heart, AlertTriangle, Calendar, TrendingUp } from 'lucide-react';
import '../../styles/Medic/PatientViewModal.css';

function PatientViewModal({ isOpen, onClose, patient }) {
  if (!isOpen || !patient) return null;

  const getMobilityText = (mobility) => {
    const level = parseInt(mobility);
    const descriptions = {
      0: 'Nula - Sin movilidad',
      1: 'Muy limitada - Requiere asistencia total',
      2: 'Limitada - Requiere asistencia parcial',
      3: 'Moderada - Independiente con limitaciones',
      4: 'Buena - Independiente con mínimas limitaciones',
      5: 'Excelente - Completamente independiente'
    };
    return descriptions[level] || 'No especificado';
  };

  const formatConditions = (conditions) => {
    if (Array.isArray(conditions)) {
      return conditions.length > 0 ? conditions.join(', ') : 'Ninguna registrada';
    }
    return conditions || 'Ninguna registrada';
  };

  return (
    <div className="patient-modal-overlay">
      <div className="patient-modal">
        <div className="patient-modal-header">
          <h3>
            <User size={24} />
            Información del Paciente
          </h3>
          <button onClick={onClose} className="patient-modal-close">
            <X size={24} />
          </button>
        </div>

        <div className="patient-modal-content">
          <div className="patient-info-sections">
            {/* Información Básica */}
            <div className="patient-info-section">
              <h4>
                <User size={20} />
                Información Básica
              </h4>
              <div className="patient-info-grid">
                <div className="patient-info-item">
                  <label>Nombre Completo</label>
                  <span>{patient.name}</span>
                </div>
                <div className="patient-info-item">
                  <label>Edad</label>
                  <span>{patient.age} años</span>
                </div>
                <div className="patient-info-item">
                  <label>Peso</label>
                  <span>{patient.weight}</span>
                </div>
                <div className="patient-info-item">
                  <label>Estatura</label>
                  <span>{patient.height}</span>
                </div>
              </div>
            </div>

            {/* Movilidad */}
            <div className="patient-info-section">
              <h4>
                <Activity size={20} />
                Movilidad
              </h4>
              <div className="patient-mobility-display">
                <div className="mobility-scale">
                  {[0, 1, 2, 3, 4, 5].map(level => (
                    <div 
                      key={level} 
                      className={`mobility-indicator ${parseInt(patient.mobility) === level ? 'active' : ''}`}
                    >
                      {level}
                    </div>
                  ))}
                </div>
                <p className="mobility-description">
                  {getMobilityText(patient.mobility)}
                </p>
              </div>
            </div>

            {/* Padecimientos */}
            <div className="patient-info-section">
              <h4>
                <Heart size={20} />
                Padecimientos
              </h4>
              <div className="patient-conditions">
                <p>{formatConditions(patient.conditions)}</p>
              </div>
            </div>

            {/* Alergias */}
            <div className="patient-info-section">
              <h4>
                <AlertTriangle size={20} />
                Alergias
              </h4>
              <div className="patient-allergies">
                <p>{patient.allergies || 'Ninguna registrada'}</p>
              </div>
            </div>

            {/* Datos Vitales */}
            <div className="patient-info-section">
              <h4>
                <TrendingUp size={20} />
                Datos Vitales
              </h4>
              <div className="patient-vitals-grid">
                <div className="vital-item">
                  <label>Presión Arterial</label>
                  <span>{patient.bloodPressure || 'No registrado'}</span>
                </div>
                <div className="vital-item">
                  <label>Frecuencia Cardíaca</label>
                  <span>{patient.heartRate || 'No registrado'}</span>
                </div>
                <div className="vital-item">
                  <label>Pulso</label>
                  <span>{patient.pulse || 'No registrado'}</span>
                </div>
                <div className="vital-item">
                  <label>Ritmo Cardíaco Promedio</label>
                  <span>{patient.avgHeartRhythm || 'No registrado'}</span>
                </div>
              </div>
            </div>

            {/* Información Médica */}
            <div className="patient-info-section">
              <h4>
                <Calendar size={20} />
                Información Médica
              </h4>
              <div className="patient-medical-info">
                <div className="medical-item">
                  <label>Última Visita</label>
                  <span>{patient.lastVisit}</span>
                </div>
                <div className="medical-item">
                  <label>Estado Actual</label>
                  <span 
                    className="status-badge"
                    style={{ 
                      backgroundColor: patient.status === 'stable' ? '#22c55e' : 
                                     patient.status === 'monitoring' ? '#f59e0b' : '#ef4444',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.8rem'
                    }}
                  >
                    {patient.status === 'stable' ? 'Estable' : 
                     patient.status === 'monitoring' ? 'En seguimiento' : 'Crítico'}
                  </span>
                </div>
                <div className="medical-item">
                  <label>Próxima Cita</label>
                  <span>{patient.nextAppointment}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="patient-modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientViewModal;