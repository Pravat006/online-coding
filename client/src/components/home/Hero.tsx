import { Shield, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import MeetingControls from "./MeetingControls"

function Hero() {
    return (
        <section className="container mx-auto px-4 py-20">
            <div className="text-center max-w-4xl mx-auto">
                <Badge variant="secondary" className="mb-4">
                    🚀 Now with HD Video Quality
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                    Connect, Collaborate, and Create Together
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Experience seamless video meetings with crystal-clear quality. Join millions who trust our platform for
                    their most important conversations.
                </p>

                {/* Meeting Controls */}
                <MeetingControls />
                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Shield className="h-4 w-4" />
                        End-to-end encrypted
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        No time limits
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero