'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const tokenExpiration = localStorage.getItem('token_expiration');

        if (storedUser && tokenExpiration) {
            const expirationDate = new Date(tokenExpiration);
            const currentTime = new Date();

            if (currentTime > expirationDate) {
                localStorage.removeItem('user');
                localStorage.removeItem('auth_token');
                localStorage.removeItem('token_expiration');
                router.push('/auth/login');
            } else {
                setUser(JSON.parse(storedUser));
            }
        } else {
            router.push('/auth/login');
        }
    }, []);

    const getAuthToken = () => {
        const token = localStorage.getItem('auth_token');
        const expiration = localStorage.getItem('token_expiration');

        if (!token || !expiration) return null;

        const expirationDate = new Date(expiration);
        const currentTime = new Date();

        if (currentTime > expirationDate) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('token_expiration');
            return null;
        }

        return token;
    };

    const login = (userData, expiration) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token_expiration', expiration.toISOString());
        setUser(userData);
        router.push('/');
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('token_expiration');
        setUser(null);
        router.push('/auth/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, getAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};
