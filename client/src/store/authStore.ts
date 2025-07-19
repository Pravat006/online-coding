import { create } from "zustand"



export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    login: (userData) => set({ user: userData, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
}))
