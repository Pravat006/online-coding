import { Outlet } from "react-router-dom"

function AuthLayout() {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-blue-200 to-pink-200 p-4 w-full"
        >
            <Outlet />
        </div>
    )
}

export default AuthLayout