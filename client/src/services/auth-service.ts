import Axios from '@/config/axio-instance';

// Define User and response types for type safety

const API_BASE_URL: string = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:5054/v0';

// Add cache to prevent multiple simultaneous requests
let currentAuthRequest: Promise<User | null> | null = null;

export const authService = {
    loginWithGoogle: () => {
        window.location.href = `${API_BASE_URL}/auth/google`;
    },

    // Handle OAuth callback and get user data
    handleOAuthCallback: async (): Promise<User | null> => {
        return authService.getCurrentUser();
    },

    // Get current user data with request deduplication
    getCurrentUser: async (): Promise<User | null> => {
        // If there's already a request in progress, return that instead of making a new one
        if (currentAuthRequest) {
            return currentAuthRequest;
        }

        // Create a new request and store it
        currentAuthRequest = (async () => {
            try {
                const response = await Axios.get<UserDataResponse>('/auth/user/data');

                if (response && response.data && response.data.user) {
                    return response.data.user;
                }
                return null;
            } catch (error) {
                console.error('Failed to get current user:', error);
                return null;
            } finally {
                // Clear the cached request after a short delay to prevent rapid sequential calls
                setTimeout(() => {
                    currentAuthRequest = null;
                }, 300);
            }
        })();

        return currentAuthRequest;
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
    },    // Check if user is authenticated - reuses getCurrentUser for efficiency
    checkAuth: async (): Promise<boolean> => {
        const user = await authService.getCurrentUser();
        return !!user;
    },

    // Check session is valid - optimized version that respects request deduplication
    checkSession: async (): Promise<User | null> => {
        return authService.getCurrentUser();
    }
};