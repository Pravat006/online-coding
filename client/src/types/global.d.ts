// Define the User interface
interface User {
    id: string;
    name?: string;
    email: string;
    avatar?: string;
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
    getCurrentUser: () => Promise<User | null>;
    checkAuth: () => Promise<void>;
    checkSession: () => Promise<boolean>;
    clearError: () => void;
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

interface IRoomName {
    roomName: string;
}


interface CopyLinkDialogueProps {
    id: string;
    isOpen: boolean;
    onClose?: () => void;
}