import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles_all.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    moneda: '', // Store the selected currency ID
    ciudad: '',
    pais: '', // Store the selected country ID
    celular: '',
    correo: '',
  });

  const [monedas, setMonedas] = useState([]);
  const [paises, setPaises] = useState([]);
// cambiar todas las ip 192.168.0.105 por la ip de la red
  // Fetch coins from API
  useEffect(() => {
    axios.get('http://192.168.0.105:8000/api/finance/monedas/')
      .then(response => setMonedas(response.data)) // Save coins to state
      .catch(error => console.log('Error fetching coins:', error)); // Log errors
  }, []);

  // Fetch countries from API
  useEffect(() => {
    // axios.get('http://127.0.0.1:8000/api/finance/paises/')
    axios.get('http://192.168.0.105:8000/api/finance/paises/')
      .then(response => {
        console.log('Paises:', response.data);
        setPaises(response.data); // Save countries to state
      })
      .catch(error => console.log('Error fetching countries:', error)); // Log errors
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update the state
  };



  // Handle form submission an backend

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    setIsLoading(true);

    if (!formData.nombre || !formData.apellido || !formData.edad || !formData.moneda || !formData.ciudad || !formData.pais || !formData.celular || !formData.correo) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    axios.post('http://192.168.0.105:8000/api/finance/usuario/registro/', formData)
      .then(response => {
        console.log('User registered successfully:', response.data); // Log success
        alert('Registration successful!');
        setFormData({
          nombre: '',
          apellido: '',
          edad: '',
          moneda: '',
          ciudad: '',
          pais: '',
          celular: '',
          correo: '',
        })
      })
      .catch(error => {
        console.error('Error registering user:', error.response?.data || error); // Log error
        alert('Failed to register user.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="nombre">First Name</label>
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
          <label htmlFor="apellido">Last Name</label>
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
          <label htmlFor="edad">Age</label>
          <input
            type="number"
            id="edad"
            name="edad"
            value={formData.edad}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Coin Selection */}
        <div className="form-group">
          <label htmlFor="moneda">Tipo de Moneda</label>
          <select
            id="moneda"
            name="moneda"
            value={formData.moneda} // Match the ID with the selected value
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar</option>
            {monedas.length > 0 ? (
              monedas.map((moneda) => (
                <option key={moneda.id} value={moneda.id}>
                  {moneda.nombre} {/* Display the name */}
                </option>
              ))
            ) : (
              <option value="">Cargando...</option>
            )}
          </select>
        </div>

        {/* Country Selection */}
        <div className="form-group">
          <label htmlFor="pais">Pais</label>
          <select
            id="pais"
            name="pais"
            value={formData.pais} // Match the ID with the selected value
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            {paises.length > 0 ? (
              paises.map((pais) => (
                <option key={pais.id} value={pais.id}>
                  {pais.nombre} {/* Display the name */}
                </option>
              ))
            ) : (
              <option value="">Cargando...</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ciudad">City</label>
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
          <label htmlFor="celular">Phone</label>
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
          <label htmlFor="correo">Email</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="auth-button" disabled={isLoading}>
          {isLoading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default Register;
