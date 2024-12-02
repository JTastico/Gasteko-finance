import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Navbar from '../components/Layout/Navbar';
import './css/Dashboard.css';

const Dashboard = () => {
  const pieData = {
    labels: ['Alimentación', 'Transporte', 'Ocio', 'Educación', 'Otros'],
    datasets: [
      {
        data: [30, 20, 25, 15, 10],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8A2BE2', '#4CAF50'],
        hoverOffset: 4,
      },
    ],
  };

  const barData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Gastos por Categoría (en Soles)',
        data: [400, 300, 500, 200, 600], // Gastos en soles
        backgroundColor: ['#36A2EB', '#FF6384', '#4CAF50', '#FFCE56', '#8A2BE2'],
      },
    ],
  };

  return (
    <div>
      {/* Barra de navegación */}
      <Navbar />


      {/* Sección Principal */}
      <div className="dashboard-main">
        {/* Resumen de Gastos */}
        <div className="dashboard-summary">
          <div className="dashboard-chart">
            <Doughnut data={pieData} />
          </div>
          <div className="dashboard-details">
            <h2 className="dashboard-detail-title">Resumen de Gastos</h2>
            <p>Total Gastos: <strong>S/ 1,500</strong></p> {/* Monto total en soles */}
            <p>Balance Actual: <strong>S/ 3,200</strong></p> {/* Balance en soles */}
          </div>
        </div>

        {/* Calendario Interactivo */}
        <div className="dashboard-calendar">
          <h2>Calendario</h2>
          <p className="dashboard-placeholder">[Aquí irá un calendario interactivo]</p>
        </div>
      </div>

      {/* Sección Inferior */}
      <div className="dashboard-lower-section">
        <div className="dashboard-transactions">
          <h2>Últimas Transacciones</h2>
          <ul className="dashboard-list">
            <li>Compra en supermercado - S/ 80 - Alimentación</li> {/* Ejemplo de gasto en alimentos */}
            <li>Taxi al trabajo - S/ 20 - Transporte</li> {/* Ejemplo de gasto en transporte */}
            <li>Entradas al cine - S/ 40 - Ocio</li> {/* Ejemplo de gasto en ocio */}
            <li>Libros para la universidad - S/ 150 - Educación</li> {/* Ejemplo de gasto en educación */}
          </ul>
        </div>

        <div className="dashboard-bar-chart">
          <h2>Gastos por Categoría</h2>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
