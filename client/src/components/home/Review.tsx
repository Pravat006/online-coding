
function Review() {
    return (
        <section className="py-16 px-6 bg-white relative">
            <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
                <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="40" fill="#8B5CF6" />
                </svg>
            </div>
            <div className="absolute bottom-0 left-20 w-24 h-24 opacity-10">
                <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <rect width="80" height="80" x="10" y="10" fill="#3B82F6" />
                </svg>
            </div>

            <h2 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
                What Developers Are Saying
            </h2>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <p className="italic text-gray-700 mb-4">
                        "CodeMeet has revolutionized our daily stand-ups. The integrated editor saves us so much time!"
                    </p>
                    <p className="font-semibold text-purple-600">- Dr. Anya Sharma, Lead AI Engineer at InnovateTech</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <p className="italic text-gray-700 mb-4">
                        "Finally, a meeting platform built for engineers. The shared terminal is a game-changer for debugging sessions."
                    </p>
                    <p className="font-semibold text-blue-600">- Ben Carter, Senior DevOps Specialist at CloudForge</p>
                </div>
            </div>
        </section>
    )
}

export default Review