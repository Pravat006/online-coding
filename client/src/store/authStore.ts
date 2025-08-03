import { create } from "zustand";
import { persist } from "zustand/middleware"; // Add this import
import { authService } from "@/services/auth-service";

// Define the store type

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: (userData) => set({ user: userData, isAuthenticated: true, error: null }),

            logout: () => {
                authService.logout();
                set({ user: null, isAuthenticated: false, error: null });
            },

            loginWithGoogle: () => {
                set({ isLoading: true, error: null });
                authService.loginWithGoogle();
            },

            handleOAuthCallback: async () => {
                set({ isLoading: true, error: null });
                try {
                    const user = await authService.handleOAuthCallback();
                    if (user) {
                        set({ user, isAuthenticated: true, isLoading: false, error: null });
                    } else {
                        set({ isLoading: false, error: "Failed to get user data" });
                    }
                } catch {
                    set({ isLoading: false, error: "Authentication failed" });
                }
            },

            getCurrentUser: async () => {
                // Get the current state first
                const { user, isAuthenticated, isLoading } = get();

                // If we already have a user and are authenticated, don't make the API call again
                if (user && isAuthenticated && !isLoading) {
                    return user;
                }

                set({ isLoading: true, error: null });
                try {
                    const user = await authService.getCurrentUser();
                    if (user) {
                        set({ user, isAuthenticated: true, isLoading: false, error: null });
                        return user;
                    } else {
                        set({ user: null, isAuthenticated: false, isLoading: false, error: null });
                        return null;
                    }
                } catch (error) {
                    console.error('Failed to get current user:', error);
                    set({ user: null, isAuthenticated: false, isLoading: false, error: 'Failed to get current user' });
                    return null;
                }
            },

            checkAuth: async () => {
                // Get the current state first
                const { user, isAuthenticated, isLoading } = get();

                // If we already have a user and are authenticated, don't make the API call again
                if (user && isAuthenticated && !isLoading) {
                    return;
                }

                set({ isLoading: true });
                try {
                    const user = await authService.getCurrentUser();
                    if (user) {
                        set({ user, isAuthenticated: true, isLoading: false, error: null });
                    } else {
                        set({ user: null, isAuthenticated: false, isLoading: false, error: null });
                    }
                } catch {
                    set({ user: null, isAuthenticated: false, isLoading: false, error: null });
                }
            },

            // Check if the session is valid without changing state
            checkSession: async () => {
                const { isAuthenticated, user } = get();

                // If we already have authentication data, verify it with the server
                if (isAuthenticated && user) {
                    try {
                        const sessionUser = await authService.checkSession();
                        if (sessionUser) {
                            // Update user data if needed
                            if (JSON.stringify(sessionUser) !== JSON.stringify(user)) {
                                set({ user: sessionUser });
                            }
                            return true;
                        } else {
                            // Session is invalid, clear auth state
                            set({ isAuthenticated: false, user: null });
                            return false;
                        }
                    } catch {
                        return false;
                    }
                }
                return false;
            },

            clearError: () => set({ error: null })
        }),
        {
            name: "auth-storage", // name of the item in localStorage
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated
            }), // only store these fields
        }
    )
);
