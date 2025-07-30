import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
    const { checkAuth, isAuthenticated, user, isLoading, error } = useAuthStore();

    useEffect(() => {
        // Check authentication status when the app loads
        checkAuth();
    }, [checkAuth]);

    return {
        isAuthenticated,
        user,
        isLoading,
        error,
        checkAuth
    };
}; 