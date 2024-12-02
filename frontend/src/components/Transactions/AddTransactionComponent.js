import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'; // Contexto para autenticación

const AddTransactionComponent = () => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(''); // Valor inicial vacío para evitar un valor no válido
    const [categories, setCategories] = useState([]); // Estado para las categorías
    const [transactionDate, setTransactionDate] = useState(''); // Fecha de la transacción
    const [description, setDescription] = useState(''); // Descripción
    const { userId, token } = useContext(AuthContext); // Obtén el userId y el token desde el contexto de autenticación
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState(''); // Estado para manejar errores

    // Obtener las categorías desde la API cuando el componente se monta
    useEffect(() => {
        axios.get('http://192.168.0.108:8000/api/finance/categorias/')
            .then(response => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    setError(`Error al cargar categorías: ${error.response.status} - ${error.response.data}`);
                } else if (error.request) {
                    setError('No se recibió respuesta del servidor');
                } else {
                    setError(`Error desconocido: ${error.message}`);
                }
                setLoading(false);
            });
    }, []);

    // Función para agregar una transacción
    const addTransaction = async (type) => {
        try {
            const data = {
                amount: amount,
                transaction_date: transactionDate,
                description: description,
                type: type,
                user: userId,
                category: category
            };
    
            console.log('Datos enviados:', data);
    
            const response = await axios.post(
                'http://192.168.0.108:8000/api/finance/add_transaction/',
                data, {
                    withCredentials: true,
                }
            );
    
            console.log('Transacción agregada exitosamente:', response.data);
            alert('Transacción agregada exitosamente');
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
                console.error('Error de respuesta del servidor:', error.response);
            } else if (error.request) {
                console.error('Error de solicitud:', error.request);
                alert('No se recibió respuesta del servidor');
            } else {
                console.error('Error desconocido:', error.message);
                alert('Hubo un error al realizar la transacción');
            }
        }
    };


    return (
        <div>
            <div>
                <label>
                    Monto:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Fecha de Transacción:
                    <input
                        type="date"
                        value={transactionDate}
                        onChange={(e) => setTransactionDate(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Descripción:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Categoría:
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Selecciona una categoría</option>
                        {categories.map((categoryItem) => (
                            <option key={categoryItem.id} value={categoryItem.id}>
                                {categoryItem.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <button onClick={() => addTransaction('expense')}>Agregar Gasto</button>
            <button onClick={() => addTransaction('income')}>Agregar Ingreso</button>
        </div>
    );
};

export default AddTransactionComponent;
