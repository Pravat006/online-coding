
import { useNavigate } from 'react-router-dom'

function AuthButton() {
    const navigate = useNavigate()
    return (
        <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200 text-lg">
            Sign In
        </button>
    )
}

export default AuthButton