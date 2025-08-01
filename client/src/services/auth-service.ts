import Axios from '@/config/axio-instance';

// Define User and response types for type safety

const API_BASE_URL: string = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:5054/v0';

export const authService = {
    loginWithGoogle: () => {
        window.location.href = `${API_BASE_URL}/auth/google`;
    },

    // Handle OAuth callback and get user data
    handleOAuthCallback: async (): Promise<User | null> => {
        try {
            const response = await Axios.get<UserDataResponse>('/auth/user/data');
            if (response && response.data && response.data.user) {
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
            const response = await Axios.get<UserDataResponse>('/auth/user/data');
            console.log('Current user data:', response.data);

            if (response && response.data && response.data.user) {
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
            const response = await Axios.post<LogoutResponse>('/auth/logout');
            if (response && response.data && response.data.success) {
                console.log('Logout successful');
            } else {
                console.error('Logout failed:', response.data?.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    },

    // Check if user is authenticated
    checkAuth: async (): Promise<boolean> => {
        try {
            const response = await Axios.get<UserDataResponse>('/auth/user/data');
            return !!(response && response.data && response.data.user);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
};