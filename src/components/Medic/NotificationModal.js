import React, { useState } from 'react';
import { X, Send, Bell, Users, User } from 'lucide-react';
import '../../styles/Medic/NotificationModal.css';

function NotificationModal({ isOpen, onClose, patients, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    recipients: [],
    sendToAll: false
  });

  const [errors, setErrors] = useState({});

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

  const handleSendToAllToggle = () => {
    setFormData(prev => ({
      ...prev,
      sendToAll: !prev.sendToAll,
      recipients: !prev.sendToAll ? [] : prev.recipients
    }));
  };

  const handleRecipientToggle = (patientId) => {
    if (formData.sendToAll) return;
    
    setFormData(prev => ({
      ...prev,
      recipients: prev.recipients.includes(patientId)
        ? prev.recipients.filter(id => id !== patientId)
        : [...prev.recipients, patientId]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'El título es requerido';
    if (!formData.subtitle.trim()) newErrors.subtitle = 'El subtítulo es requerido';
    if (!formData.sendToAll && formData.recipients.length === 0) {
      newErrors.recipients = 'Debe seleccionar al menos un destinatario';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const notification = {
        id: Date.now(),
        title: formData.title,
        subtitle: formData.subtitle,
        recipients: formData.sendToAll ? 'all' : formData.recipients,
        recipientCount: formData.sendToAll ? patients.length : formData.recipients.length,
        createdAt: new Date().toISOString(),
        status: 'sent'
      };
      
      onSave(notification);
      onClose();
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      recipients: [],
      sendToAll: false
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="notification-modal-overlay">
      <div className="notification-modal">
        <div className="notification-modal-header">
          <h3>
            <Bell size={24} />
            Crear Notificación
          </h3>
          <button onClick={onClose} className="notification-modal-close">
            <X size={24} />
          </button>
        </div>

        <div className="notification-modal-content">
          <form onSubmit={handleSubmit} className="notification-form">
            {/* Contenido de la Notificación */}
            <div className="notification-section">
              <h4>
                <Bell size={20} />
                Contenido de la Notificación
              </h4>
              <div className="notification-form-group">
                <label>Título *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`notification-input ${errors.title ? 'error' : ''}`}
                  placeholder="Ej: Recordatorio de Cita Médica"
                />
                {errors.title && <span className="error-text">{errors.title}</span>}
              </div>

              <div className="notification-form-group">
                <label>Subtítulo *</label>
                <textarea
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className={`notification-textarea ${errors.subtitle ? 'error' : ''}`}
                  placeholder="Ej: Su cita médica está programada para mañana a las 10:00 AM. Por favor confirme su asistencia."
                  rows="3"
                />
                {errors.subtitle && <span className="error-text">{errors.subtitle}</span>}
              </div>
            </div>

            {/* Destinatarios */}
            <div className="notification-section">
              <h4>
                <Users size={20} />
                Destinatarios
              </h4>
              
              <div className="send-to-all-section">
                <label className="send-to-all-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.sendToAll}
                    onChange={handleSendToAllToggle}
                  />
                  <span>Enviar a Todos los Pacientes ({patients.length} pacientes)</span>
                </label>
              </div>

              {!formData.sendToAll && (
                <div className="recipients-section">
                  <label>Seleccionar Pacientes *</label>
                  <div className="recipients-list">
                    {patients.map(patient => (
                      <label key={patient.id} className="recipient-checkbox">
                        <input
                          type="checkbox"
                          checked={formData.recipients.includes(patient.id)}
                          onChange={() => handleRecipientToggle(patient.id)}
                        />
                        <User size={16} />
                        <span>{patient.name} - {patient.age} años</span>
                      </label>
                    ))}
                  </div>
                  {errors.recipients && <span className="error-text">{errors.recipients}</span>}
                </div>
              )}

              <div className="recipients-summary">
                <p>
                  <strong>Destinatarios seleccionados:</strong> {' '}
                  {formData.sendToAll ? `Todos (${patients.length})` : formData.recipients.length}
                </p>
              </div>
            </div>

            {/* Vista Previa */}
            <div className="notification-section">
              <h4>Vista Previa</h4>
              <div className="notification-preview">
                <div className="preview-notification">
                  <div className="preview-header">
                    <Bell size={16} />
                    <span className="preview-title">
                      {formData.title || 'Título de la notificación'}
                    </span>
                  </div>
                  <div className="preview-content">
                    {formData.subtitle || 'Subtítulo de la notificación aparecerá aquí...'}
                  </div>
                  <div className="preview-footer">
                    <small>Dr. María Rodríguez • Ahora</small>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="notification-modal-footer">
          <button type="button" onClick={onClose} className="btn-cancel">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="btn-send">
            <Send size={20} />
            Enviar Notificación
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationModal;