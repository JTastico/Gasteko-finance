import React, { useState, useEffect } from 'react';
import { transactionService } from '../../services/transactionService';
import { categoryService } from '../../services/categoryService';

const TransactionForm = ({ onTransactionAdded }) => {
  const [categories, setCategories] = useState([]);
  const [transaction, setTransaction] = useState({
    amount: '',
    category: '',
    transaction_date: new Date().toISOString().split('T')[0],
    description: '',
    type: 'expense'
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await transactionService.createTransaction(transaction);
      onTransactionAdded(response.data);
      // Reset form
      setTransaction({
        amount: '',
        category: '',
        transaction_date: new Date().toISOString().split('T')[0],
        description: '',
        type: 'expense'
      });
    } catch (error) {
      console.error('Error adding transaction', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={transaction.amount}
        onChange={(e) => setTransaction({...transaction, amount: e.target.value})}
        placeholder="Monto"
        required
      />
      <select
        value={transaction.category}
        onChange={(e) => setTransaction({...transaction, category: e.target.value})}
        required
      >
        <option value="">Seleccionar Categoría</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={transaction.transaction_date}
        onChange={(e) => setTransaction({...transaction, transaction_date: e.target.value})}
        required
      />
      <select
        value={transaction.type}
        onChange={(e) => setTransaction({...transaction, type: e.target.value})}
      >
        <option value="expense">Gasto</option>
        <option value="income">Ingreso</option>
      </select>
      <textarea
        value={transaction.description}
        onChange={(e) => setTransaction({...transaction, description: e.target.value})}
        placeholder="Descripción (opcional)"
      />
      <button type="submit">Agregar Transacción</button>
    </form>
  );
};

export default TransactionForm;