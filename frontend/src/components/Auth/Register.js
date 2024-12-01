import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    moneda: '',
    ciudad: '',
    pais: '',
    celular: '',
    correo: '',
    password: '',
  });

  const [monedas, setMonedas] = useState([]);
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/finance/monedas/')
      .then(response => setMonedas(response.data))
      .catch(error => console.error('Error fetching monedas:', error));

    axios.get('http://127.0.0.1:8000/api/finance/paises/')
      .then(response => setPaises(response.data))
      .catch(error => console.error('Error fetching paises:', error));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/finance/usuario/registro/', formData)
      .then(response => alert('Registro exitoso'))
      .catch(error => console.error('Error al registrar usuario:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos del formulario */}
      <input type="text" name="nombre" onChange={handleInputChange} placeholder="Nombre" required />
      <input type="text" name="apellido" onChange={handleInputChange} placeholder="Apellido" required />
      <input type="number" name="edad" onChange={handleInputChange} placeholder="Edad" required />
      <select name="moneda" onChange={handleInputChange} required>
        <option value="">Seleccionar Moneda</option>
        {monedas.map(moneda => <option key={moneda.id} value={moneda.id}>{moneda.nombre}</option>)}
      </select>
      <select name="pais" onChange={handleInputChange} required>
        <option value="">Seleccionar País</option>
        {paises.map(pais => <option key={pais.id} value={pais.id}>{pais.nombre}</option>)}
      </select>
      <input type="text" name="ciudad" onChange={handleInputChange} placeholder="Ciudad" required />
      <input type="text" name="celular" onChange={handleInputChange} placeholder="Teléfono" required />
      <input type="email" name="correo" onChange={handleInputChange} placeholder="Correo Electrónico" required />
      <input type="password" name="password" onChange={handleInputChange} placeholder="Contraseña" required />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;
