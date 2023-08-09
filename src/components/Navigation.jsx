import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserDataContext } from '../context/UserDataContext';
import "../styles/navigation.css"

const Navigation = () => {
    const { logout } = useContext(UserDataContext);
    const handleLogout = () => {
        logout();
    };

    const userType = sessionStorage.getItem('userType');
    const cargo = sessionStorage.getItem('cargo');

    return (
        <nav className='container-menu'>
            <ul className='menu'>
                <li className='item-menu'>
                    <Link className='anchor-menu' to="/home">Home</Link>
                </li>

                {/* Para usuarios administradores */}
                {userType === 'admin' && (
                    <>
                        <li className='item-menu'>
                            <Link className='anchor-menu' to="/ver-asistencias-mensuales">Asistencias Mensuales</Link>
                        </li>
                        <li className='item-menu'>
                            <Link className='anchor-menu' to="/crear-base">Crear Base</Link>
                        </li>
                        <li className='item-menu'>
                            <Link className='anchor-menu' to="/crear-cuadrilla">Crear Cuadrilla</Link>
                        </li>
                        <li className='item-menu'>
                            <Link className='anchor-menu' to="/crear-ficha">Crear Ficha</Link>
                        </li>
                    </>
                )}

                {/* Para usuarios tipo brigadista */}
                {userType === 'brigadista' && (
                    <>
                        <li className='item-menu'>
                            <Link className='anchor-menu' to="/marcar-asistencia">Marcar asistencia</Link>
                        </li>
                        <li className='item-menu'>
                            <Link className='anchor-menu' to="/ver-horario">Ver horario</Link>
                        </li>
                    </>
                )}

                {/* Para usuarios tipo JefeCuadrilla */}
                {cargo === 'JefeCuadrilla' && (
                    <>
                        <li className='item-menu'>
                            <Link className='anchor-menu' to="/aceptar-asistencias">Aceptar asistencias</Link>
                        </li>
                    </>
                )}

                <li className='item-menu'>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
