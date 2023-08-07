import React, { useState } from 'react';
import axios from 'axios';
import Navigation from '../../components/Navigation';
import { API_URL } from '../../apiConfig';

const CreateQuadrille = () => {
    const seasons = JSON.parse(sessionStorage.getItem('seasons')) || [];
    const bases = JSON.parse(sessionStorage.getItem('bases')) || [];
    const token = sessionStorage.getItem('token');
    const currentSeasonID = sessionStorage.getItem('currentSeasonID');

    const [selectedNameQuadrille, setSelectedNameQuadrille] = useState('');
    const [selectedBase, setSelectedBase] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${API_URL}/cuadrilla/crear`,
                {
                    temporada_id: currentSeasonID,
                    base_id: selectedBase,
                    nombre_cuadrilla: selectedNameQuadrille
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
            <h1>Crear una cuadrilla</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <label>Nombre de la cuadrilla: </label>
                <input
                    type="text"
                    placeholder="Ingrese nombre para la cuadrilla"
                    onChange={(e) => setSelectedNameQuadrille(e.target.value)}
                    value={selectedNameQuadrille}
                />
                <br />

                <label>
                    A día de hoy ({currentDay < 10 ? `0${currentDay}` : currentDay} /
                    {currentMonth < 10 ? `0${currentMonth}` : currentMonth}), la temporada corresponde a:
                </label>
                <input
                    type="text"
                    placeholder={`Temporada ${currentSeason}`}
                    disabled
                />
                <br />

                <label>Seleccione una base: </label>
                <select
                    onChange={(e) => setSelectedBase(e.target.value)}
                    value={selectedBase}
                >
                    <option></option>
                    {bases.map(({ nombre, _id }) => (
                        <option key={_id} value={_id}>
                            {nombre}
                        </option>
                    ))}
                </select>
                <br />

                <button type="submit">Crear cuadrilla</button>
            </form>
        </div>
    );
};

export default CreateQuadrille;
