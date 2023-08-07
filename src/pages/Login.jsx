import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { UserDataContext } from '../context/UserDataContext';
import axios from 'axios';
import { API_URL } from '../apiConfig';

const Login = () => {
    sessionStorage.clear();

    const { updateUserData } = useContext(UserDataContext);
    const [rut, setRut] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/user/login`, {
                rut: rut,
                password: password,
            });
            localStorage.setItem('rut', rut);
            localStorage.setItem('userToken', response.data.token);
            const token = localStorage.getItem('userToken');
            const [header, payload, signature] = token.split('.');
            const decodedPayload = atob(payload);
            const payloadObject = JSON.parse(decodedPayload);
            const { apellidos, cargo, nombres, userType, _id } = payloadObject;
            const userDataObject = { token, apellidos, cargo, nombres, userType, _id };
            Object.entries(userDataObject).forEach(([key, value]) => {
                sessionStorage.setItem(key, value);
            });
            updateUserData(userDataObject);
            navigate('/home');
        } catch (error) {
            console.error('Error en la petición:', error);
        }
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
                <button type="submit">Ingresar</button>
            </form>
        </div>
    )
}

export default Login
