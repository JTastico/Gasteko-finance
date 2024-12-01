import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#004c99',
      color: '#fff',
      padding: '10px 20px',
    },
    logo: {
      fontSize: '1.5rem',
    },
    navLinks: {
      display: 'flex',
      gap: '15px',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '1rem',
    },
    profile: {
      fontSize: '1.5rem',
    },
    icon: {
      cursor: 'pointer',
    },
  };

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>Gasteko</h1>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Inicio</Link>
        <Link to="/transactions" style={styles.link}>Ganancias</Link>
        <Link to="/transactions" style={styles.link}>Gastos</Link>
        <Link to="/budgets" style={styles.link}>Reportes</Link>
        <Link to="/categories" style={styles.link}>Configuración</Link>
      </div>
      <div style={styles.profile}>
        <span style={styles.icon}>👤</span>
      </div>
    </nav>
  );
};

export default Header;
