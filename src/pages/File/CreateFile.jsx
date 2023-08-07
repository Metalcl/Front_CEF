import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../../components/Navigation';
import { API_URL } from '../../apiConfig';

const CreateFile = () => {
    const token = sessionStorage.getItem('token');
    const bases = JSON.parse(sessionStorage.getItem('bases'));
    const currentSeasonID = sessionStorage.getItem('currentSeasonID');

    const [selectedUser, setSelectedUser] = useState('');
    const [selectedBase, setSelectedBase] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');
    const [cuadrillasInSelectedBase, setCuadrillasInSelectedBase] = useState([]);
    const [selectedCuadrillaId, setSelectedCuadrillaId] = useState('');

    const [usersWithoutFile, setUsersWithoutFile] = useState([]);

    const fetchUsersWithoutFile = async () => {
        if (currentSeasonID) {
            try {
                const response = await axios.get(
                    `${API_URL}/ficha/usuariosSinFichaEnTemporada/${currentSeasonID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const usuariosSinFicha = response.data.disponibles;
                setUsersWithoutFile(usuariosSinFicha);
            } catch (error) {
                console.error('Error en la petición:', error);
            }
        }
    };

    useEffect(() => {
        fetchUsersWithoutFile();
    }, []);

    const fetchCuadrillasInBase = async (baseId) => {
        try {
            const response = await axios.get(
                `${API_URL}/obtenerCuadrillasEnBase/${baseId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const cuadrillas = response.data.cuadrilllas;
            setCuadrillasInSelectedBase(cuadrillas);
        } catch (error) {
            console.error('Error en la petición:', error);
        }
    };

    useEffect(() => {
        if (selectedBase) {
            fetchCuadrillasInBase(selectedBase);
        }
    }, [selectedBase, token]);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const seasonsData = {
        summer: {
            startDay: 22,
            startMonth: 12,
            endDay: 20,
            endMonth: 3,
            name: "Alta"
        },
        winter: {
            startDay: 21,
            startMonth: 6,
            endDay: 23,
            endMonth: 9,
            name: "Baja"
        }
    };
    let currentSeason = null;
    for (const seasonKey in seasonsData) {
        const season = seasonsData[seasonKey];
        if (
            (currentMonth === season.startMonth && currentDay >= season.startDay) ||
            (currentMonth > season.startMonth && currentMonth < season.endMonth) ||
            (currentMonth === season.endMonth && currentDay <= season.endDay)
        ) {
            currentSeason = season.name;
            break;
        }
    }

    // console.log(`userid:${selectedUser} / cuadrilla:${selectedCuadrillaId} / cargo:${selectedPosition} / temporada:${currentSeasonID}`)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${API_URL}/ficha/crear`,
                {
                    user_id: selectedUser,
                    cuadrilla_id: selectedCuadrillaId,
                    cargo: selectedPosition,
                    temporada_id: currentSeasonID
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Ficha creada exitosamente:', response.data);
        } catch (error) {
            console.error('Error en la petición:', error);
        }
    };

    return (
        <div>
            <Navigation />
            <h1>Crear Ficha</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <label>Seleccione al usuario:</label>
                <br />
                <select
                    onChange={(e) => setSelectedUser(e.target.value)}
                    value={selectedUser}
                >
                    <option></option>
                    {usersWithoutFile?.map(({ _id, nombres, apellidos, rut }) => (
                        <option key={_id} value={_id}>
                            {`${nombres} ${apellidos} - ${rut}`}
                        </option>
                    ))}
                </select>
                <br />

                <label>Seleccione la base:</label>
                <select
                    onChange={(e) => setSelectedBase(e.target.value)}
                    value={selectedBase}
                >
                    <option></option>
                    {bases.map(({ _id, nombre }) => (
                        <option key={_id} value={_id}>
                            {nombre}
                        </option>
                    ))}
                </select>
                <br />

                <label>Seleccione la cuadrilla:</label>
                <select
                    onChange={(e) => setSelectedCuadrillaId(e.target.value)}
                    value={selectedCuadrillaId}
                >
                    <option></option>
                    {cuadrillasInSelectedBase?.length > 0 &&
                        Object.keys(cuadrillasInSelectedBase).map((cuadrillaId) => {
                            const cuadrilla = cuadrillasInSelectedBase[cuadrillaId];
                            return (
                                <option key={cuadrilla._id} value={cuadrilla._id}>
                                    {cuadrilla.nombre}
                                </option>
                            );
                        })}
                </select>
                <br />

                <label>Seleccione un cargo:</label>
                <select
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    value={selectedPosition}
                >
                    <option></option>
                    <option value="Brigadista">Brigadista</option>
                    <option value="JefeCuadrilla">Jefe de cuadrilla</option>
                </select>
                <br />

                <label>La temporada actual es:</label>
                <input
                    type="text"
                    value={`Temporada ${currentSeason}`}
                    placeholder={`Temporada ${currentSeason}`}
                    disabled
                />
                <br />
                <button type="submit">Crear ficha</button>
            </form>
        </div>
    );
}

export default CreateFile;
