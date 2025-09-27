import React, { useState } from 'react';
import { X, Calendar, Clock, User, FileText, Repeat, Save } from 'lucide-react';
import '../../styles/Medic/AppointmentModal.css';

function AppointmentModal({ isOpen, onClose, patients, onSave, editingAppointment = null }) {
  const [formData, setFormData] = useState({
    patientId: editingAppointment?.patientId || '',
    date: editingAppointment?.date || '',
    time: editingAppointment?.time || '',
    reason: editingAppointment?.reason || '',
    isRecurring: editingAppointment?.isRecurring || false,
    recurringType: editingAppointment?.recurringType || 'weekly',
    recurringCount: editingAppointment?.recurringCount || 1,
    notes: editingAppointment?.notes || ''
  });

  const [errors, setErrors] = useState({});

  const recurringOptions = [
    { value: 'daily', label: 'Diario' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'biweekly', label: 'Cada 2 semanas' },
    { value: 'monthly', label: 'Mensual' }
  ];

  const commonReasons = [
    'Consulta de rutina',
    'Seguimiento de tratamiento',
    'Control de presión arterial',
    'Control diabético',
    'Revisión de medicamentos',
    'Evaluación de dolor',
    'Chequeo general',
    'Resultados de laboratorio'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.patientId) newErrors.patientId = 'Debe seleccionar un paciente';
    if (!formData.date) newErrors.date = 'La fecha es requerida';
    if (!formData.time) newErrors.time = 'La hora es requerida';
    if (!formData.reason.trim()) newErrors.reason = 'El motivo es requerido';
    
    // Validar que la fecha no sea en el pasado
    const selectedDate = new Date(formData.date + 'T' + formData.time);
    const now = new Date();
    if (selectedDate < now) {
      newErrors.date = 'No se puede agendar en el pasado';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateRecurringAppointments = (baseAppointment) => {
    const appointments = [baseAppointment];
    const baseDate = new Date(baseAppointment.date + 'T' + baseAppointment.time);
    
    for (let i = 1; i < formData.recurringCount; i++) {
      const newDate = new Date(baseDate);
      
      switch (formData.recurringType) {
        case 'daily':
          newDate.setDate(newDate.getDate() + i);
          break;
        case 'weekly':
          newDate.setDate(newDate.getDate() + (i * 7));
          break;
        case 'biweekly':
          newDate.setDate(newDate.getDate() + (i * 14));
          break;
        case 'monthly':
          newDate.setMonth(newDate.getMonth() + i);
          break;
      }
      
      appointments.push({
        ...baseAppointment,
        id: Date.now() + i,
        date: newDate.toISOString().split('T')[0],
        isRecurring: true,
        recurringGroup: baseAppointment.id
      });
    }
    
    return appointments;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const selectedPatient = patients.find(p => p.id.toString() === formData.patientId);
      
      const baseAppointment = {
        id: editingAppointment?.id || Date.now(),
        patientId: parseInt(formData.patientId),
        patientName: selectedPatient?.name || 'Paciente no encontrado',
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        notes: formData.notes,
        status: editingAppointment?.status || 'scheduled',
        isRecurring: formData.isRecurring,
        recurringType: formData.recurringType,
        recurringCount: formData.recurringCount
      };
      
      if (formData.isRecurring && formData.recurringCount > 1) {
        const appointments = generateRecurringAppointments(baseAppointment);
        appointments.forEach(appointment => onSave(appointment));
      } else {
        onSave(baseAppointment);
      }
      
      onClose();
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      patientId: '',
      date: '',
      time: '',
      reason: '',
      isRecurring: false,
      recurringType: 'weekly',
      recurringCount: 1,
      notes: ''
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="appointment-modal-overlay">
      <div className="appointment-modal">
        <div className="appointment-modal-header">
          <h3>
            <Calendar size={24} />
            {editingAppointment ? 'Editar Consulta' : 'Nueva Consulta'}
          </h3>
          <button onClick={onClose} className="appointment-modal-close">
            <X size={24} />
          </button>
        </div>

        <div className="appointment-modal-content">
          <form onSubmit={handleSubmit} className="appointment-form">
            {/* Selección de Paciente */}
            <div className="appointment-section">
              <h4>
                <User size={20} />
                Información de la Consulta
              </h4>
              <div className="appointment-grid">
                <div className="appointment-group">
                  <label>Paciente *</label>
                  <select
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleInputChange}
                    className={`appointment-input ${errors.patientId ? 'error' : ''}`}
                  >
                    <option value="">Seleccionar paciente...</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name} - {patient.age} años
                      </option>
                    ))}
                  </select>
                  {errors.patientId && <span className="error-text">{errors.patientId}</span>}
                </div>

                <div className="appointment-group">
                  <label>
                    <Calendar size={16} />
                    Fecha *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`appointment-input ${errors.date ? 'error' : ''}`}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.date && <span className="error-text">{errors.date}</span>}
                </div>

                <div className="appointment-group">
                  <label>
                    <Clock size={16} />
                    Hora *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className={`appointment-input ${errors.time ? 'error' : ''}`}
                  />
                  {errors.time && <span className="error-text">{errors.time}</span>}
                </div>
              </div>
            </div>

            {/* Motivo de la Consulta */}
            <div className="appointment-section">
              <h4>
                <FileText size={20} />
                Motivo de la Consulta
              </h4>
              <div className="appointment-group">
                <label>Motivo *</label>
                <select
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className={`appointment-input ${errors.reason ? 'error' : ''}`}
                >
                  <option value="">Seleccionar motivo...</option>
                  {commonReasons.map(reason => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                  <option value="custom">Otro (especificar en notas)</option>
                </select>
                {errors.reason && <span className="error-text">{errors.reason}</span>}
              </div>

              <div className="appointment-group">
                <label>Notas adicionales</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="appointment-textarea"
                  placeholder="Información adicional sobre la consulta..."
                  rows="3"
                />
              </div>
            </div>

            {/* Consultas Recurrentes */}
            <div className="appointment-section">
              <h4>
                <Repeat size={20} />
                Programación Recurrente
              </h4>
              <div className="recurring-options">
                <label className="recurring-checkbox">
                  <input
                    type="checkbox"
                    name="isRecurring"
                    checked={formData.isRecurring}
                    onChange={handleInputChange}
                  />
                  <span>Programar consultas recurrentes</span>
                </label>

                {formData.isRecurring && (
                  <div className="recurring-details">
                    <div className="appointment-grid">
                      <div className="appointment-group">
                        <label>Frecuencia</label>
                        <select
                          name="recurringType"
                          value={formData.recurringType}
                          onChange={handleInputChange}
                          className="appointment-input"
                        >
                          {recurringOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="appointment-group">
                        <label>Número de consultas</label>
                        <input
                          type="number"
                          name="recurringCount"
                          value={formData.recurringCount}
                          onChange={handleInputChange}
                          className="appointment-input"
                          min="1"
                          max="52"
                        />
                      </div>
                    </div>

                    <div className="recurring-preview">
                      <p><strong>Vista previa:</strong> Se crearán {formData.recurringCount} consultas {recurringOptions.find(opt => opt.value === formData.recurringType)?.label.toLowerCase()}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="appointment-modal-footer">
          <button type="button" onClick={onClose} className="btn-cancel">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="btn-save">
            <Save size={20} />
            {editingAppointment ? 'Actualizar Consulta' : 'Agendar Consulta'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentModal;