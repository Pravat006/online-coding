import axios from 'axios';

const API_BASE_URL: string = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:5054/v0';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export const authService = {
    // Initiate Google OAuth login
    loginWithGoogle: () => {
        window.location.href = `${API_BASE_URL}/auth/google`;
    },

    // Handle OAuth callback and get user data
    handleOAuthCallback: async (): Promise<User | null> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/auth/user/data`, {
                withCredentials: true
            });

            if (response.data.user) {
                return response.data.user;
            }
            return null;
        } catch (error) {
            console.error('Failed to get user data:', error);
            return null;
        }
    },

    // Get current user data
    getCurrentUser: async (): Promise<User | null> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/auth/user/data`, {
                withCredentials: true
            });

            if (response.data.user) {
                return response.data.user;
            }
            return null;
        } catch (error) {
            console.error('Failed to get current user:', error);
            return null;
        }
    },

    // Logout user
    logout: async (): Promise<void> => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
                withCredentials: true
            });

            if (response.data.success) {
                console.log('Logout successful');
            } else {
                console.error('Logout failed:', response.data.message);
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    },

    // Check if user is authenticated
    checkAuth: async (): Promise<boolean> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/auth/user/data`, {
                withCredentials: true
            });
            return !!response.data.user;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}; 