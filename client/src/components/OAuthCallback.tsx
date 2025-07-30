import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function OAuthCallback() {
    const navigate = useNavigate();
    const { handleOAuthCallback, isAuthenticated, isLoading, error } = useAuthStore();

    useEffect(() => {
        const handleCallback = async () => {
            await handleOAuthCallback();
        };

        handleCallback();
    }, [handleOAuthCallback]);

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            // Redirect to home page after successful login
            navigate('/', { replace: true });
        } else if (error && !isLoading) {
            // Redirect to login page if authentication failed
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, isLoading, error, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Processing authentication...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Authentication failed: {error}</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Redirecting...</p>
            </div>
        </div>
    );
} 