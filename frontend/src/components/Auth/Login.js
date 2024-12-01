import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ correo: '', password: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/finance/usuario/login/', formData)
      .then(response => {
        localStorage.setItem('authToken', response.data.token);
        alert('Inicio de sesión exitoso');
      })
      .catch(error => console.error('Error al iniciar sesión:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="correo" onChange={handleInputChange} placeholder="Correo Electrónico" required />
      <input type="password" name="password" onChange={handleInputChange} placeholder="Contraseña" required />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;
