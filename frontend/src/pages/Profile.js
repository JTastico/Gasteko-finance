import React from "react";
import "./css/Profile.css"; // Archivo CSS para los estilos
import Navbar from '../components/Layout/Navbar';

const Profile = () => {
  return (
    <div>
    {/* Barra de navegación */}
        <Navbar />  
    <div className="user-profile">
      {/* Encabezado */}
      <header className="profile-header">
        <h1 className="profile-name">Juan Pérez</h1>
        <p className="profile-title">Desarrollador Full Stack | Entusiasta de la Tecnología</p>
      </header>

      {/* Sección de información personal */}
      <section className="personal-info">
        <div className="profile-photo">
          <img
            src="https://via.placeholder.com/120"
            alt="Foto de perfil"
            className="photo-circle"
          />
        </div>
        <div className="personal-details">
          <p><strong>Edad:</strong> 30 años</p>
          <p><strong>Ubicación:</strong> Arequipa, Perú</p>
          <p><em>Apasionado por la innovación y la creatividad tecnológica.</em></p>
        </div>
      </section>

      {/* Sección de intereses y hobbies */}
      <section className="hobbies">
        <h2>Intereses y Hobbies</h2>
        <div className="hobby-icons">
          <div className="hobby-icon">⚽</div>
          <div className="hobby-icon">🎮</div>
          <div className="hobby-icon">📚</div>
          <div className="hobby-icon">🎨</div>
          <div className="hobby-icon">🏞️</div>
          <div className="hobby-icon">✈️</div>
          <div className="hobby-icon">🎵</div>
          <div className="hobby-icon">📷</div>
        </div>
      </section>
    </div>
  </div>
  );
};

export default Profile;
