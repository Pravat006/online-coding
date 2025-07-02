
const GOOGLE_AUTH_URL = "http://localhost:5054/api/v0/auth/google";

const LoginBtn = () => {
    const handleLogin = () => {
        window.location.href = GOOGLE_AUTH_URL;
    };

    return (
        <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            Login with Google
        </button>
    );
}

export default LoginBtn;