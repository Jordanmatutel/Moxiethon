import React, { useState } from 'react';
import { Stethoscope, Lock, User, Shield } from 'lucide-react';
import '../../styles/Medic/MedicLogin.css';

function MedicLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({
    medicId: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular tiempo de carga
    setTimeout(() => {
      if (credentials.medicId === 'DR001' && credentials.password === 'medic123') {
        const doctorData = {
          id: 'DR001',
          name: 'Dr. María Rodríguez',
          specialty: 'Geriatría',
          license: 'MED-2024-001'
        };
        onLogin(doctorData);
      } else if (credentials.medicId.trim() === '' || credentials.password.trim() === '') {
        setError('Por favor, complete todos los campos');
      } else {
        setError('ID de médico o contraseña incorrectos');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="medic-login-container">
      <div className="medic-login-card">
        <div className="medic-login-header">
          <div className="medic-login-icon">
            <Stethoscope size={48} />
          </div>
          <h1>Portal Médico</h1>
          <p>Acceso para profesionales de la salud</p>
        </div>

        <form onSubmit={handleLogin} className="medic-login-form">
          <div className="medic-form-group">
            <label htmlFor="medicId">
              <Shield size={20} />
              ID de Médico
            </label>
            <input
              id="medicId"
              name="medicId"
              type="text"
              value={credentials.medicId}
              onChange={handleInputChange}
              placeholder="Ingrese su ID médico"
              className="medic-form-input"
            />
          </div>

          <div className="medic-form-group">
            <label htmlFor="password">
              <Lock size={20} />
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Ingrese su contraseña"
              className="medic-form-input"
            />
          </div>

          {error && <div className="medic-error-message">{error}</div>}

          <button 
            type="submit" 
            className="medic-btn medic-btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Verificando...' : 'Acceder al Sistema'}
          </button>
        </form>

        <div className="medic-login-help">
          <p><strong>Credenciales de prueba:</strong></p>
          <p>ID: DR001</p>
          <p>Contraseña: medic123</p>
        </div>

        <div className="medic-security-notice">
          <Shield size={16} />
          <span>Conexión segura - Datos protegidos</span>
        </div>
      </div>
    </div>
  );
}

export default MedicLogin;