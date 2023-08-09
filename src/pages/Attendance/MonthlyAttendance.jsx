import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../../components/Navigation';
import { API_URL } from '../../apiConfig';
import CircularProgress from '@mui/material/CircularProgress';

const MonthlyAttendance = () => {
    const token = sessionStorage.getItem('token');
    const [monthlyAttendanceData, setMonthlyAttendanceData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const formattedDate = getCurrentDate();
        const fetchMonthlyAttendance = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/asistencia/asistenciaMensual/${formattedDate}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setMonthlyAttendanceData(response.data.data);
            } catch (error) {
                console.error('Error en la petición:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMonthlyAttendance();
    }, [token]);

    const handleDownloadCSV = () => {
        const csvData = [
            ['rut', 'cantidad_dias_trabajados'],
            ...monthlyAttendanceData.map(item => [item.user, item.count])
        ];

        const csvContent = "data:text/csv;charset=utf-8," + csvData.map(row => row.join(',')).join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "asistencias_mensuales.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div>
            <Navigation />
            <h1>Ver Asistencias Mensuales</h1>
            <br />
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <button onClick={handleDownloadCSV}>Descargar tabla</button>
                    <br />
                    {monthlyAttendanceData.length === 0 ? (
                        <p>Aún no hay asistencias marcadas y confirmadas.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Rut</th>
                                    <th>Cantidad de días trabajados</th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthlyAttendanceData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.user}</td>
                                        <td>{item.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            )}
        </div>
    );
};

export default MonthlyAttendance;
