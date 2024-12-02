import api from './api';

export const transactionService = {

  handleAddTransaction: async (type, amount, category, userId, token) => {
    const transaction = {
      type,
      amount,
      category,
      user: userId,  // Asegúrate de que el campo 'user' sea válido según tu modelo de API
    };

    try {
      const response = await api.post('transactions/', transaction, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;  // Puedes devolver la respuesta si necesitas manejarla
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  },
  getTransactions() {
    return api.get('transactions/');
  },
  
  createTransaction(transaction) {
    return api.post('transactions/', transaction);
  },
  
  updateTransaction(id, transaction) {
    return api.put(`transactions/${id}/`, transaction);
  },
  
  deleteTransaction(id) {
    return api.delete(`transactions/${id}/`);
  },
  
  getMonthlyExpenseSummary(year, month) {
    return api.get(`transactions/monthly_summary/?year=${year}&month=${month}`);
  },

  getExpenseByCategory(year, month) {
    return api.get(`transactions/expense_by_category/?year=${year}&month=${month}`);
  }
};