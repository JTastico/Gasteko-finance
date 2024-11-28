import api from './api';

export const transactionService = {
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