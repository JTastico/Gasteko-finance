import React, { useState } from 'react';
import axios from 'axios';

const AddTransactionForm = ({ type, userId, onClose }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transaction = {
      user: userId,  // Asegúrate de que este es el id del usuario autenticado
      amount,
      description,
      type,
    };

    try {
      const response = await axios.post('http://192.168.0.108:3000//api/transactions/', transaction, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data); // Aquí puedes manejar la respuesta de la API
      onClose(); // Cerrar el formulario después de agregar la transacción
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-transaction-form">
      <h2>{type === 'expense' ? 'Agregar Gasto' : 'Agregar Ingreso'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default AddTransactionForm;
