"use client"; // Aggiungi questa direttiva

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, getUserData } from './api/api';
import '../styles/css/mia.css';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);

            const storedUser = localStorage.getItem('user');
            const tokenExpiration = localStorage.getItem('token_expiration');

            if (!storedUser || !tokenExpiration) {
                router.replace('/auth/login');
                setLoading(false);
                return;
            }

            const expirationDate = new Date(tokenExpiration);
            const currentTime = new Date();
            //expirationDate.setHours(expirationDate.getHours() - 1); Test per l'aggiornamento del token

            if (currentTime >= expirationDate) {
                await refreshAuthToken();
            } else {
                setUser(JSON.parse(storedUser));
            }

            setLoading(false);
        };

        checkAuth();
    }, []); // Esegui solo all'inizio

    // Ottimizzazione del redirect in base allo stato dell'utente
    useEffect(() => {
        if (!loading) {
            if (user) {
                router.push('/dashboard');
            } else {
                router.push('/auth/login');
            }
        }
    }, [user, loading]); // Trigger solo quando user o loading cambiano

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

        saveAuthData(token, expiration);
        const userData = await getUserData(token);

        if (userData.error) {
            console.error('Errore recupero dati utente:', userData.error);
            logout();
            return;
        }

        saveUserData(userData);
        saveCredentials(username, password);
        setUser(userData);
    };

    const saveCredentials = (username, password) => {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('token_expiration');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        setUser(null);
    };
    const refreshAuthToken = async () => {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');

        if (!username || !password) {
            logout();
            return;
        }
        
        try {
            const { token, expiration, error } = await loginUser(username, password);
            
            if (error) {
                logout();
                return;
            }
    
            saveAuthData(token, expiration);
            const updatedUserData = await getUserData(token);
            if (updatedUserData.error) {
                logout();
                return;
            }
    
            saveUserData(updatedUserData);
            setUser(updatedUserData);
    
        } catch (error) {
            console.error('Errore durante il refresh del token', error);
            logout();
        }
    };

    const saveAuthData = (token, expiration) => {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('token_expiration', expiration);
    };

    const saveUserData = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
    };

    if (loading) {
        return (
            <div className="loader"></div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, getAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};
