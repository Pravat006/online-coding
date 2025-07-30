import { Link } from "react-router-dom";
// import Profile from "./Profile";
import { useAuthStore } from "@/store/authStore";

import AuthButton from "../root/AuthButton";
import UserProfile from "./Profile";

function Navbar() {


    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return (


        <nav className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
                <Link to={"/    "} className="flex items-center space-x-2">
                    <span className="text-purple-600 text-2xl font-bold">&lt;/&gt;</span>
                    <span className="text-3xl font-extrabold tracking-tight text-gray-800">CodeMeet</span>
                </Link>
                {/* <div className="hidden md:flex items-center space-x-8">
                    <Link to={"/"} className="text-gray-600 hover:text-gray-900">
                        Home
                    </Link>
                    <Link to={"/about"} className="text-gray-600 hover:text-gray-900">
                        About
                    </Link>
                    <Link to={"/features"} className="text-gray-600 hover:text-gray-900">
                        Features
                    </Link>
                    <Link to={"/pricing"} className="text-gray-600 hover:text-gray-900">
                        Pricing
                    </Link>
                </div> */}
                <div className="flex items-center space-x-4">
                    {
                        isAuthenticated ? (
                            <UserProfile />
                        ) : <AuthButton />
                    }
                </div>
            </div>
        </nav>

    )
}

export default Navbar;