import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Categories.css'; // Importamos el archivo de estilos
import Navbar from '../components/Layout/Navbar';
// Componente de Categorías
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Función para obtener las categorías desde la API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://192.168.0.108:8000/api/finance/categorias/');
        setCategories(response.data); // Guardamos las categorías en el estado
      } catch (err) {
        setError('Error al cargar las categorías');
        console.error(err);
      } finally {
        setLoading(false); // Indicamos que la carga ha terminado
      }
    };

    fetchCategories();
  }, []); // Se ejecuta solo una vez cuando el componente se monta

  // Función para agregar una nueva categoría
  const addCategory = async () => {
    if (newCategory.trim() !== '') {
      try {
        const response = await axios.post(
          'http://192.168.0.108:8000/api/finance/categorias/crear/',
          { name: newCategory }
        );
        setCategories([...categories, response.data]); // Agregamos la nueva categoría a la lista
        setNewCategory(''); // Limpiamos el campo de entrada
      } catch (err) {
        setError('Error al agregar la categoría');
        console.error(err);
      }
    }
  };

  // Función para manejar el cambio en el input de la nueva categoría
  const handleInputChange = (e) => {
    setNewCategory(e.target.value);
  };

  return (
    <div>
    {/* Barra de navegación */}
        <Navbar />
    <div className="categories-container">
      <h1>Categorías</h1>

      {loading ? (
        <p>Cargando categorías...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="category-list">
          <h2>Lista de Categorías</h2>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="add-category">
        <h2>Agregar Nueva Categoría</h2>
        <input
          type="text"
          value={newCategory}
          onChange={handleInputChange}
          placeholder="Nombre de la nueva categoría"
        />
        <button onClick={addCategory}>Agregar</button>
      </div>
    </div>
    </div>
  );
};

export default Categories;
