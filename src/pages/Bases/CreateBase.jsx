import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../../components/Navigation';
import { API_URL } from '../../apiConfig';
import Swal from 'sweetalert2';

const CreateBase = () => {


    const [nameBase, setNameBase] = useState('');
    const tokenlocal = localStorage.getItem('userToken');
    const [loading, setLoading] = useState(false);
    const token = sessionStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nameBase === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El campo nombre base se encuentra vacío.',
            });
            return;
        }

        setLoading(true);

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

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Base creada exitosamente.',
            });
            DataBases();
            setNameBase('');
            setLoading(false);
        } catch (error) {
            console.error('Error en la petición:', error);
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al crear la base.',
            });
        }
    };

    const DataBases = async () => {
        try {
            const responseBases = await axios.get(
                `${API_URL}/base/obtener`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            );
            const { Bases } = responseBases.data;
            sessionStorage.setItem('bases', JSON.stringify(Bases));
        } catch (error) {
            console.error('Error en la petición de las bases:', error);
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Enviar'}
                </button>
            </form>
        </div>
    )
}

export default CreateBase;
