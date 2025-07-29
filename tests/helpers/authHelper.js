import axios from 'axios';

export async function getAuthCookie() {
    try {
        console.log("Attempting to get auth cookie from test login...");

        const response = await axios.post('http://localhost:5054/v0/auth/test-login', {}, {
            withCredentials: true
        });

        if (!response.headers['set-cookie']) {
            console.error("No cookies returned from test login");
            return null;
        }

        const cookies = response.headers['set-cookie'];
        console.log("Server returned cookies:", cookies);

        // Join cookies into a single string for Supertest
        return cookies.join('; ');
    } catch (error) {
        console.error('Failed to authenticate for tests:', error);
        return null;
    }
}