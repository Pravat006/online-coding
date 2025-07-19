
function Decorations() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

            <div className="absolute top-[5%] right-[10%] w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce"></div>
            <div className="absolute top-[15%] left-[10%] w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce animation-delay-2000"></div>
            <div className="absolute bottom-[15%] right-[20%] w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce animation-delay-4000"></div>
            <div className="absolute bottom-[10%] left-[15%] w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce animation-delay-6000"></div>

            {/* Wavy shapes */}
            <svg className="absolute top-0 left-0 w-full opacity-20" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                <path fill="#8B5CF6" d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,202.7C672,203,768,149,864,144C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
            </svg>

            {/* Triangle patterns */}
            <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20 ">
                <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#3B82F6" d="M0,0 L100,0 L50,100 Z"></path>
                </svg>
            </div>
            <div className="absolute top-1/3 left-1/4 w-32 h-32 opacity-20 rotate-45">
                <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#EC4899" d="M0,0 L100,0 L50,100 Z"></path>
                </svg>
            </div>
        </div>

    )
}

export default Decorations