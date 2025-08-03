import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { useLocation } from "react-router-dom";





const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const { checkAuth } = useAuth();

    useEffect(() => {
        const isAuthPage = location.pathname.includes('/login') ||
            location.pathname.includes('/auth/callback');

        // Only check auth if we're not on an auth page
        if (!isAuthPage) {
            checkAuth();
        }
    }, [location.pathname, checkAuth]);

    return <>{children}</>;
};

export default AuthProvider