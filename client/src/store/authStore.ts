import { create } from "zustand";
import { authService } from "@/services/auth-service";



export const useAuthStore = create<AuthStore>((set) => ({
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

    checkAuth: async () => {
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

    clearError: () => set({ error: null })
}));
