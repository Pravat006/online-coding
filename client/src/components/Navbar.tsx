import LoginBtn from "./LoginBtn";

function Navbar({ userName }: { userName?: string }) {



    return (

        <nav className="flex items-center justify-between bg-gray-800 p-4 w-full h-14 top-0 ">
            <div className="flex items-center text-black    ">
                <span className="font-bold h-8 w-20 rounded-3xl bg-white text-center flex items-center justify-center text-xl  ">Logo</span>
            </div>
            <div className="flex items-center space-x-4 text-white">
                <span className="text-lg font-semibold">{userName ? `Welcome, ${userName}` : "Unauthenticated Pal"}</span>
            </div>
            <div className="flex items-center space-x-4 text-white">

                <LoginBtn />

            </div>

        </nav>

    )
}

export default Navbar;