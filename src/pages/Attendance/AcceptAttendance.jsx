import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../../components/Navigation';
import { API_URL } from '../../apiConfig';

const AcceptAttendance = () => {
    const token = sessionStorage.getItem('token');
    const [attendanceData, setAttendanceData] = useState([]);

    const fetchAttendanceToAccept = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/asistencia/asistenciaPorAceptar`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAttendanceData(response.data.asisXAcept);
        } catch (error) {
            console.error('Error en la petición:', error);
        }
    };

    useEffect(() => {
        fetchAttendanceToAccept();
    }, [token]);

    const handleAcceptAttendance = async (attendanceId) => {
        try {
            const response = await axios.patch(
                `${API_URL}/asistencia/aceptar`,
                {
                    asistencia_id: attendanceId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Asistencia aceptada:', response.data);
            // Puedes realizar alguna acción adicional después de aceptar la asistencia
        } catch (error) {
            console.error('Error en la petición:', error);
        }
    };

    return (
        <div>
            <Navigation />
            <h1>Asistencias por aceptar</h1>
            <br />
            {attendanceData.length === 0 ? (
                <p>Aún no hay asistencias por aceptar</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>Nombre del trabajador</th>
                            <th>Rut</th>
                            <th>Aceptado</th>
                            <th>Marcado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((data) => {
                            const nombres = data.user.nombres.split(' ');
                            const apellidos = data.user.apellidos.split(' ');
                            return (
                                <tr key={data._id}>
                                    {/* <td>{data._id}</td> */}
                                    <td>{`${nombres[0]} ${apellidos[0]}`}</td>
                                    <td>{data.user.rut}</td>
                                    <td>{data.aceptado ? 'Sí' : 'No'}</td>
                                    <td>{data.marcado ? 'Sí' : 'No'}</td>
                                    <td>
                                        <button onClick={() => handleAcceptAttendance(data._id)}>
                                            Aceptar asistencia
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AcceptAttendance;
