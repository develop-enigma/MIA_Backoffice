"use client"; // Aggiungi questa direttiva

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, getUserData } from './api/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    
    useEffect(() => {

        const storedUser = localStorage.getItem('user');
        const tokenExpiration = localStorage.getItem('token_expiration');
        
        if ((!storedUser || !tokenExpiration) && !window.location.pathname.includes('/auth')) {
            router.push('/auth/login');
            return;
        }

        const expirationDate = new Date(tokenExpiration);
        const currentTime = new Date();

        if (currentTime >= expirationDate && !window.location.pathname.includes('/auth')) {
            refreshAuthToken();
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const getAuthToken = () => {
        const token = localStorage.getItem('auth_token');
        const expiration = localStorage.getItem('token_expiration');

        if (!token || !expiration) return null;

        const expirationDate = new Date(expiration);
        const currentTime = new Date();

        if (currentTime >= expirationDate) {
            logout();
            return null;
        }

        return token;
    };

    const login = async (username, password) => {
        const { token, expiration, error } = await loginUser(username, password);

        if (error) {
            console.error('Errore login:', error);
            return;
        }

        localStorage.setItem('auth_token', token);
        localStorage.setItem('token_expiration', expiration);

        const userData = await getUserData(token);

        if (userData.error) {
            console.error('Errore recupero dati utente:', userData.error);
            logout();
            return;
        }

        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        router.push('/');
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('token_expiration');
        setUser(null);
        window.location.reload();
    };

    const refreshAuthToken = async () => {
        const storedUser = localStorage.getItem('user');
        
        if (!storedUser) {
            logout();
            return;
        }
    
        const userData = JSON.parse(storedUser);
        const { username, password } = userData;
    
        try {
            const { token, expiration, error } = await loginUser(username, password);
            
            if (error) {
                logout();
                return;
            }
    
            const expirationUTC = new Date(expiration).toISOString();
            localStorage.setItem('auth_token', token);
            localStorage.setItem('token_expiration', expirationUTC);
    
            const userData = await getUserData(token);
            if (userData.error) {
                logout();
                return;
            }
    
            localStorage.setItem('user', JSON.stringify(userData));
    
            setUser(userData);
    
        } catch (error) {
            console.error('Errore durante il refresh del token', error);
            logout();
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, getAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};
