import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css'; // Asegúrate de tener el archivo de CSS adecuado

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className="dashboard-navbar">
      <h1 className="dashboard-logo">Gasteko</h1>
      <div
        className={`dashboard-nav-links ${isMobile ? 'mobile' : ''}`}
      >
        <Link to="/" className="dashboard-link">Inicio</Link>
        <Link to="/transactions" className="dashboard-link">Ganancias</Link>
        <Link to="/transactions" className="dashboard-link">Gastos</Link>
        <Link to="/budgets" className="dashboard-link">Reportes</Link>
        <Link to="/categories" className="dashboard-link">Configuración</Link>
      </div>
      <div className="dashboard-profile">
        <span>👤</span>
      </div>
      <div className="hamburger-menu" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
