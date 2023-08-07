import React, { useEffect } from 'react'
import Navigation from '../components/Navigation';
import axios from 'axios';
import { API_URL } from '../apiConfig';

const Home = () => {
    // http://localhost:4000/api/base/obtener
    const rut = localStorage.getItem('rut');
    const cargo = sessionStorage.getItem('cargo');
    const userType = sessionStorage.getItem('userType');
    const token = sessionStorage.getItem('token');

    //Obtener todas las temporadas
    const DataSeason = async () => {
        try {
            const responseSeasons = await axios.get(
                `${API_URL}/temporada/obtActFut`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            );
            const { temporadas } = responseSeasons.data;
            sessionStorage.setItem('seasons', JSON.stringify(temporadas));
        } catch (error) {
            console.error('Error en la petición de las temporadas:', error);
        }
    };
    //Obtener la fecha actual, día y mes
    async function waitForSeasons() {
        return new Promise((resolve) => {
            const checkSeasons = () => {
                const seasons = JSON.parse(sessionStorage.getItem('seasons'));
                if (seasons) {
                    resolve(seasons);
                } else {
                    setTimeout(checkSeasons, 100); // Esperar 100ms y luego verificar de nuevo
                }
            };
            checkSeasons();
        });
    }

    async function fetchSelectedSeasonId() {
        const seasons = await waitForSeasons();

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

        let selectedSeasonId = null;
        if (seasons.length > 0) {
            const matchingSeason = seasons.find(season => season.tipo === currentSeason && season.tipo === 'Baja');
            if (matchingSeason) {
                selectedSeasonId = matchingSeason._id;
            }
        }
        sessionStorage.setItem('currentSeasonID', selectedSeasonId);
    }

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

    //Guardar en un objeto la data de la cuadrilla
    const DataQuadrille = async () => {
        try {
            const responseQuadrille = await axios.get(
                `${API_URL}/cuadrilla/obtenerCuadrillas`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            );
            const { cuadrillas } = responseQuadrille.data;
            //console.log("la data de cuadrilla es" , cuadrillas)
            sessionStorage.setItem('quadrille', JSON.stringify(cuadrillas));
        } catch (error) {
            console.error('Error en la petición base:', error);
        }
    };

    useEffect(() => {
        DataSeason();
        DataBases();
        fetchSelectedSeasonId();
        DataQuadrille();
    }, [token]);

    useEffect(() => {
        //fetchUsersWithoutFile();
    }, []);

    const nombres = sessionStorage.getItem('nombres');
    const apellidos = sessionStorage.getItem('apellidos');
    return (
        <div>
            <Navigation />
            <h1>Home</h1>
            <h2>Bienvenido: {nombres} {apellidos}</h2>
            <br />
            <p>Tu rut es: {rut}</p>
            <p>Actualmente tu cargo es: {cargo}</p>
        </div>
    )
}

export default Home
