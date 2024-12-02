import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Categories from './pages/Categories';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/Auth/PrivateRoute';
import { AuthProvider } from './context/AuthContext'; // Importa el contexto
import { transactionService } from './services/transactionService'; // Ajusta la ruta
import AddTransactionComponent from './components/Transactions/AddTransactionComponent'; // Importa el nuevo componente

function App() {
  return (
    <AuthProvider> {/* Envolvemos toda la aplicación con el contexto de autenticación */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<Dashboard />} />
          
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <Layout>
                  <Transactions />
                </Layout>
              </PrivateRoute>
            }
          />
          
          <Route
            path="/budgets"
            element={
              <PrivateRoute>
                <Layout>
                  <Budgets />
                </Layout>
              </PrivateRoute>
            }
          />
          
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Layout>
                  <Categories />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Ruta para el componente de agregar transacción */}
          <Route
            path="/add-transaction"
            element={
              <PrivateRoute>
                <Layout>
                  <AddTransactionComponent /> {/* Agrega este componente aquí */}
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
