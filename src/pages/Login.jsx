import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { UserDataContext } from '../context/UserDataContext';
import axios from 'axios';
import { API_URL } from '../apiConfig';
import Swal from 'sweetalert2';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
    const isMounted = useRef(true);
    const { updateUserData } = useContext(UserDataContext);
    const [rut, setRut] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        isMounted.current = true;
        return () => isMounted.current = false;
    }, []);

    const saveDataAndProceed = async () => {
        if (isMounted.current) {
            setLoading(true);
        }
        try {
            if (rut === '' || password === '') {
                let missingFields = [];
                if (rut === '') {
                    missingFields.push('Rut');
                }
                if (password === '') {
                    missingFields.push('Contraseña');
                }
                const message = `Los siguientes campos están vacíos: ${missingFields.join(', ')}.`;
                showErrorAlert(message);
                return;
            }

            const response = await axios.post(`${API_URL}/user/login`, {
                rut: rut,
                password: password,
            });

            if (isMounted.current) {
                const token = response.data.token;
                localStorage.setItem('rut', rut);
                localStorage.setItem('userToken', token);
                const [header, payload, signature] = token.split('.');
                const decodedPayload = atob(payload);
                const payloadObject = JSON.parse(decodedPayload);
                const { apellidos, cargo, nombres, userType, _id } = payloadObject;
                const userDataObject = { token, apellidos, cargo, nombres, userType, _id };
                Object.entries(userDataObject).forEach(([key, value]) => {
                    sessionStorage.setItem(key, value);
                });
                updateUserData(userDataObject);
                setSuccessMessage('Tu sesión ha sido iniciada exitosamente');
            }
        } catch (error) {
            if (isMounted.current) {
                showErrorAlert('Los datos ingresados son incorrectos.');
                console.error('Error en la petición:', error);
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        saveDataAndProceed();
    };

    useEffect(() => {
        if (successMessage) {
            Swal.fire({
                icon: 'success',
                title: successMessage,
                showConfirmButton: false,
                timer: 1500,
            });

            setTimeout(() => {
                navigate('/home');
            }, 2000);
        }
    }, [successMessage]);

    const showErrorAlert = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
        });
    };

    useEffect(() => {
        const checkTokenAndNavigate = async () => {
            const token = localStorage.getItem('userToken');
            if (token) {
                try {
                    const decodedToken = jwt_decode(token);
                    const { apellidos, cargo, nombres, userType, _id } = decodedToken;
                    const userDataObject = { token, apellidos, cargo, nombres, userType, _id };
                    Object.entries(userDataObject).forEach(([key, value]) => {
                        sessionStorage.setItem(key, value);
                    });
                    updateUserData(userDataObject);
                    navigate('/home');
                } catch (error) {
                    console.error('Token inválido:', error);
                    localStorage.removeItem('userToken');
                }
            }
        };
        checkTokenAndNavigate();
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Iniciar sesión</h1>
                <label>Rut: </label>
                <input
                    type="text"
                    placeholder="Ingrese su rut"
                    onChange={(e) => setRut(e.target.value)}
                    value={rut}
                />
                <br />
                <label>Contraseña: </label>
                <input
                    type="password"
                    placeholder="Ingrese su contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? <CircularProgress size={20} /> : 'Ingresar'}
                </button>
            </form>
        </div>
    );
};

export default Login;
