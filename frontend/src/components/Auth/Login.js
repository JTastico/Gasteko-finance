import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles_all.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica para el login
    console.log('Iniciando sesión...');
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" placeholder="Introduce tu correo" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" placeholder="Introduce tu contraseña" required />
        </div>
        <button type="submit" className="auth-button">Iniciar Sesión</button>
        <button
          type="button"
          className="auth-link-button"
          onClick={() => navigate('/register')}
        >
          ¿No tienes cuenta? Regístrate aquí
        </button>
      </form>
    </div>
  );
};

export default Login;
