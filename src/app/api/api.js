const API_BASE_URL = 'https://localhost:44346/api/v1';

const API_ENDPOINTS = {
    AUTH_LOGIN: `${API_BASE_URL}/auth/one_time_token`,
    USER_DATA: `${API_BASE_URL}/company/info`,
};

export const loginUser = async (username, password) => {
    try {
        const res = await fetch(`${API_ENDPOINTS.AUTH_LOGIN}?username=${username}&password=${password}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error('Credenziali errate');

        const data = await res.json();
        const result = data.data;

        const moment = require('moment-timezone');

        if (result.token && result.expiration) {

            const expirationUTC = moment.utc(result.expiration, "DD-MM-YYYY HH:mm");

            const expirationFixed = expirationUTC.tz('Europe/Rome').format("YYYY-MM-DDTHH:mm:ss.SSSZ");

            return { token: result.token, expiration: expirationFixed };
        }else {
            throw new Error('Token non ricevuto');
        }
    } catch (error) {
        return { error: error.message };
    }
};

export const getUserData = async (token) => {
    try {
        const userInfoRes = await fetch(API_ENDPOINTS.USER_DATA, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!userInfoRes.ok) {
            throw new Error('Impossibile recuperare le informazioni dell\'utente');
        }

        const userInfo = await userInfoRes.json();
        return userInfo.data;
    } catch (error) {
        return { error: error.message };
    }
};
