import React, { useContext, useState } from 'react'
import axios from 'axios';
import { UserDataContext } from '../../context/UserDataContext';
import Navigation from '../../components/Navigation';
import { API_URL } from '../../apiConfig';

const CreateBase = () => {
    const { userData } = useContext(UserDataContext);
    const { token } = userData;
    const [nameBase, setNameBase] = useState('');
    const tokenlocal = localStorage.getItem('userToken');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${API_URL}/base/crear`,
                {
                    nombre: nameBase,
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenlocal}`,
                    },
                }
            );
            console.log('Respuesta del servidor:', response.data);
        } catch (error) {
            console.error('Error en la petición:', error);
        }
    };

    return (
        <div>
            <Navigation />
            <h1>Crear una nueva Base</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <label>Nombre de la base: </label>
                <br />
                <input
                    type="text"
                    onChange={(e) => setNameBase(e.target.value)}
                    placeholder='Ingrese el nombre de la base'
                    value={nameBase}
                />
                <br />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default CreateBase
