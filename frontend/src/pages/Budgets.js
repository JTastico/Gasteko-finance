// src/screens/Transactions.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Transactions.css"; // Importamos el archivo de estilos
import Navbar from "../components/Layout/Navbar";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Realizamos la solicitud a la API para obtener las transacciones
    axios
      .get("http://192.168.0.108:8000/api/finance/transacciones/")
      .then((response) => {
        // Filtramos las transacciones para mostrar solo las de tipo 'income'
        const filteredTransactions = response.data.filter(
          (transaction) => transaction.type === "income"
        );
        setTransactions(filteredTransactions); // Guardamos las transacciones filtradas en el estado
      })
      .catch((error) => {
        console.error("Error fetching transactions", error);
      });
  }, []);

  return (
    <div>
    {/* Barra de navegación */}
        <Navbar />
    <div className="transactions-container">
      <h1 className="transactions-title">Ingresos Transactions</h1>
      <div className="transactions-list">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-details">
                <p><strong>Amount:</strong> ${transaction.amount}</p>
                <p><strong>Date:</strong> {transaction.transaction_date}</p>
                <p><strong>Type:</strong> {transaction.type}</p>
                <p><strong>Description:</strong> {transaction.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No income transactions found.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Transactions;
