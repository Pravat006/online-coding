import { useEffect, useRef } from 'react';
import { useAuthStore } from '../store/authStore';

// Create a global variable to track if auth has been checked
// This prevents multiple components from triggering auth checks
let globalAuthChecked = false;

export const useAuth = () => {
    const { checkAuth, checkSession, isAuthenticated, user, isLoading, error } = useAuthStore();
    const authCheckedRef = useRef(globalAuthChecked);

    useEffect(() => {
        // Only proceed if we haven't already checked auth globally
        if (!authCheckedRef.current && !globalAuthChecked) {
            const verifyAuth = async () => {
                // Set the global flag immediately to prevent other components from triggering checks
                globalAuthChecked = true;
                authCheckedRef.current = true;

                // If locally stored auth data exists, verify it silently first
                if (isAuthenticated && user) {
                    try {
                        const isSessionValid = await checkSession();
                        // Only do a full auth check if the session is invalid
                        if (!isSessionValid) {
                            await checkAuth();
                        }
                    } catch (error) {
                        console.error("Session verification failed:", error);
                    }
                }
                // If no auth data, just do a single auth check
                else {
                    await checkAuth();
                }
            };

            // Execute auth verification
            verifyAuth();
        }
        // We intentionally don't include dependencies to prevent re-runs
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        isAuthenticated,
        user,
        isLoading,
        error,
        checkAuth
    };
}; 