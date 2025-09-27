import React, { useState } from 'react';
import { User, Lock, UserCheck } from 'lucide-react';
import '../styles/LoginPage.css'

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular tiempo de carga
    setTimeout(() => {
      if (username === 'Maria' && password === 'prueba') {
        onLogin(username, 'registered');
      } else if (username.trim() === '' || password.trim() === '') {
        setError('Por favor, complete todos los campos');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleGuestLogin = () => {
    onLogin('Invitado', 'guest');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <User size={48} />
          </div>
          <h1>Bienvenido</h1>
          <p>Ingrese sus datos para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">
              <User size={20} />
              Usuario / Número / Código
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su usuario, Numero o Codigo"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <Lock size={20} />
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              className="form-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}          

          <div className="button-group">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>

            <div className="divider">
              <span>O</span>
            </div>

            <button 
              type="button"
              onClick={handleGuestLogin}
              className="btn btn-secondary"
            >
              <UserCheck size={20} />
              Ingresar como Invitado
            </button>
          </div>
        </form>

        <div className="login-help">
          <p><strong>Para probar:</strong></p>
          <p>Usuario: Maria</p>
          <p>Contraseña: prueba</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;