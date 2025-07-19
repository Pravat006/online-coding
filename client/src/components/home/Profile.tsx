import { useRef, useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut } from "lucide-react"

function Profile() {
    const [open, setOpen] = useState(false)
    const popoverRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const togglePopup = () => {
        setOpen((prev) => !prev)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current && !popoverRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block">
            <button
                ref={buttonRef}
                onClick={togglePopup}
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                <Avatar>
                    <AvatarImage src="https://lh3.googleusercontent.com/a/ACg8ocL2UYi_GrE8NyxD_pBq6CnlE92y1wkK7rcukYI2DjblZZmVlYpG=s96-c" />
                    <AvatarFallback>{"PB"}</AvatarFallback>
                </Avatar>
            </button>

            <div
                ref={popoverRef}
                className={`absolute right-0 mt-4 w-70 origin-top-right rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out
                            ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
                <div className="flex flex-col items-center p-6">
                    <span className="text-sm text-gray-500 mb-4">beherapravat836@gmail.com</span>

                    <div className="relative mb-4">
                        <Avatar className="h-24 w-24 border-2 border-white shadow-md">
                            <AvatarImage src="https://lh3.googleusercontent.com/a/ACg8ocL2UYi_GrE8NyxD_pBq6CnlE92y1wkK7rcukYI2DjblZZmVlYpG=s96-c" />
                            <AvatarFallback>{"PB"}</AvatarFallback>
                        </Avatar>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Hi, Pravat!</h3>

                </div>

                <div className="border-t border-gray-100">
                    <ul className="py-2 text-gray-700">
                        <li>
                            <a href="#" className="flex items-center px-4 py-2 text-sm hover:bg-gray-100">
                                <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                                <span>Log out</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Profile;