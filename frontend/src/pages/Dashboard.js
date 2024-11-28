import React, { useState, useEffect } from 'react';
import IncomeExpenseChart from '../components/Dashboard/IncomeExpenseChart';
import ExpenseCategoryChart from '../components/Dashboard/ExpenseCategoryChart';
import BalanceCard from '../components/Dashboard/BalanceCard';
import { transactionService } from '../services/transactionService';

const Dashboard = () => {
  const [monthlySummary, setMonthlySummary] = useState(null);
  const [categoryExpenses, setCategoryExpenses] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const currentDate = new Date();
      try {
        const summaryResponse = await transactionService.getMonthlyExpenseSummary(
          currentDate.getFullYear(), 
          currentDate.getMonth() + 1
        );
        setMonthlySummary(summaryResponse.data);

        const categoryResponse = await transactionService.getExpenseByCategory(
          currentDate.getFullYear(), 
          currentDate.getMonth() + 1
        );
        setCategoryExpenses(categoryResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Panel de Control</h1>
      {monthlySummary && (
        <BalanceCard 
          income={monthlySummary.total_income}
          expenses={monthlySummary.total_expenses}
          balance={monthlySummary.balance}
        />
      )}
      
      <div className="charts-container">
        <IncomeExpenseChart data={monthlySummary} />
        <ExpenseCategoryChart data={categoryExpenses} />
      </div>
    </div>
  );
};

export default Dashboard;