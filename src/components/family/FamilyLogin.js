import React, { useState } from 'react';
import { Heart, Lock, User, Shield, Users } from 'lucide-react';
import '../../styles/family/FamilyLogin.css';

function FamilyLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({
    familyCode: '',
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
      if (credentials.familyCode === 'FAM001' && credentials.password === 'familia123') {
        const familyData = {
          id: 'FAM001',
          name: 'Ana González',
          relationship: 'Hija',
          patientName: 'María González',
          patientId: 1,
          accessLevel: 'full'
        };
        onLogin(familyData);
      } else if (credentials.familyCode.trim() === '' || credentials.password.trim() === '') {
        setError('Por favor, complete todos los campos');
      } else {
        setError('Código familiar o contraseña incorrectos');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="family-login-container">
      <div className="family-login-card">
        <div className="family-login-header">
          <div className="family-login-icon">
            <Users size={48} />
          </div>
          <h1>Portal Familiar</h1>
          <p>Acceso para familiares y cuidadores</p>
        </div>

        <form onSubmit={handleLogin} className="family-login-form">
          <div className="family-form-group">
            <label htmlFor="familyCode">
              <Heart size={20} />
              Código Familiar
            </label>
            <input
              id="familyCode"
              name="familyCode"
              type="text"
              value={credentials.familyCode}
              onChange={handleInputChange}
              placeholder="Ingrese el código familiar"
              className="family-form-input"
            />
          </div>

          <div className="family-form-group">
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
              className="family-form-input"
            />
          </div>

          {error && <div className="family-error-message">{error}</div>}

          <button 
            type="submit" 
            className="family-btn family-btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Verificando...' : 'Acceder al Portal'}
          </button>
        </form>

        <div className="family-login-help">
          <p><strong>Credenciales de prueba:</strong></p>
          <p>Código: FAM001</p>
          <p>Contraseña: familia123</p>
        </div>

        <div className="family-security-notice">
          <Shield size={16} />
          <span>Acceso seguro - Datos protegidos por Jordan</span>
        </div>
      </div>
    </div>
  );
}

export default FamilyLogin;