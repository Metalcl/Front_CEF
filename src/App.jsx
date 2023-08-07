import React from 'react'
import { useContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { UserDataContext } from './context/UserDataContext'
import Login from './pages/Login'
import Home from './pages/Home'
import { ProtectedRoutes } from './components/ProtectedRoutes';
import CreateBase from './pages/Bases/CreateBase';
import CreateQuadrille from './pages/Quadrille/CreateQuadrille';
import CreateFile from './pages/File/CreateFile';
import MarkAttendance from './pages/Attendance/MarkAttendance';
import SeeSchedule from './pages/Attendance/SeeSchedule';
import AcceptAttendance from './pages/Attendance/AcceptAttendance';
import MonthlyAttendance from './pages/Attendance/MonthlyAttendance';

const App = () => {
    const { userData } = useContext(UserDataContext);
    const { cargo, token, userType } = userData;

    return (
        <BrowserRouter>
            <Routes>
                {/* "Rutas Publicas" */}
                <Route index element={<Login />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="*" element={<h1>Not Found 404</h1>} /> */}

                {/* Rutas una vez logeados */}
                <Route element={<ProtectedRoutes isAllowed={!!token} />}>
                    <Route path="/home" element={<Home />} />
                </Route>

                {/* Rutas Admin */}
                <Route element={
                    <ProtectedRoutes
                        isAllowed={!!token && userType === "admin"}
                        redirectTo="/home"
                    />
                }>
                    <Route path='ver-asistencias-mensuales' element={<MonthlyAttendance />} />
                    <Route path="crear-base" element={<CreateBase />} />
                    <Route path="crear-cuadrilla" element={<CreateQuadrille />} />
                    <Route path="crear-ficha" element={<CreateFile />} />
                </Route>

                {/* Ruta brigadistas */}
                <Route element={
                    <ProtectedRoutes
                        isAllowed={!!token && userType === "brigadista"}
                        redirectTo="/home"
                    />
                }>
                    <Route path="marcar-asistencia" element={<MarkAttendance />} />
                    <Route path="ver-horario" element={<SeeSchedule />} />
                </Route>

                {/* Rutas JefeCuadrilla */}
                <Route element={
                    <ProtectedRoutes
                        isAllowed={!!token && cargo === "JefeCuadrilla"}
                        redirectTo="/home"
                    />}
                >
                    <Route path="aceptar-asistencias" element={<AcceptAttendance />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default App
