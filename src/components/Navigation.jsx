import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserDataContext } from '../context/UserDataContext';

const Navigation = () => {
    const { logout } = useContext(UserDataContext);
    const handleLogout = () => {
        logout();
    };

    const userType = sessionStorage.getItem('userType');
    const cargo = sessionStorage.getItem('cargo');

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>

                {/* Para usuarios administradores */}
                {userType === 'admin' && (
                    <>
                        <li>
                            <Link to="/ver-asistencias-mensuales">Asistencias Mensuales</Link>
                        </li>
                        <li>
                            <Link to="/crear-base">Crear Base</Link>
                        </li>
                        <li>
                            <Link to="/crear-cuadrilla">Crear Cuadrilla</Link>
                        </li>
                        <li>
                            <Link to="/crear-ficha">Crear Ficha</Link>
                        </li>
                    </>
                )}

                {/* Para usuarios tipo brigadista */}
                {userType === 'brigadista' && (
                    <>
                        <li>
                            <Link to="/marcar-asistencia">Marcar asistencia</Link>
                        </li>
                        <li>
                            <Link to="/ver-horario">Ver horario</Link>
                        </li>
                    </>
                )}

                {/* Para usuarios tipo JefeCuadrilla */}
                {cargo === 'JefeCuadrilla' && (
                    <>
                        <li>
                            <Link to="/aceptar-asistencias">Aceptar asistencias</Link>
                        </li>
                    </>
                )}

                <li>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
