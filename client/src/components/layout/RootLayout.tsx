import { Outlet } from "react-router-dom"
import Navbar from "../home/Navbar"
import Footer from "../home/Footer"

function RootLayout() {
    return (
        <div className='w-full flex flex-col justify-center items-start'>
            {/* Navbar */}
            <Navbar />
            <Outlet />
            <Footer />
            {/* Footer */}

        </div>
    )
}

export default RootLayout