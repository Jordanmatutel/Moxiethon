import React, { useState } from 'react';
import { X, Plus, Upload, FileText, User, Heart, Activity, Scale, Ruler, AlertTriangle } from 'lucide-react';
import '../../styles/Medic/NewPatientModal.css';

function NewPatientModal({ isOpen, onClose, onSave }) {
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
    avgHeartRhythm: ''
  });

  const [csvData, setCsvData] = useState('');
  const [showCsvImport, setShowCsvImport] = useState(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
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

  const parseCsvData = (csvText) => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return null;

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const values = lines[1].split(',').map(v => v.trim());

    const csvMapping = {
      'presion arterial': 'bloodPressure',
      'presión arterial': 'bloodPressure',
      'blood pressure': 'bloodPressure',
      'frecuencia cardiaca': 'heartRate',
      'frecuencia cardíaca': 'heartRate',
      'heart rate': 'heartRate',
      'pulso': 'pulse',
      'pulse': 'pulse',
      'ritmo cardiaco promedio': 'avgHeartRhythm',
      'ritmo cardíaco promedio': 'avgHeartRhythm',
      'average heart rhythm': 'avgHeartRhythm'
    };

    const parsedData = {};
    headers.forEach((header, index) => {
      const mappedField = csvMapping[header];
      if (mappedField && values[index]) {
        parsedData[mappedField] = values[index];
      }
    });

    return parsedData;
  };

  const handleCsvImport = () => {
    const parsed = parseCsvData(csvData);
    if (parsed) {
      setFormData(prev => ({
        ...prev,
        ...parsed
      }));
      setShowCsvImport(false);
      setCsvData('');
    } else {
      alert('Error al procesar el CSV. Verifique el formato.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newPatient = {
        id: Date.now(),
        name: formData.name,
        age: parseInt(formData.age),
        weight: `${formData.weight} kg`,
        height: `${formData.height} m`,
        mobility: `${formData.mobility}/5`,
        conditions: formData.conditions,
        allergies: formData.allergies || 'Ninguna',
        bloodPressure: formData.bloodPressure || 'No registrado',
        heartRate: formData.heartRate || 'No registrado',
        pulse: formData.pulse || 'No registrado',
        avgHeartRhythm: formData.avgHeartRhythm || 'No registrado',
        lastVisit: new Date().toISOString().split('T')[0],
        status: 'stable',
        nextAppointment: 'Por programar'
      };
      
      onSave(newPatient);
      onClose();
      
      // Reset form
      setFormData({
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
        avgHeartRhythm: ''
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="medic-modal-overlay">
      <div className="medic-modal">
        <div className="medic-modal-header">
          <h3>
            <User size={24} />
            Nuevo Paciente
          </h3>
          <button onClick={onClose} className="medic-modal-close">
            <X size={24} />
          </button>
        </div>

        <div className="medic-modal-content">
          <form onSubmit={handleSubmit} className="medic-patient-form">
            {/* Información Básica */}
            <div className="medic-form-section">
              <h4>
                <User size={20} />
                Información Básica
              </h4>
              <div className="medic-form-grid">
                <div className="medic-form-group">
                  <label>Nombre Completo *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`medic-form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Ej: María González"
                  />
                  {errors.name && <span className="medic-error-text">{errors.name}</span>}
                </div>

                <div className="medic-form-group">
                  <label>Edad *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className={`medic-form-input ${errors.age ? 'error' : ''}`}
                    placeholder="Ej: 72"
                    min="1"
                    max="120"
                  />
                  {errors.age && <span className="medic-error-text">{errors.age}</span>}
                </div>

                <div className="medic-form-group">
                  <label>
                    <Scale size={16} />
                    Peso (kg) *
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className={`medic-form-input ${errors.weight ? 'error' : ''}`}
                    placeholder="Ej: 65"
                    min="1"
                    max="300"
                    step="0.1"
                  />
                  {errors.weight && <span className="medic-error-text">{errors.weight}</span>}
                </div>

                <div className="medic-form-group">
                  <label>
                    <Ruler size={16} />
                    Estatura (m) *
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className={`medic-form-input ${errors.height ? 'error' : ''}`}
                    placeholder="Ej: 1.62"
                    min="0.5"
                    max="2.5"
                    step="0.01"
                  />
                  {errors.height && <span className="medic-error-text">{errors.height}</span>}
                </div>
              </div>
            </div>

            {/* Movilidad */}
            <div className="medic-form-section">
              <h4>
                <Activity size={20} />
                Movilidad
              </h4>
              <div className="medic-mobility-selector">
                <label>Nivel de Movilidad (0 = Nula, 5 = Excelente)</label>
                <div className="medic-mobility-scale">
                  {[0, 1, 2, 3, 4, 5].map(level => (
                    <label key={level} className="medic-mobility-option">
                      <input
                        type="radio"
                        name="mobility"
                        value={level.toString()}
                        checked={formData.mobility === level.toString()}
                        onChange={handleInputChange}
                      />
                      <span className="medic-mobility-label">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Padecimientos */}
            <div className="medic-form-section">
              <h4>
                <Heart size={20} />
                Padecimientos
              </h4>
              <div className="medic-conditions-grid">
                {commonConditions.map(condition => (
                  <label key={condition} className="medic-condition-checkbox">
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
            <div className="medic-form-section">
              <h4>
                <AlertTriangle size={20} />
                Alergias
              </h4>
              <div className="medic-form-group">
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  className="medic-form-textarea"
                  placeholder="Ej: Polen, Mariscos, Penicilina..."
                  rows="3"
                />
              </div>
            </div>

            {/* Datos Vitales */}
            <div className="medic-form-section">
              <div className="medic-section-header-with-import">
                <h4>
                  <Activity size={20} />
                  Datos Vitales
                </h4>
                <button
                  type="button"
                  onClick={() => setShowCsvImport(!showCsvImport)}
                  className="medic-btn-import"
                >
                  <Upload size={16} />
                  Importar CSV
                </button>
              </div>

              {showCsvImport && (
                <div className="medic-csv-import">
                  <div className="medic-csv-help">
                    <FileText size={16} />
                    <div>
                      <p><strong>Formato CSV esperado:</strong></p>
                      <code>Presión Arterial,Frecuencia Cardíaca,Pulso,Ritmo Cardíaco Promedio</code>
                      <br />
                      <code>130/80 mmHg,75 bpm,Normal,72 bpm</code>
                    </div>
                  </div>
                  <textarea
                    value={csvData}
                    onChange={(e) => setCsvData(e.target.value)}
                    className="medic-csv-textarea"
                    placeholder="Pegue aquí los datos CSV..."
                    rows="4"
                  />
                  <div className="medic-csv-actions">
                    <button type="button" onClick={handleCsvImport} className="medic-btn-small">
                      Importar Datos
                    </button>
                    <button type="button" onClick={() => setShowCsvImport(false)} className="medic-btn-cancel">
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              <div className="medic-form-grid">
                <div className="medic-form-group">
                  <label>Presión Arterial</label>
                  <input
                    type="text"
                    name="bloodPressure"
                    value={formData.bloodPressure}
                    onChange={handleInputChange}
                    className="medic-form-input"
                    placeholder="Ej: 130/80 mmHg"
                  />
                </div>

                <div className="medic-form-group">
                  <label>Frecuencia Cardíaca</label>
                  <input
                    type="text"
                    name="heartRate"
                    value={formData.heartRate}
                    onChange={handleInputChange}
                    className="medic-form-input"
                    placeholder="Ej: 75 bpm"
                  />
                </div>

                <div className="medic-form-group">
                  <label>Pulso</label>
                  <input
                    type="text"
                    name="pulse"
                    value={formData.pulse}
                    onChange={handleInputChange}
                    className="medic-form-input"
                    placeholder="Ej: Normal"
                  />
                </div>

                <div className="medic-form-group">
                  <label>Ritmo Cardíaco Promedio</label>
                  <input
                    type="text"
                    name="avgHeartRhythm"
                    value={formData.avgHeartRhythm}
                    onChange={handleInputChange}
                    className="medic-form-input"
                    placeholder="Ej: 72 bpm"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="medic-modal-footer">
          <button type="button" onClick={onClose} className="medic-btn-cancel">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="medic-btn medic-btn-primary">
            <Plus size={20} />
            Crear Paciente
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewPatientModal;