
//const API_BASE_URL = 'https://test-back.virtualmia.it/api/v1';
const API_BASE_URL = 'https://localhost:44346/api/v1';

const API_ENDPOINTS = {
    AUTH_LOGIN: `${API_BASE_URL}/auth/one_time_token`,
    USER_DATA: `${API_BASE_URL}/user/data`,
};

export const loginUser = async (username, password) => {
    try {
        debugger;
        const res = await fetch(`${API_ENDPOINTS.AUTH_LOGIN}?username=${username}&password=${password}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
            throw new Error('Credenziali errate');
        }

        const data = await res.json();
        const result = data.data;
        
        if (result.token) {
            const expiration = new Date(result.expiration);
            localStorage.setItem('auth_token', result.token);
            localStorage.setItem('token_expiration', expiration.toISOString());
            return { token: result.token, expiration: expiration };
        } else {
            throw new Error('Token non ricevuto');
        }
    } catch (error) {
        return { error: error.message };
    }
};
