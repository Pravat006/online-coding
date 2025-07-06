import CreateMeetBtn from "../root/CreateMeetBtn"
import JoinMeet from "../root/JoinMeet"
import Carousel from "./Carousel"

function Hero() {
    return (
        <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6 overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center w-full max-w-[90vw] px-4 py-8 rounded-lg">

                <div className="flex justify-center items-center h-full">

                    <div className="create-join-meet flex flex-col items-center justify-center space-y-6 px-10 max-w-2xl border-b-2 border-black pb-20">
                        <h1 className="text-2xl font-extrabold tracking-tight mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 text-center">
                            Seamless Collaboration, Crafted for Developers.
                        </h1>
                        <p className="text-xl text-gray-700 mb-8 text-center">
                            From Pair Programming to Project Syncs, CodeMeet Elevates Your Team's Workflow.
                        </p>
                        <div className="w-full flex flex-row items-center justify-center space-x-4">
                            <CreateMeetBtn />
                            <JoinMeet />
                        </div>
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