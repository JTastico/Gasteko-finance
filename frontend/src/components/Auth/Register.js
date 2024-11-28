import React, { useState } from 'react';
import './styles_all.css';


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
  });

  const monedas = ['Soles', 'Dólares', 'Pesos', 'Euros'];
  const paises = ['Perú', 'México', 'España', 'Argentina', 'Estados Unidos'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para el registro
    console.log('Datos del registro:', formData);
  };

  return (
    <div className="auth-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="edad">Edad</label>
          <input
            type="number"
            id="edad"
            name="edad"
            value={formData.edad}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="moneda">Tipo de Moneda</label>
          <select
            id="moneda"
            name="moneda"
            value={formData.moneda}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar</option>
            {monedas.map((moneda, index) => (
              <option key={index} value={moneda}>
                {moneda}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="pais">País</label>
          <select
            id="pais"
            name="pais"
            value={formData.pais}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar</option>
            {paises.map((pais, index) => (
              <option key={index} value={pais}>
                {pais}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="ciudad">Ciudad</label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="celular">Celular</label>
          <input
            type="tel"
            id="celular"
            name="celular"
            value={formData.celular}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="auth-button">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
