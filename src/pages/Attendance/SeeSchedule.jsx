import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Navigation from '../../components/Navigation';
import { API_URL } from '../../apiConfig';

const SeeSchedule = () => {
    const token = sessionStorage.getItem('token');
    const [scheduleData, setScheduleData] = useState([]);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/asistencia/obtenerHorario`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setScheduleData(response.data.horario);
            } catch (error) {
                console.error('Error en la petición:', error);
            }
        };

        fetchSchedule();
    }, [token]);

    // console.log('Horario almacenado:', scheduleData);

    return (
        <div>
            <Navigation />
            <h1>Ver horario de la temporada</h1>
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Marcado</th>
                        <th>Aceptado</th>
                    </tr>
                </thead>
                <tbody>
                    {scheduleData.map((item, index) => (
                        <tr key={index}>
                            <td>{format(new Date(item.fecha), 'dd-MM-yyyy')}</td>
                            <td>{item.marcado ? 'Sí' : 'No'}</td>
                            <td>{item.aceptado ? 'Sí' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SeeSchedule;
