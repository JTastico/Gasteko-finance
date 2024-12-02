import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './css/FloatingButton.css'; // Asegúrate de tener el archivo de CSS adecuado

const FloatingButton = ({ onAddIncome }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Hook para redirigir

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAddExpense = () => {
    // Redirige al formulario de agregar gasto (ajusta la ruta según sea necesario)
    navigate('/add-transaction');
  };

  return (
    <div className="floating-button-container">
      <button className="floating-button" onClick={toggleMenu}>
        +
      </button>

      {isOpen && (
        <div className="floating-options">
          <button onClick={handleAddExpense} className="floating-option">Agregar Gasto</button>
          <button onClick={onAddIncome} className="floating-option">Agregar Ingreso</button>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
