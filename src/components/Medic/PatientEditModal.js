import React, { useState, useEffect } from 'react';
import { X, Save, User, Heart, Activity, Scale, Ruler, AlertTriangle, TrendingUp } from 'lucide-react';
import '../../styles/Medic/PatientEditModal.css';

function PatientEditModal({ isOpen, onClose, patient, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    mobility: '3',
    conditions: [],
    allergies: '',
    bloodPressure: '',
    heartRate: '',
    pulse: '',
    avgHeartRhythm: '',
    status: 'stable',
    nextAppointment: ''
  });

  const [errors, setErrors] = useState({});

  const commonConditions = [
    'Hipertensión',
    'Diabetes Tipo 1',
    'Diabetes Tipo 2',
    'Artritis',
    'Osteoporosis',
    'Enfermedad Cardíaca',
    'Colesterol Alto',
    'Asma',
    'EPOC',
    'Depresión',
    'Ansiedad',
    'Demencia',
    'Alzheimer'
  ];

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || '',
        age: patient.age?.toString() || '',
        weight: patient.weight?.replace(' kg', '') || '',
        height: patient.height?.replace(' m', '') || '',
        mobility: patient.mobility?.toString() || '3',
        conditions: Array.isArray(patient.conditions) ? patient.conditions : 
                   patient.conditions ? [patient.conditions] : [],
        allergies: patient.allergies || '',
        bloodPressure: patient.bloodPressure || '',
        heartRate: patient.heartRate || '',
        pulse: patient.pulse || '',
        avgHeartRhythm: patient.avgHeartRhythm || '',
        status: patient.status || 'stable',
        nextAppointment: patient.nextAppointment || ''
      });
    }
  }, [patient]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleConditionToggle = (condition) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.age || formData.age < 1 || formData.age > 120) newErrors.age = 'Edad debe estar entre 1 y 120 años';
    if (!formData.weight || formData.weight < 1 || formData.weight > 300) newErrors.weight = 'Peso debe estar entre 1 y 300 kg';
    if (!formData.height || formData.height < 0.5 || formData.height > 2.5) newErrors.height = 'Estatura debe estar entre 0.5 y 2.5 metros';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedPatient = {
        ...patient,
        name: formData.name,
        age: parseInt(formData.age),
        weight: `${formData.weight} kg`,
        height: `${formData.height} m`,
        mobility: formData.mobility,
        conditions: formData.conditions,
        allergies: formData.allergies || 'Ninguna',
        bloodPressure: formData.bloodPressure || 'No registrado',
        heartRate: formData.heartRate || 'No registrado',
        pulse: formData.pulse || 'No registrado',
        avgHeartRhythm: formData.avgHeartRhythm || 'No registrado',
        status: formData.status,
        nextAppointment: formData.nextAppointment || 'Por programar'
      };
      
      onSave(updatedPatient);
      onClose();
    }
  };

  if (!isOpen || !patient) return null;

  return (
    <div className="patient-edit-modal-overlay">
      <div className="patient-edit-modal">
        <div className="patient-edit-modal-header">
          <h3>
            <User size={24} />
            Editar Paciente
          </h3>
          <button onClick={onClose} className="patient-edit-modal-close">
            <X size={24} />
          </button>
        </div>

        <div className="patient-edit-modal-content">
          <form onSubmit={handleSubmit} className="patient-edit-form">
            {/* Información Básica */}
            <div className="patient-edit-section">
              <h4>
                <User size={20} />
                Información Básica
              </h4>
              <div className="patient-edit-grid">
                <div className="patient-edit-group">
                  <label>Nombre Completo *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`patient-edit-input ${errors.name ? 'error' : ''}`}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="patient-edit-group">
                  <label>Edad *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className={`patient-edit-input ${errors.age ? 'error' : ''}`}
                    min="1"
                    max="120"
                  />
                  {errors.age && <span className="error-text">{errors.age}</span>}
                </div>

                <div className="patient-edit-group">
                  <label>
                    <Scale size={16} />
                    Peso (kg) *
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className={`patient-edit-input ${errors.weight ? 'error' : ''}`}
                    min="1"
                    max="300"
                    step="0.1"
                  />
                  {errors.weight && <span className="error-text">{errors.weight}</span>}
                </div>

                <div className="patient-edit-group">
                  <label>
                    <Ruler size={16} />
                    Estatura (m) *
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className={`patient-edit-input ${errors.height ? 'error' : ''}`}
                    min="0.5"
                    max="2.5"
                    step="0.01"
                  />
                  {errors.height && <span className="error-text">{errors.height}</span>}
                </div>
              </div>
            </div>

            {/* Movilidad */}
            <div className="patient-edit-section">
              <h4>
                <Activity size={20} />
                Movilidad
              </h4>
              <div className="mobility-selector">
                <label>Nivel de Movilidad (0 = Nula, 5 = Excelente)</label>
                <div className="mobility-scale">
                  {[0, 1, 2, 3, 4, 5].map(level => (
                    <label key={level} className="mobility-option">
                      <input
                        type="radio"
                        name="mobility"
                        value={level.toString()}
                        checked={formData.mobility === level.toString()}
                        onChange={handleInputChange}
                      />
                      <span className="mobility-label">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Padecimientos */}
            <div className="patient-edit-section">
              <h4>
                <Heart size={20} />
                Padecimientos
              </h4>
              <div className="conditions-grid">
                {commonConditions.map(condition => (
                  <label key={condition} className="condition-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.conditions.includes(condition)}
                      onChange={() => handleConditionToggle(condition)}
                    />
                    <span>{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Alergias */}
            <div className="patient-edit-section">
              <h4>
                <AlertTriangle size={20} />
                Alergias
              </h4>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                className="patient-edit-textarea"
                placeholder="Ej: Polen, Mariscos, Penicilina..."
                rows="3"
              />
            </div>

            {/* Datos Vitales */}
            <div className="patient-edit-section">
              <h4>
                <TrendingUp size={20} />
                Datos Vitales
              </h4>
              <div className="patient-edit-grid">
                <div className="patient-edit-group">
                  <label>Presión Arterial</label>
                  <input
                    type="text"
                    name="bloodPressure"
                    value={formData.bloodPressure}
                    onChange={handleInputChange}
                    className="patient-edit-input"
                    placeholder="Ej: 130/80 mmHg"
                  />
                </div>

                <div className="patient-edit-group">
                  <label>Frecuencia Cardíaca</label>
                  <input
                    type="text"
                    name="heartRate"
                    value={formData.heartRate}
                    onChange={handleInputChange}
                    className="patient-edit-input"
                    placeholder="Ej: 75 bpm"
                  />
                </div>

                <div className="patient-edit-group">
                  <label>Pulso</label>
                  <input
                    type="text"
                    name="pulse"
                    value={formData.pulse}
                    onChange={handleInputChange}
                    className="patient-edit-input"
                    placeholder="Ej: Normal"
                  />
                </div>

                <div className="patient-edit-group">
                  <label>Ritmo Cardíaco Promedio</label>
                  <input
                    type="text"
                    name="avgHeartRhythm"
                    value={formData.avgHeartRhythm}
                    onChange={handleInputChange}
                    className="patient-edit-input"
                    placeholder="Ej: 72 bpm"
                  />
                </div>
              </div>
            </div>

            {/* Estado y Cita */}
            <div className="patient-edit-section">
              <h4>Información Médica</h4>
              <div className="patient-edit-grid">
                <div className="patient-edit-group">
                  <label>Estado del Paciente</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="patient-edit-input"
                  >
                    <option value="stable">Estable</option>
                    <option value="monitoring">En seguimiento</option>
                    <option value="critical">Crítico</option>
                  </select>
                </div>

                <div className="patient-edit-group">
                  <label>Próxima Cita</label>
                  <input
                    type="date"
                    name="nextAppointment"
                    value={formData.nextAppointment}
                    onChange={handleInputChange}
                    className="patient-edit-input"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="patient-edit-modal-footer">
          <button type="button" onClick={onClose} className="btn-cancel">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="btn-save">
            <Save size={20} />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientEditModal;