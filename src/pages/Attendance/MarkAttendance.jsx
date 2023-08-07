import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../../components/Navigation';
import { API_URL } from '../../apiConfig';

const MarkAttendance = () => {
    const token = sessionStorage.getItem('token');
    const [idAttendance, setIDAttendance] = useState('');
    const [statusAttendance, setStatusAttendance] = useState('');

    const verifyAttendanceMarked = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/asistencia/verificarMarcado`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setStatusAttendance(response.data.estatus);
            if (response.data.estatus === 'no_marcado') {
                setIDAttendance(response.data.asistencia._id);
            } else {
                setIDAttendance('');
            }
        } catch (error) {
            console.error('Error en la petición:', error);
        }
    };

    useEffect(() => {
        verifyAttendanceMarked();
    }, [token]);

    const handleMarkAttendance = async (e) => {
        e.preventDefault();
        const id = idAttendance;
        const tokenUser = token;
        console.log('Funciona');

        try {
            const response = await axios.patch(
                `${API_URL}/asistencia/marcar`,
                {
                    asistencia_id: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenUser}`,
                    },
                }
            );
            console.log('Asistencia marcada:', response.data);
            // Otras operaciones después de marcar la asistencia
        } catch (error) {
            console.error('Error en la petición:', error);
        }
    };

    // console.log('Status attendance:', statusAttendance);
    // console.log('ID attendance:', idAttendance);

    return (
        <div>
            <Navigation />
            <h1>Marcar asistencia</h1>
            <br />
            <form onSubmit={handleMarkAttendance}>
                {statusAttendance === 'no_marcado' ? (
                    <div>
                        {/* <select name="idAttendanceSelect" value={idAttendance}>
                            <option value={idAttendance}>ID</option>
                        </select> */}
                        <button>Marcar asistencia</button>
                    </div>
                ) : (
                    <p>No corresponde marcar la asistencia.</p>
                )}
            </form>
        </div>
    );
};

export default MarkAttendance;
