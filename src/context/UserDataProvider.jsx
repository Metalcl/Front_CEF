import { UserDataContext } from './UserDataContext';
import { useState } from 'react';


export const UserDataProvider = ({ children }) => {

    const initialUserData = {
        rut: '',
        apellidos: '',
        cargo: '',
        nombres: '',
        userType: '',
        _id: '',
        token: '',
    };

    const [userData, setUserData] = useState(initialUserData);
    const updateUserData = (data) => {
        setUserData(data);
    };

    const logout = () => {
        setUserData(initialUserData);
        localStorage.clear();
        sessionStorage.clear();
        // Redirigir a /login
        window.location.href = '/login';
    };

    return (
        <UserDataContext.Provider value={{
            userData,
            updateUserData,
            logout
        }}>
            {children}
        </UserDataContext.Provider>
    )
}