import { useContext } from 'react';
import { UserDataContext } from '../context/UserDataContext';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = ({children, isAllowed, redirectTo="/login"})  =>{
    <p>protegido</p>
    if(!isAllowed){
        return <Navigate to={redirectTo} />
    }
    return children ? children : <Outlet />
}