
// aurh-store interface

interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}


interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (userData: User) => void;
    logout: () => void;
    loginWithGoogle: () => void;
    handleOAuthCallback: () => Promise<void>;
    checkAuth: () => Promise<void>;
    clearError: () => void;
}
// Need to define User interface
interface User {
    id: string;
    name?: string;
    email: string;
    avatar?: string;
    // Add other user properties as needed
}

interface UserDataResponse {
    user: User;
    success?: boolean;
    message?: string;
}

interface LogoutResponse {
    success: boolean;
    message?: string;
}
