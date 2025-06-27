import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react'

function Navbar() {

    const { user, isSignedIn } = useUser();

    return (

        <nav className="flex items-center justify-between bg-gray-800 p-4 w-full h-14 top-0 ">
            <div className="flex items-center text-black    ">
                <span className="font-bold h-8 w-20 rounded-3xl bg-white text-center flex items-center justify-center text-xl  ">Logo</span>
            </div>
            <div className="flex items-center space-x-4 text-white">
                <h3 className="font-bold">Hello 👏 {isSignedIn && (
                    <span>{user.firstName}</span>

                )}</h3>
            </div>
            <div className="flex items-center space-x-4 text-white">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>

            </div>

        </nav>

    )
}

export default Navbar;