import CreateMeetBtn from "../root/CreateMeetBtn"
import Carousel from "./Carousel"

function Hero() {
    return (
        <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6 overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start w-full max-w-[1440px] px-4 py-8 rounded-lg">

                <div className="create-join-meet flex flex-col items-start justify-start space-y-6 px-10 max-w-lg">
                    <h1 className="text-2xl font-extrabold tracking-tight mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 text-left">
                        Seamless Collaboration, Crafted for Developers.
                    </h1>
                    <p className="text-xl text-gray-700 mb-8 text-left">
                        From Pair Programming to Project Syncs, CodeMeet Elevates Your Team's Workflow.
                    </p>
                    <div className="w-full flex flex-row items-center justify-start space-x-4">
                        <CreateMeetBtn />


                    </div>

                </div>
                <div className="feature-carousel">
                    <Carousel />
                </div>
            </div>
        </main>
    )
}

export default Hero