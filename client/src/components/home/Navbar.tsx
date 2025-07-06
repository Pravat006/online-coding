import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate()

    return (

        <nav className="p-4 border-b border-gray-200 flex justify-between items-center relative z-10 bg-white/80 backdrop-filter backdrop-blur-sm w-full">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <span className="text-purple-600 text-2xl font-bold">&lt;/&gt;</span>
                <span className="text-3xl font-extrabold tracking-tight text-gray-800">CodeMeet</span>
            </div>
            {/* Nav Links */}
            <div className="hidden md:flex space-x-8 text-lg">
                <span className="text-gray-600 hover:text-purple-600 transition-colors duration-200">Home</span>


            </div>

            {/* Auth Buttons */}
            <div className="space-x-4">
                <button
                    onClick={() => navigate('/login')}
                    className="px-6 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200 text-lg">
                    Sign In
                </button>
            </div>
        </nav>

    )
}

export default Navbar;