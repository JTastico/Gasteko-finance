// src/components/SuccessMessage.js
import React from 'react';

const SuccessMessage = () => {
  return (
    <div style={{
      padding: '20px', 
      backgroundColor: 'green', 
      color: 'white', 
      textAlign: 'center',
      fontSize: '18px',
      fontWeight: 'bold',
      borderRadius: '5px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      marginBottom: '20px',
      position: 'relative',
      zIndex: 10
    }}>
      Se ejecuta con éxito
    </div>
  );
};

export default SuccessMessage;
